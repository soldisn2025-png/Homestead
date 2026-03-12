function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function getCanonicalRedirectResponse(request, env) {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const canonicalHost = (env.CANONICAL_HOST || "homesteadseoul.com").toLowerCase();
  if (!canonicalHost) return null;

  const alternateHost = canonicalHost.startsWith("www.")
    ? canonicalHost.replace(/^www\./, "")
    : `www.${canonicalHost}`;

  const isManagedHost = host === canonicalHost || host === alternateHost;
  if (!isManagedHost || host === canonicalHost) return null;

  url.hostname = canonicalHost;
  url.protocol = "https:";
  return Response.redirect(url.toString(), 308);
}

function getMessage(lang, key) {
  const dict = {
    ko: {
      bad_request: "요청 형식이 올바르지 않습니다.",
      invalid_value: "입력값을 확인해 주세요.",
      turnstile_fail: "보안 확인에 실패했습니다.",
      email_fail: "이메일 전송에 실패했습니다.",
      accepted: "문의가 접수되었습니다.",
    },
    en: {
      bad_request: "Invalid request format.",
      invalid_value: "Please check your input.",
      turnstile_fail: "Security verification failed.",
      email_fail: "Failed to deliver inquiry email.",
      accepted: "Inquiry received.",
    },
  };
  const safeLang = lang === "en" ? "en" : "ko";
  return dict[safeLang][key];
}

function validate(payload) {
  const required = ["name", "contact", "message", "language"];
  for (const key of required) {
    if (!payload[key] || typeof payload[key] !== "string") return false;
  }
  if (payload.name.length > 80) return false;
  if (payload.contact.length > 120) return false;
  if (payload.message.length > 1200) return false;
  if (!["ko", "en"].includes(payload.language)) return false;
  return true;
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token || typeof token !== "string") return true;

  const ip = request.headers.get("CF-Connecting-IP") || "";
  const body = new URLSearchParams();
  body.set("secret", env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = await response.json();
  return Boolean(result.success);
}

function formatEmailHtml(payload, request) {
  const country = request.headers.get("CF-IPCountry") || "unknown";
  const ua = request.headers.get("User-Agent") || "unknown";
  return `
  <h2>New Inquiry - Homestead Seoul</h2>
  <p><strong>Name:</strong> ${payload.name}</p>
  <p><strong>Contact:</strong> ${payload.contact}</p>
  <p><strong>Language:</strong> ${payload.language}</p>
  <p><strong>Country:</strong> ${country}</p>
  <p><strong>Message:</strong><br>${payload.message.replace(/\n/g, "<br>")}</p>
  <hr>
  <p><small>User-Agent: ${ua}</small></p>
  `;
}

async function sendEmail(payload, request, env) {
  if (!env.RESEND_API_KEY || !env.EMAIL_TO || !env.EMAIL_FROM) {
    return { ok: false, code: "config_missing", detail: "Missing RESEND_API_KEY/EMAIL_TO/EMAIL_FROM" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [env.EMAIL_TO],
      subject:
        payload.language === "ko"
          ? `[홈스테이드 서울] 신규 문의 - ${payload.name}`
          : `[Homestead Seoul] New inquiry - ${payload.name}`,
      html: formatEmailHtml(payload, request),
      reply_to: payload.contact.includes("@") ? payload.contact : undefined,
    }),
  });

  let bodyText = "";
  try {
    bodyText = await response.text();
  } catch (_) {
    bodyText = "";
  }

  if (!response.ok) {
    return {
      ok: false,
      code: "provider_rejected",
      detail: bodyText || `HTTP ${response.status}`,
    };
  }

  return { ok: true };
}

async function signHmac256(text, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(text));
  return [...new Uint8Array(signature)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

async function sendSms(payload, env) {
  if (!env.SOLAPI_API_KEY || !env.SOLAPI_API_SECRET || !env.SMS_TO || !env.SMS_FROM) return false;

  const date = new Date().toISOString();
  const salt = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const signature = await signHmac256(date + salt, env.SOLAPI_API_SECRET);
  const authorization = `HMAC-SHA256 apiKey=${env.SOLAPI_API_KEY}, date=${date}, salt=${salt}, signature=${signature}`;

  const smsText =
    payload.language === "ko"
      ? `[홈스테이드 서울] 신규 문의 ${payload.name}\n연락처: ${payload.contact}`
      : `[Homestead Seoul] New inquiry ${payload.name}\nContact: ${payload.contact}`;

  const response = await fetch("https://api.solapi.com/messages/v4/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify({
      message: {
        to: env.SMS_TO,
        from: env.SMS_FROM,
        text: smsText.slice(0, 90),
        type: "SMS",
      },
    }),
  });

  return response.ok;
}

async function handleInquiry(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch (_) {
    return json({ ok: false, code: "bad_request", message: getMessage("ko", "bad_request") }, 400);
  }

  const lang = payload?.language === "en" ? "en" : "ko";
  if (!validate(payload)) {
    return json({ ok: false, code: "invalid_value", message: getMessage(lang, "invalid_value") }, 422);
  }

  const captchaOk = await verifyTurnstile(payload.turnstileToken, request, env);
  if (!captchaOk) {
    return json({ ok: false, code: "turnstile_fail", message: getMessage(lang, "turnstile_fail") }, 403);
  }

  const emailResult = await sendEmail(payload, request, env);
  if (!emailResult.ok) {
    if (emailResult.code === "config_missing") {
      return json(
        {
          ok: false,
          code: "email_config_missing",
          message:
            lang === "ko"
              ? "문의 전송 설정이 아직 완료되지 않았습니다. 잠시 후 다시 시도해 주세요."
              : "Inquiry mail settings are not fully configured yet. Please try again shortly.",
        },
        503
      );
    }

    return json(
      {
        ok: false,
        code: "email_provider_error",
        message: getMessage(lang, "email_fail"),
        detail: emailResult.detail || "",
      },
      502
    );
  }

  await sendSms(payload, env);
  return json({ ok: true, message: getMessage(lang, "accepted") }, 200);
}

function handlePublicConfig(env) {
  return json({
    googleClientId: env.GOOGLE_CLIENT_ID || "",
    allowedAdminEmail: env.ADMIN_ALLOWED_EMAIL || "homesteadseoul@gmail.com",
  });
}

export default {
  async fetch(request, env) {
    const canonicalRedirect = getCanonicalRedirectResponse(request, env);
    if (canonicalRedirect) return canonicalRedirect;

    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === "/api/public-config" && request.method === "GET") {
      return handlePublicConfig(env);
    }

    if (pathname === "/api/inquiry" && request.method === "POST") {
      return handleInquiry(request, env);
    }

    if (pathname === "/api/health") {
      return json({
        ok: true,
        service: "homestead-worker",
        config: {
          googleClientId: Boolean(env.GOOGLE_CLIENT_ID),
          resendApiKey: Boolean(env.RESEND_API_KEY),
          emailTo: Boolean(env.EMAIL_TO),
          emailFrom: Boolean(env.EMAIL_FROM),
          turnstile: Boolean(env.TURNSTILE_SECRET_KEY),
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
