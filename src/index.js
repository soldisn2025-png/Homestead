function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function cloneConfig(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function normalizeEnglishPrice(value) {
  return typeof value === "string" ? value.replace(/\s*[·�]\s*/g, " / ") : value;
}

function sanitizeSiteConfig(config) {
  const next = cloneConfig(config);
  if (next.branding) {
    next.branding.subtitleKo = "서울의 1인 전용 프라이빗룸 · Since 2007";
    next.branding.subtitleEn = "Private Room Urban Living · Since 2007";
  }
  const ko = next.pages?.ko;
  if (ko?.hero) {
    ko.hero.title = "방배역 도보 2분<br>혼자 쓰는 풀옵션";
    if (Array.isArray(ko.hero.chips)) ko.hero.chips = ko.hero.chips.filter((chip) => chip !== "1인실만 운영");
  }
  if (ko?.quickFacts) ko.quickFacts.title = "";
  if (ko?.included) ko.included.desc = "";
  if (ko?.location) {
    ko.location.title = "";
    if (Array.isArray(ko.location.points)) {
      ko.location.points = ko.location.points.filter((point) => point !== "조용한 단독 거주 분위기를 선호하는 사용자에게 적합");
    }
  }
  if (Array.isArray(next.media?.tierGallery)) {
    next.media.tierGallery.forEach((group) => {
      group.priceEn = normalizeEnglishPrice(group.priceEn);
    });
  }

  const en = next.pages?.en;
  if (en?.hero) {
    en.hero.kicker = "Solo traveler stay · Furnished room · Seoul";
    if (Array.isArray(en.hero.notes)) {
      en.hero.notes = en.hero.notes.filter((note) => note !== "Refundable incidental deposit");
    }
  }
  if (en?.concept) en.concept.desc = "";
  if (en?.gallery) en.gallery.desc = "";
  if (en?.included) en.included.desc = "";
  if (en?.pricing && Array.isArray(en.pricing.rows)) {
    en.pricing.rows.forEach((row) => {
      row.price = normalizeEnglishPrice(row.price);
    });
  }
  if (en?.process) {
    en.process.title = "A clear inquiry and payment process";
    en.process.desc = "";
    if (Array.isArray(en.process.steps) && en.process.steps[3]) {
      en.process.steps[3].title = "Pay before move-in or in cash at check-in";
      en.process.steps[3].copy = "You can pay the refundable incidental deposit and monthly rent by card before move-in, or pay in cash at check-in if you prefer.";
    }
  }
  if (en?.contact) {
    en.contact.mobileCtas = [
      { type: "whatsapp", label: "WhatsApp" },
      { type: "phone", label: "Call" },
      { type: "email", label: "Email" },
    ];
  }
  return next;
}

function getAllowedOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (!origin) return "";
  try {
    const originUrl = new URL(origin);
    const host = originUrl.hostname.toLowerCase();
    const canonicalHost = (env.CANONICAL_HOST || "homesteadseoul.com").toLowerCase();
    const alternateHost = canonicalHost.startsWith("www.") ? canonicalHost.replace(/^www\./, "") : `www.${canonicalHost}`;
    if (host === canonicalHost || host === alternateHost || host.endsWith(".github.io")) return origin;
  } catch (_) {}
  return "";
}

function withCors(response, request, env) {
  const allowedOrigin = getAllowedOrigin(request, env);
  if (!allowedOrigin) return response;
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", allowedOrigin);
  headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Vary", "Origin");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function handleCorsPreflight(request, env) {
  const allowedOrigin = getAllowedOrigin(request, env);
  if (!allowedOrigin) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  });
}

function getSiteConfigStub(env) {
  if (!env.SITE_CONFIG_DO) return null;
  const id = env.SITE_CONFIG_DO.idFromName("primary");
  return env.SITE_CONFIG_DO.get(id);
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

async function handleGetSiteConfig(env) {
  const stub = getSiteConfigStub(env);
  if (!stub) {
    return json(
      { ok: false, code: "site_config_unavailable", message: "Site config store is not configured." },
      503
    );
  }
  const response = await stub.fetch("https://site-config/get");
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || !result.ok) return new Response(JSON.stringify(result || { ok: false }), { status: response.status, headers: response.headers });
  return json({ ok: true, config: result.config ? sanitizeSiteConfig(result.config) : null }, response.status);
}

async function handlePutSiteConfig(request, env) {
  const stub = getSiteConfigStub(env);
  if (!stub) {
    return json(
      { ok: false, code: "site_config_unavailable", message: "Site config store is not configured." },
      503
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch (_) {
    return json({ ok: false, code: "bad_request", message: "Invalid request format." }, 400);
  }

  const config = payload && typeof payload === "object" && payload.config ? sanitizeSiteConfig(payload.config) : sanitizeSiteConfig(payload);
  if (!config || typeof config !== "object") {
    return json({ ok: false, code: "invalid_value", message: "Invalid config payload." }, 422);
  }

  const response = await stub.fetch("https://site-config/set", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ config }),
  });
  return new Response(response.body, { status: response.status, headers: response.headers });
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

function constantTimeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
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

function extractEmailAddress(value) {
  const raw = String(value || "").trim();
  const match = raw.match(/<([^>]+)>/);
  return (match ? match[1] : raw).trim().toLowerCase();
}

function usesResendTestSender(sender) {
  return extractEmailAddress(sender).endsWith("@resend.dev");
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

  if (usesResendTestSender(env.EMAIL_FROM) && env.ALLOW_RESEND_TEST_SENDER !== "true") {
    return {
      ok: false,
      code: "test_sender_not_allowed",
      detail:
        "EMAIL_FROM is using resend.dev test sender. Configure a verified sender like hello@homesteadseoul.com and set ALLOW_RESEND_TEST_SENDER=true only for temporary testing.",
    };
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
  let responseJson = null;
  try {
    bodyText = await response.text();
  } catch (_) {
    bodyText = "";
  }
  try {
    responseJson = bodyText ? JSON.parse(bodyText) : null;
  } catch (_) {
    responseJson = null;
  }

  if (!response.ok) {
    return {
      ok: false,
      code: "provider_rejected",
      detail:
        (responseJson && (responseJson.message || responseJson.name || responseJson.error)) ||
        bodyText ||
        `HTTP ${response.status}`,
    };
  }

  if (!responseJson || typeof responseJson.id !== "string" || !responseJson.id.trim()) {
    return {
      ok: false,
      code: "provider_invalid_response",
      detail: bodyText || "Resend accepted the request but did not return an email id.",
    };
  }

  return { ok: true, id: responseJson.id.trim() };
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

    if (emailResult.code === "test_sender_not_allowed") {
      return json(
        {
          ok: false,
          code: "email_sender_not_verified",
          message:
            lang === "ko"
              ? "문의 메일 발송 주소가 아직 테스트용으로 설정되어 있습니다. Resend에서 도메인을 인증한 뒤 실제 발신 주소로 바꿔야 합니다."
              : "Inquiry email is still using a Resend test sender. Verify your domain in Resend and switch EMAIL_FROM to a real sender address.",
          detail: emailResult.detail || "",
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
  return json({ ok: true, message: getMessage(lang, "accepted"), emailId: emailResult.id }, 200);
}

async function handleAdminPasswordLogin(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch (_) {
    return json({ ok: false, code: "bad_request", message: "Invalid request format." }, 400);
  }

  const loginId = String(payload?.id || "").trim();
  const loginPassword = String(payload?.password || "");
  if (!loginId || !loginPassword) {
    return json({ ok: false, code: "invalid_value", message: "ID and password are required." }, 422);
  }

  if (!env.ADMIN_LOGIN_ID || !env.ADMIN_LOGIN_PASSWORD) {
    return json(
      {
        ok: false,
        code: "login_config_missing",
        message: "Password login is not configured yet.",
      },
      503
    );
  }

  const idOk = constantTimeEqual(loginId, env.ADMIN_LOGIN_ID);
  const passwordOk = constantTimeEqual(loginPassword, env.ADMIN_LOGIN_PASSWORD);
  if (!idOk || !passwordOk) {
    return json({ ok: false, code: "unauthorized", message: "Invalid credentials." }, 401);
  }

  return json({
    ok: true,
    session: {
      email: env.ADMIN_ALLOWED_EMAIL || "homesteadseoul@gmail.com",
      allowedEmail: env.ADMIN_ALLOWED_EMAIL || "homesteadseoul@gmail.com",
      ts: Date.now(),
      authType: "password",
    },
  });
}

function handlePublicConfig(env) {
  return json({
    googleClientId: env.GOOGLE_CLIENT_ID || "",
    allowedAdminEmail: env.ADMIN_ALLOWED_EMAIL || "homesteadseoul@gmail.com",
    passwordLoginEnabled: Boolean(env.ADMIN_LOGIN_ID && env.ADMIN_LOGIN_PASSWORD),
  });
}

export default {
  async fetch(request, env) {
    const canonicalRedirect = getCanonicalRedirectResponse(request, env);
    if (canonicalRedirect) return canonicalRedirect;

    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname.startsWith("/api/") && request.method === "OPTIONS") {
      return handleCorsPreflight(request, env);
    }

    if (pathname === "/api/public-config" && request.method === "GET") {
      return withCors(handlePublicConfig(env), request, env);
    }

    if (pathname === "/api/site-config" && request.method === "GET") {
      return withCors(await handleGetSiteConfig(env), request, env);
    }

    if (pathname === "/api/site-config" && request.method === "PUT") {
      return withCors(await handlePutSiteConfig(request, env), request, env);
    }

    if (pathname === "/api/admin-login" && request.method === "POST") {
      return withCors(await handleAdminPasswordLogin(request, env), request, env);
    }

    if (pathname === "/api/inquiry" && request.method === "POST") {
      return withCors(await handleInquiry(request, env), request, env);
    }

    if (pathname === "/api/health") {
      return withCors(json({
        ok: true,
        service: "homestead-worker",
        config: {
          googleClientId: Boolean(env.GOOGLE_CLIENT_ID),
          resendApiKey: Boolean(env.RESEND_API_KEY),
          emailTo: Boolean(env.EMAIL_TO),
          emailFrom: Boolean(env.EMAIL_FROM),
          verifiedSenderConfigured: Boolean(env.EMAIL_FROM) && !usesResendTestSender(env.EMAIL_FROM),
          turnstile: Boolean(env.TURNSTILE_SECRET_KEY),
          passwordLogin: Boolean(env.ADMIN_LOGIN_ID && env.ADMIN_LOGIN_PASSWORD),
          siteConfigStore: Boolean(env.SITE_CONFIG_DO),
        },
      }), request, env);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const isHtmlRequest =
      pathname === "/" ||
      pathname.endsWith(".html") ||
      request.headers.get("accept")?.includes("text/html");

    if (!isHtmlRequest) return assetResponse;

    const headers = new Headers(assetResponse.headers);
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};

export class SiteConfigStore {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/get" && request.method === "GET") {
      const config = await this.ctx.storage.get("site_config");
      return json({ ok: true, config: config || null });
    }

    if (url.pathname === "/set" && request.method === "POST") {
      let payload;
      try {
        payload = await request.json();
      } catch (_) {
        return json({ ok: false, code: "bad_request", message: "Invalid request format." }, 400);
      }
      const config = payload?.config;
      if (!config || typeof config !== "object") {
        return json({ ok: false, code: "invalid_value", message: "Invalid config payload." }, 422);
      }
      await this.ctx.storage.put("site_config", config);
      return json({ ok: true });
    }

    return json({ ok: false, code: "not_found", message: "Not found." }, 404);
  }
}
