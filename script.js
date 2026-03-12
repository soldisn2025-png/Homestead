const CONTACT_CONFIG = {
  phone: "+82-10-0000-0000",
  email: "you@example.com",
  kakaoUrl: "https://open.kakao.com/o/replace-me",
  whatsappNumber: "821000000000",
  mapEmbed:
    "https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EB%B0%A9%EB%B0%B0%EB%8F%99%20911-14&output=embed",
};

const translations = {
  ko: {
    navAbout: "소개",
    navRooms: "객실",
    navLocation: "위치",
    navInquiry: "예약문의",
    heroKicker: "Warm Seoul Wanderer Stay",
    heroTitle: "서울 방배동, 나만의 편안한 공간",
    heroSubtitle:
      "방배역 인접 고시원형 숙소. 출퇴근과 서울 여행을 동시에 편리하게 만드는 실용적인 스테이.",
    heroAddress: "서울특별시 서초구 방배동 911-14",
    heroCtaInquiry: "지금 문의하기",
    heroCtaGallery: "객실 보기",
    aboutEyebrow: "Why Stay Here",
    aboutTitle: "교통과 생활, 둘 다 좋은 방배 스테이",
    feature1Title: "방배동 초역세권 위치",
    feature1Desc: "2호선 방배역 인접. 강남권 출퇴근 및 서울 주요 지역 이동이 편리합니다.",
    feature2Title: "전용 욕실 포함",
    feature2Desc: "개인 공간 중심 구조로 샤워/화장실 사용이 편리하고 프라이버시를 지킵니다.",
    feature3Title: "에어컨 · 세탁기 완비",
    feature3Desc: "기본 생활 설비를 갖춰 단기 체류자와 월 거주자 모두 바로 생활 가능합니다.",
    feature4Title: "외국인 환영",
    feature4Desc: "영어 문의 대응 가능. 예산형 서울 숙소를 찾는 해외 방문객에게 적합합니다.",
    galleryEyebrow: "Photo Gallery",
    galleryTitle: "실제 공간 미리 보기",
    captionCorridor: "복도",
    captionLobby: "로비",
    captionRoom1: "객실 1",
    captionRoom2: "객실 2",
    captionRoom3: "객실 3",
    captionRoom4: "객실 4",
    pricingEyebrow: "Pricing Guide",
    pricingTitle: "가격 안내 (v1 수동 시즌 요금)",
    pricingNightlyTitle: "단기 숙박",
    pricingNightlyMain: "₩45,000 / 1박부터",
    pricingNightlyRange: "평일 보통 ₩45,000~₩60,000, 주말/성수기 변동 가능",
    pricingMonthlyTitle: "월 거주",
    pricingMonthlyMain: "₩650,000 / 월부터",
    pricingMonthlyRange: "객실 타입 및 계약 기간에 따라 상이",
    pricingIncludeTitle: "포함/별도",
    pricingIncludeBody: "기본 인터넷/공용관리 포함. 상세 조건은 문의 시 정확히 안내합니다.",
    pricingUpdate: "마지막 업데이트: 2026-03-12",
    pricingNote:
      "정확한 금액은 입실일/체류기간 기준으로 빠르게 견적드립니다. No hidden pricing policy.",
    locationEyebrow: "Location Advantage",
    locationTitle: "출퇴근과 관광 모두 유리한 입지",
    locPoint1: "방배역 도보 약 1~2분",
    locPoint2: "강남역 약 15~20분 (노선/시간대에 따라 변동)",
    locPoint3: "잠실/명동 등 주요 지역 약 20~35분대 접근",
    locPoint4: "사당역(2·4호선) 환승 접근 용이, 서울 남북 이동 편리",
    locPoint5: "시간대/교통 상황에 따라 소요 시간은 달라질 수 있습니다.",
    contactEyebrow: "Fast Response",
    contactTitle: "지금 바로 문의하세요",
    contactSubtitle: "빠른 답변을 드립니다 · We respond quickly",
    contactEmailLabel: "EMAIL",
    contactSmsLabel: "문자/SMS",
    contactKakaoLabel: "KAKAO TALK",
    contactKakaoHandle: "오픈채팅 바로가기",
    contactWhatsappLabel: "WHATSAPP",
    contactPhoneLabel: "PHONE",
    formName: "이름",
    formContact: "전화번호 또는 이메일",
    formMessage: "문의 내용",
    formMessagePlaceholder: "문의 내용을 입력해 주세요",
    formConsent: "개인정보 수집 및 문의 응답 목적 이용에 동의합니다.",
    formSubmit: "문의 보내기",
    formNeedCaptcha: "보안 확인을 완료해 주세요.",
    formSending: "전송 중입니다...",
    formSuccess: "문의가 접수되었습니다. 빠르게 답변드리겠습니다.",
    formError: "전송에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 문의해 주세요.",
    footerAddress: "서울특별시 서초구 방배동 911-14",
    footerInquiry: "문의하기",
    footerLocation: "위치보기",
  },
  en: {
    navAbout: "About",
    navRooms: "Rooms",
    navLocation: "Location",
    navInquiry: "Inquiry",
    heroKicker: "Warm Seoul Wanderer Stay",
    heroTitle: "Your Cozy Base in the Heart of Seoul",
    heroSubtitle:
      "A practical budget guesthouse near Bangbae Station, ideal for both city commuting and Seoul sightseeing.",
    heroAddress: "911-14 Bangbae-dong, Seocho-gu, Seoul",
    heroCtaInquiry: "Send Inquiry",
    heroCtaGallery: "View Rooms",
    aboutEyebrow: "Why Stay Here",
    aboutTitle: "Strong Transit Location with Everyday Comfort",
    feature1Title: "Near Bangbae Station",
    feature1Desc: "Quick access to Seoul Metro Line 2 for commuting and central city routes.",
    feature2Title: "Private Bathroom Included",
    feature2Desc: "Private-focused layout with in-room bathroom convenience for daily comfort.",
    feature3Title: "AC + Laundry Ready",
    feature3Desc: "Essential in-room and building facilities for both short and monthly stays.",
    feature4Title: "Foreigner Friendly",
    feature4Desc: "English-friendly inquiries supported for budget travelers and long-stay visitors.",
    galleryEyebrow: "Photo Gallery",
    galleryTitle: "Look Inside the Property",
    captionCorridor: "Corridor",
    captionLobby: "Lobby",
    captionRoom1: "Room 1",
    captionRoom2: "Room 2",
    captionRoom3: "Room 3",
    captionRoom4: "Room 4",
    pricingEyebrow: "Pricing Guide",
    pricingTitle: "Pricing Snapshot (Manual Seasonal Rates)",
    pricingNightlyTitle: "Short Stay",
    pricingNightlyMain: "From KRW 45,000 / night",
    pricingNightlyRange: "Typical weekday KRW 45,000-60,000, weekend/peak season varies",
    pricingMonthlyTitle: "Monthly Stay",
    pricingMonthlyMain: "From KRW 650,000 / month",
    pricingMonthlyRange: "Final rate depends on room type and contract length",
    pricingIncludeTitle: "Included / Extra",
    pricingIncludeBody: "Basic internet and common management are included. Final terms are confirmed by inquiry.",
    pricingUpdate: "Last updated: 2026-03-12",
    pricingNote:
      "You always see numeric price ranges here first, then get an exact quote quickly for your dates.",
    locationEyebrow: "Location Advantage",
    locationTitle: "Good for Both Commute and Sightseeing",
    locPoint1: "About 1-2 minutes walk to Bangbae Station",
    locPoint2: "Around 15-20 minutes to Gangnam area (route/time dependent)",
    locPoint3: "About 20-35 minutes to key areas like Jamsil and Myeongdong",
    locPoint4: "Easy transfer access via Sadang (Line 2 and Line 4)",
    locPoint5: "Travel times are approximate and can vary by time of day.",
    contactEyebrow: "Fast Response",
    contactTitle: "Contact Us Now",
    contactSubtitle: "빠른 답변을 드립니다 · We respond quickly",
    contactEmailLabel: "EMAIL",
    contactSmsLabel: "SMS",
    contactKakaoLabel: "KAKAO TALK",
    contactKakaoHandle: "Open chat link",
    contactWhatsappLabel: "WHATSAPP",
    contactPhoneLabel: "PHONE",
    formName: "Name",
    formContact: "Phone or Email",
    formMessage: "Message",
    formMessagePlaceholder: "Please tell us your preferred dates and stay length.",
    formConsent: "I agree to data collection for inquiry response.",
    formSubmit: "Submit Inquiry",
    formNeedCaptcha: "Please complete the security check.",
    formSending: "Sending...",
    formSuccess: "Inquiry received. We will respond quickly.",
    formError: "Failed to send inquiry. Please try again or contact us by email.",
    footerAddress: "911-14 Bangbae-dong, Seocho-gu, Seoul, Korea",
    footerInquiry: "Inquiry",
    footerLocation: "Location",
  },
};

let currentLang = localStorage.getItem("preferred_lang") || "ko";

function t(key) {
  return translations[currentLang][key] || "";
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title =
    currentLang === "ko"
      ? "홈스테이드 방배 | 서울 방배동 고시원"
      : "Homestade Bangbae | Seoul Budget Accommodation";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    node.setAttribute("placeholder", t(key));
  });

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.langBtn === currentLang);
  });

  const langInput = document.getElementById("formLanguage");
  if (langInput) langInput.value = currentLang;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("preferred_lang", lang);
  applyTranslations();
}

function bindLanguageButtons() {
  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.langBtn));
  });
}

function bindMobileDrawer() {
  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("mobileDrawer");
  if (!menuBtn || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", () => {
    const willOpen = !drawer.classList.contains("open");
    drawer.classList.toggle("open", willOpen);
    drawer.setAttribute("aria-hidden", String(!willOpen));
    menuBtn.setAttribute("aria-expanded", String(willOpen));
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

function bindReveal() {
  const targets = document.querySelectorAll(".reveal:not(.hero)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  targets.forEach((item) => observer.observe(item));

  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-photo");
          galleryObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  galleryItems.forEach((item) => galleryObserver.observe(item));
}

function initGallery() {
  if (typeof GLightbox === "function") {
    GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
  }
}

function normalizePhoneToDigits(phone) {
  return phone.replace(/[^\d]/g, "");
}

function applyContactLinks() {
  const smsBody = encodeURIComponent("안녕하세요, 방배동 고시원 문의드립니다.");
  const waBody = encodeURIComponent("Hello, I'm interested in your room.");
  const cleanPhone = normalizePhoneToDigits(CONTACT_CONFIG.phone);

  const emailBtn = document.getElementById("btnEmail");
  const smsBtn = document.getElementById("btnSms");
  const kakaoBtn = document.getElementById("btnKakao");
  const waBtn = document.getElementById("btnWhatsapp");
  const phoneBtn = document.getElementById("btnPhone");

  if (emailBtn) emailBtn.href = `mailto:${CONTACT_CONFIG.email}`;
  if (smsBtn) smsBtn.href = `sms:${cleanPhone}?body=${smsBody}`;
  if (kakaoBtn) kakaoBtn.href = CONTACT_CONFIG.kakaoUrl;
  if (waBtn) waBtn.href = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${waBody}`;
  if (phoneBtn) phoneBtn.href = `tel:${cleanPhone}`;

  const mapFrame = document.querySelector(".location-wrap iframe");
  if (mapFrame && CONTACT_CONFIG.mapEmbed) mapFrame.src = CONTACT_CONFIG.mapEmbed;

  const textNodes = {
    emailDisplay: CONTACT_CONFIG.email,
    smsDisplay: CONTACT_CONFIG.phone,
    phoneDisplay: CONTACT_CONFIG.phone,
    whatsappDisplay: `+${CONTACT_CONFIG.whatsappNumber}`,
  };

  Object.entries(textNodes).forEach(([id, value]) => {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  });
}

function setStatus(message, type = "") {
  const node = document.getElementById("formStatus");
  if (!node) return;
  node.textContent = message;
  node.classList.remove("error", "success");
  if (type) node.classList.add(type);
}

function buildMailtoFallback(payload) {
  const subject = encodeURIComponent(
    payload.language === "ko" ? "[홈스테이드 방배] 문의" : "[Homestade Bangbae] Inquiry"
  );
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Contact: ${payload.contact}`,
      `Language: ${payload.language}`,
      "Message:",
      payload.message,
    ].join("\n")
  );
  return `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;
}

async function handleInquirySubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    contact: String(formData.get("contact") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    language: String(formData.get("language") || "ko"),
    turnstileToken: String(formData.get("turnstileToken") || "").trim(),
  };

  if (!payload.turnstileToken) {
    setStatus(t("formNeedCaptcha"), "error");
    return;
  }

  setStatus(t("formSending"));

  try {
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (response.ok && result.ok) {
      form.reset();
      const tokenNode = document.getElementById("turnstileToken");
      if (tokenNode) tokenNode.value = "";
      if (window.turnstile) {
        window.turnstile.reset();
      }
      setStatus(t("formSuccess"), "success");
      return;
    }
    throw new Error(result.message || "submit_failed");
  } catch (_) {
    setStatus(t("formError"), "error");
    window.location.href = buildMailtoFallback(payload);
  }
}

function bindInquiryForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;
  form.addEventListener("submit", handleInquirySubmit);
}

function bindYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
}

window.onTurnstileSuccess = function onTurnstileSuccess(token) {
  const tokenInput = document.getElementById("turnstileToken");
  if (tokenInput) tokenInput.value = token;
};

function init() {
  bindLanguageButtons();
  bindMobileDrawer();
  bindReveal();
  initGallery();
  applyContactLinks();
  bindInquiryForm();
  bindYear();
  applyTranslations();
}

init();
