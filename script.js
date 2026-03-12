const ADMIN_OVERRIDE_KEY = "homestead_admin_overrides";
const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1538485399081-7c8976de83cc?auto=format&fit=crop&w=1800&q=80";
const FALLBACK_ROOM_IMAGE =
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80";

const DEFAULT_BRANDING = {
  ko: "홈스테이드 서울",
  en: "Homestead Seoul",
};

const DEFAULT_CONTACT_CONFIG = {
  phone: "+82-10-0000-0000",
  email: "you@example.com",
  kakaoUrl: "https://open.kakao.com/o/replace-me",
  whatsappNumber: "821000000000",
  mapEmbed:
    "https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EB%B0%A9%EB%B0%B0%EB%8F%99%20911-14&output=embed",
};

const DEFAULT_MEDIA = {
  heroImage: FALLBACK_HERO_IMAGE,
  gallery: [
    { src: "images/Room_main.png", captionKey: "captionRoomMain", altKo: "객실", altEn: "Room" },
    { src: "images/Hallway_modern.png", captionKey: "captionHallwayModern", altKo: "복도", altEn: "Hallway" },
    { src: "images/building_outlook.png", captionKey: "captionExterior", altKo: "외관", altEn: "Exterior" },
    { src: "images/Corridor.png", captionKey: "captionCorridor", altKo: "복도", altEn: "Corridor" },
    { src: "images/lobby.png", captionKey: "captionLobby", altKo: "로비", altEn: "Lobby" },
    { src: "images/Room_1.png", captionKey: "captionRoom1", altKo: "객실 1", altEn: "Room 1" },
    { src: "images/Room_2.png", captionKey: "captionRoom2", altKo: "객실 2", altEn: "Room 2" },
    { src: "images/Room3.png", captionKey: "captionRoom3", altKo: "객실 3", altEn: "Room 3" },
    { src: "images/Room_4.png", captionKey: "captionRoom4", altKo: "객실 4", altEn: "Room 4" },
  ],
};

const BASE_TRANSLATIONS = {
  ko: {
    navAbout: "소개",
    navRooms: "객실",
    navLocation: "위치",
    navInquiry: "예약문의",
    heroKicker: "Warm Seoul Wanderer Stay",
    heroTitle: "서울 중심부, 나만의 평안한 공간",
    heroSubtitle: "출퇴근과 서울 여행을 모두 편하게 만드는 실속형 스테이.",
    heroCtaInquiry: "지금 문의하기",
    heroCtaGallery: "객실 보기",
    aboutEyebrow: "Why Stay Here",
    aboutTitle: "교통과 생활, 둘 다 좋은 홈스테이드 서울",
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
    captionRoomMain: "객실",
    captionHallwayModern: "복도",
    captionExterior: "외관",
    captionCorridor: "복도",
    captionLobby: "로비",
    captionRoom1: "객실 1",
    captionRoom2: "객실 2",
    captionRoom3: "객실 3",
    captionRoom4: "객실 4",
    pricingEyebrow: "Pricing",
    pricingTitle: "가격 안내",
    pricingNightlyTitle: "단기 숙박",
    pricingNightlyMain: "₩45,000 / 1박부터",
    pricingNightlyRange: "평일 보통 ₩45,000~₩60,000, 주말/성수기 변동 가능",
    pricingMonthlyTitle: "월 거주",
    pricingMonthlyMain: "₩650,000 / 월부터",
    pricingMonthlyRange: "객실 타입 및 계약 기간에 따라 상이",
    pricingIncludeTitle: "포함/별도",
    pricingIncludeBody: "기본 인터넷/공용관리 포함. 상세 조건은 문의 시 정확히 안내합니다.",
    pricingNote: "정확한 금액은 입실일/체류기간 기준으로 빠르게 견적드립니다.",
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
    heroTitle: "A Peaceful Space in Central Seoul",
    heroSubtitle: "Practical stay for both daily commuting and city sightseeing.",
    heroCtaInquiry: "Send Inquiry",
    heroCtaGallery: "View Rooms",
    aboutEyebrow: "Why Stay Here",
    aboutTitle: "Transit-Friendly and Comfortable Homestead Seoul",
    feature1Title: "Near Bangbae Station",
    feature1Desc: "Quick access to Seoul Metro Line 2 for commuting and city routes.",
    feature2Title: "Private Bathroom Included",
    feature2Desc: "Private-focused layout with in-room bathroom convenience for daily comfort.",
    feature3Title: "AC + Laundry Ready",
    feature3Desc: "Essential facilities for both short stays and monthly stays.",
    feature4Title: "Foreigner Friendly",
    feature4Desc: "English-friendly inquiry support for budget travelers and long-stay visitors.",
    galleryEyebrow: "Photo Gallery",
    galleryTitle: "Look Inside the Property",
    captionRoomMain: "Room",
    captionHallwayModern: "Hallway",
    captionExterior: "Exterior",
    captionCorridor: "Corridor",
    captionLobby: "Lobby",
    captionRoom1: "Room 1",
    captionRoom2: "Room 2",
    captionRoom3: "Room 3",
    captionRoom4: "Room 4",
    pricingEyebrow: "Pricing",
    pricingTitle: "Pricing Guide",
    pricingNightlyTitle: "Short Stay",
    pricingNightlyMain: "From KRW 45,000 / night",
    pricingNightlyRange: "Typical weekday KRW 45,000-60,000, weekend/peak season varies",
    pricingMonthlyTitle: "Monthly Stay",
    pricingMonthlyMain: "From KRW 650,000 / month",
    pricingMonthlyRange: "Final rate depends on room type and contract length",
    pricingIncludeTitle: "Included / Extra",
    pricingIncludeBody: "Basic internet and common management are included. Final terms are shared on inquiry.",
    pricingNote: "You see numeric ranges first, then receive an exact quote quickly for your dates.",
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

const branding = { ...DEFAULT_BRANDING };
const contactConfig = { ...DEFAULT_CONTACT_CONFIG };
const mediaConfig = JSON.parse(JSON.stringify(DEFAULT_MEDIA));
const translations = JSON.parse(JSON.stringify(BASE_TRANSLATIONS));
let currentLang = localStorage.getItem("preferred_lang") || "ko";
let lightbox = null;

function mergeFlatStrings(target, source) {
  if (!source || typeof source !== "object") return;
  Object.entries(source).forEach(([key, value]) => {
    if (typeof value === "string") target[key] = value;
  });
}

function loadAdminOverrides() {
  let raw;
  try {
    raw = localStorage.getItem(ADMIN_OVERRIDE_KEY);
    if (!raw) return;
    const overrides = JSON.parse(raw);
    mergeFlatStrings(branding, overrides.branding);
    mergeFlatStrings(contactConfig, overrides.contact);
    if (overrides.media && typeof overrides.media === "object") {
      if (typeof overrides.media.heroImage === "string") mediaConfig.heroImage = overrides.media.heroImage;
      if (Array.isArray(overrides.media.gallery)) {
        overrides.media.gallery.forEach((item, i) => {
          if (!mediaConfig.gallery[i]) return;
          if (item && typeof item.src === "string") mediaConfig.gallery[i].src = item.src;
          if (item && typeof item.altKo === "string") mediaConfig.gallery[i].altKo = item.altKo;
          if (item && typeof item.altEn === "string") mediaConfig.gallery[i].altEn = item.altEn;
        });
      }
    }
    if (overrides.translations && typeof overrides.translations === "object") {
      ["ko", "en"].forEach((lang) => {
        if (overrides.translations[lang]) {
          mergeFlatStrings(translations[lang], overrides.translations[lang]);
        }
      });
    }
  } catch (_) {
    // Ignore malformed override payload and fall back to defaults.
  }
}

function t(key) {
  return translations[currentLang]?.[key] || "";
}

function setImageSource(img, source, fallback, anchor) {
  if (!img) return;
  img.dataset.fallbackApplied = "0";
  img.onerror = () => {
    if (img.dataset.fallbackApplied === "1") return;
    img.dataset.fallbackApplied = "1";
    img.src = fallback;
    if (anchor) anchor.href = fallback;
  };
  img.src = source || fallback;
  if (anchor) anchor.href = source || fallback;
}

function applyBranding() {
  const brandKo = document.getElementById("brandKo");
  const brandEn = document.getElementById("brandEn");
  const footerBrand = document.getElementById("footerBrand");
  if (brandKo) brandKo.textContent = branding.ko;
  if (brandEn) brandEn.textContent = branding.en.toUpperCase();
  if (footerBrand) footerBrand.textContent = branding.en;
}

function applyMedia() {
  const hero = document.getElementById("heroImage");
  if (hero) {
    setImageSource(hero, mediaConfig.heroImage, FALLBACK_HERO_IMAGE);
    hero.alt = currentLang === "ko" ? "서울 풍경" : "Seoul city view";
  }

  mediaConfig.gallery.forEach((item, index) => {
    const anchor = document.getElementById(`galleryItem${index}`);
    const image = document.getElementById(`galleryImg${index}`);
    if (!anchor || !image) return;
    setImageSource(image, item.src, FALLBACK_ROOM_IMAGE, anchor);
    const alt = currentLang === "ko" ? item.altKo : item.altEn;
    image.alt = alt;
    anchor.setAttribute("data-title", t(item.captionKey) || alt);
  });
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title =
    currentLang === "ko"
      ? `${branding.ko} | Seoul Budget Accommodation`
      : `${branding.en} | Seoul Budget Accommodation`;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      currentLang === "ko" ? `${branding.ko} | ${branding.en}` : `${branding.en} | ${branding.ko}`
    );
  }

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

  applyBranding();
  applyMedia();
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("preferred_lang", lang);
  applyTranslations();
  initGallery();
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
  if (typeof GLightbox !== "function") return;
  if (lightbox) lightbox.destroy();
  lightbox = GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
}

function normalizePhoneToDigits(phone) {
  return phone.replace(/[^\d]/g, "");
}

function applyContactLinks() {
  const smsBody = encodeURIComponent("안녕하세요, 홈스테이드 서울 문의드립니다.");
  const waBody = encodeURIComponent("Hello, I'm interested in your room.");
  const cleanPhone = normalizePhoneToDigits(contactConfig.phone);

  const emailBtn = document.getElementById("btnEmail");
  const smsBtn = document.getElementById("btnSms");
  const kakaoBtn = document.getElementById("btnKakao");
  const waBtn = document.getElementById("btnWhatsapp");
  const phoneBtn = document.getElementById("btnPhone");

  if (emailBtn) emailBtn.href = `mailto:${contactConfig.email}`;
  if (smsBtn) smsBtn.href = `sms:${cleanPhone}?body=${smsBody}`;
  if (kakaoBtn) kakaoBtn.href = contactConfig.kakaoUrl;
  if (waBtn) waBtn.href = `https://wa.me/${contactConfig.whatsappNumber}?text=${waBody}`;
  if (phoneBtn) phoneBtn.href = `tel:${cleanPhone}`;

  const mapFrame = document.querySelector(".location-wrap iframe");
  if (mapFrame && contactConfig.mapEmbed) mapFrame.src = contactConfig.mapEmbed;

  const textNodes = {
    emailDisplay: contactConfig.email,
    smsDisplay: contactConfig.phone,
    phoneDisplay: contactConfig.phone,
    whatsappDisplay: `+${contactConfig.whatsappNumber}`,
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
    payload.language === "ko" ? `[${branding.ko}] 문의` : `[${branding.en}] Inquiry`
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
  return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
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
      if (window.turnstile) window.turnstile.reset();
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
  loadAdminOverrides();
  bindLanguageButtons();
  bindMobileDrawer();
  bindReveal();
  applyTranslations();
  initGallery();
  applyContactLinks();
  bindInquiryForm();
  bindYear();
}

init();
