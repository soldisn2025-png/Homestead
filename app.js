const ADMIN_OVERRIDE_KEY = "homestead_admin_overrides";
const DEFAULT_BRANDING = {
  ko: "홈스테드 서울",
  en: "Homestead Seoul",
};

const DEFAULT_CONTACT_CONFIG = {
  phone: "010-3286-8682",
  email: "homesteadseoul@gmail.com",
  kakaoUrl: "https://open.kakao.com/o/replace-me",
  whatsappNumber: "821032868682",
  naverUrl: "",
  mapEmbed:
    "https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EB%B0%A9%EB%B0%B0%EB%8F%99%20911-14&output=embed",
};

const DEFAULT_MEDIA = {
  heroImages: ["images/5.png", "images/4.png", "images/6.png"],
  gallery: [
    { src: "images/5.png", captionKo: "가장 넓고 깊이감 있는 객실 예시", captionEn: "Example of a deeper, more spacious room" },
    { src: "images/1.png", captionKo: "단정한 개인실과 수납 구성", captionEn: "Private room with clean storage layout" },
    { src: "images/4.png", captionKo: "세탁기와 기본 생활 동선이 갖춰진 실내", captionEn: "In-room daily essentials including laundry" },
    { src: "images/2.png", captionKo: "밝고 정돈된 복도", captionEn: "Bright and well-kept corridor" },
    { src: "images/3.png", captionKo: "입구에서 느껴지는 정리된 분위기", captionEn: "Clean arrival impression from the entry hall" },
    { src: "images/6.png", captionKo: "자연광이 잘 드는 외관", captionEn: "Exterior with natural daylight and a clean facade" },
  ],
};

const heroTextOverrides = { ko: {}, en: {} };
const branding = { ...DEFAULT_BRANDING };
const contactConfig = { ...DEFAULT_CONTACT_CONFIG };
const mediaConfig = JSON.parse(JSON.stringify(DEFAULT_MEDIA));

const PRICE_BY_KEY = {
  S: {
    ko: { main: "월 총액 100만원", sub: "기본 월세 90만원 + 관리비 10만원 · 공과금 추가 없음" },
    en: { main: "KRW 1,000,000 / month", sub: "All-in monthly price with no extra utility charges" },
  },
  A: {
    ko: { main: "월 총액 80만원", sub: "기본 월세 70만원 + 관리비 10만원 · 공과금 추가 없음" },
    en: { main: "KRW 800,000 / month", sub: "All-in monthly price with no extra utility charges" },
  },
  B: {
    ko: { main: "월 총액 60만원", sub: "기본 월세 50만원 + 관리비 10만원 · 공과금 추가 없음" },
    en: { main: "KRW 600,000 / month", sub: "All-in monthly price with no extra utility charges" },
  },
  APLUS: {
    ko: { main: "A+ 객실 개별 안내", sub: "A와 S 사이에서 객실 상태에 따라 개별 안내" },
    en: { main: "A+ room quoted individually", sub: "Quoted between A and S depending on room condition" },
  },
};

const ROOMS = [
  { id: "201", tier: "S", priceKey: "S", image: "images/5.png", filters: ["quiet", "window"], tag: { ko: "시그니처 정숙", en: "Signature quiet" }, focus: { ko: "좌우 인접실이 없어 가장 조용한 축", en: "Quietest line with no rooms directly on either side" }, features: { ko: ["대형 타입", "욕실 창", "조용함 우선"], en: ["Large room", "Bathroom window", "Quiet-first layout"] } },
  { id: "301", tier: "S", priceKey: "S", image: "images/1.png", filters: ["quiet", "window"], tag: { ko: "시그니처 정숙", en: "Signature quiet" }, focus: { ko: "201호와 같은 조용한 라인의 상층 객실", en: "Upper-floor version of the quiet signature line" }, features: { ko: ["대형 타입", "욕실 창", "상층 선호"], en: ["Large room", "Bathroom window", "Higher-floor appeal"] } },
  { id: "401", tier: "S", priceKey: "S", image: "images/5.png", filters: ["quiet", "window"], tag: { ko: "시그니처 정숙", en: "Signature quiet" }, focus: { ko: "가장 조용한 라인의 고층 객실", en: "High-floor room in the quietest line" }, features: { ko: ["대형 타입", "욕실 창", "정숙성 중심"], en: ["Large room", "Bathroom window", "Low-noise placement"] } },
  { id: "101", tier: "S", priceKey: "S", image: "images/5.png", filters: ["spacious"], tag: { ko: "가장 넓은 타입", en: "Largest room" }, focus: { ko: "실면적이 가장 넓어 장기 체류 안정감이 큼", en: "Largest footprint for the most spacious long-stay feel" }, features: { ko: ["가장 큰 실면적", "여유 있는 동선", "장기 거주 선호"], en: ["Largest footprint", "More generous circulation", "Long-stay friendly"] } },
  { id: "102", tier: "S", priceKey: "S", image: "images/1.png", filters: ["rectangle"], tag: { ko: "깔끔한 직사각형", en: "Clean rectangle" }, focus: { ko: "수납과 책상 배치가 쉬운 실용형 레이아웃", en: "Rectangular layout that is easy to live in day to day" }, features: { ko: ["직사각형 구조", "정리감 좋은 배치", "실용성 우수"], en: ["Rectangular layout", "Easy furniture placement", "Practical everyday use"] } },
  { id: "205", tier: "A+", priceKey: "APLUS", image: "images/4.png", filters: ["quiet", "spacious"], tag: { ko: "복도 끝 조용한 객실", en: "Quiet end room" }, focus: { ko: "대형이며 복도 끝에 있어 조용한 편", en: "Large room near the end of the hallway for a quieter feel" }, features: { ko: ["대형 타입", "복도 끝", "A+ 별도 안내"], en: ["Large room", "End-of-hall placement", "A+ custom quote"] } },
  { id: "212", tier: "A", priceKey: "A", image: "images/4.png", filters: ["window"], tag: { ko: "채광 우수", en: "Bright natural light" }, focus: { ko: "중간 크기지만 빛이 잘 들고 욕실창이 있음", en: "Balanced room with good sunlight and a bathroom window" }, features: { ko: ["좋은 채광", "욕실 창", "균형형 타입"], en: ["Good sunlight", "Bathroom window", "Balanced daily comfort"] } },
  { id: "409", tier: "A", priceKey: "A", image: "images/1.png", filters: ["rectangle", "spacious"], tag: { ko: "실용형 직사각형", en: "Practical rectangle" }, focus: { ko: "넉넉한 직사각형으로 배치가 쉬운 객실", en: "Spacious rectangle that is easy to organize" }, features: { ko: ["넉넉한 직사각형", "책상 배치 용이", "실용형"], en: ["Spacious rectangle", "Desk-friendly layout", "Practical feel"] } },
  { id: "208", tier: "A", priceKey: "A", image: "images/4.png", filters: ["rectangle"], tag: { ko: "실용형 직사각형", en: "Practical rectangle" }, focus: { ko: "정돈된 직사각형 구조를 선호할 때 적합", en: "Good option when you want a straightforward rectangular room" }, features: { ko: ["직사각형 구조", "동선 단순", "A티어 실속형"], en: ["Rectangular layout", "Simple circulation", "Value within A tier"] } },
  { id: "209", tier: "A", priceKey: "A", image: "images/1.png", filters: ["rectangle"], tag: { ko: "실용형 직사각형", en: "Practical rectangle" }, focus: { ko: "가구 배치와 생활 동선이 안정적인 편", en: "Stable room shape for furniture placement and daily routines" }, features: { ko: ["직사각형 구조", "실용적 구성", "장기 생활 적합"], en: ["Rectangular layout", "Practical setup", "Works well for routine stays"] } },
  { id: "204", tier: "A", priceKey: "A", image: "images/4.png", filters: ["rectangle"], tag: { ko: "실용형 직사각형", en: "Practical rectangle" }, focus: { ko: "비교적 단정한 형태를 선호하는 분께 적합", en: "Useful when you prefer a clean and efficient room shape" }, features: { ko: ["정리감 좋은 구조", "합리적 선택", "A티어"], en: ["Clean room shape", "Practical choice", "A tier"] } },
];

const COLLECTIONS = [
  { image: "images/5.png", title: { ko: "시그니처 정숙 객실", en: "Signature Quiet Rooms" }, copy: { ko: "201 / 301 / 401호는 좌우 인접실이 없어 조용함을 가장 우선하는 사용자에게 적합합니다.", en: "Rooms 201, 301, and 401 are the quietest rooms, with no rooms directly on either side." }, stat: { ko: "정숙성 최우선", en: "Lowest noise exposure" }, rooms: ["201", "301", "401"] },
  { image: "images/5.png", title: { ko: "여유 있는 면적의 객실", en: "Most Spacious Rooms" }, copy: { ko: "101호는 가장 넓고, 205호는 대형에 복도 끝 배치라서 장기 체류 안정감이 있습니다.", en: "Room 101 is the largest, and Room 205 adds a large footprint with a quieter end-of-hall position." }, stat: { ko: "장기 체류 선호", en: "More spacious feel" }, rooms: ["101", "205"] },
  { image: "images/1.png", title: { ko: "실용형 직사각형 객실", en: "Practical Rectangular Layouts" }, copy: { ko: "102 / 204 / 208 / 209 / 409호는 책상, 침대, 수납 동선을 정리하기 쉬운 형태입니다.", en: "Rooms 102, 204, 208, 209, and 409 are shaped for easier furniture placement and practical routines." }, stat: { ko: "배치가 쉬운 구조", en: "Easy to organize" }, rooms: ["102", "204", "208", "209", "409"] },
  { image: "images/4.png", title: { ko: "밝은 욕실창 객실", en: "Bright Rooms with Windowed Bathrooms" }, copy: { ko: "201 / 301 / 401 / 212호는 욕실창이 있어 환기와 쾌적함을 중요하게 보는 사용자에게 적합합니다.", en: "Rooms 201, 301, 401, and 212 include bathroom windows, which adds ventilation and a brighter feel." }, stat: { ko: "채광과 환기", en: "Ventilation plus light" }, rooms: ["201", "301", "401", "212"] },
];

const ICONS = {
  bathroom: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M7 12V7a2 2 0 0 1 4 0v5"/><path d="M6 12v3a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-3"/><path d="M6 21v-1"/><path d="M18 21v-1"/></svg>',
  kitchen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16"/><path d="M6 6v12"/><path d="M18 6v12"/><path d="M6 18h12"/><path d="M11 10h2"/><path d="M9 14h6"/></svg>',
  wash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8"/><circle cx="12" cy="14" r="3.5"/><path d="M8 4v3"/></svg>',
  fridge: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M6 10h12"/><path d="M10 6v1"/><path d="M10 14v1"/></svg>',
  bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16v6H4z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M7 12V8h4a3 3 0 0 1 3 3v1"/></svg>',
  micro: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h5"/><path d="M8 13h5"/><path d="M17 10v4"/><path d="M19 10v4"/></svg>',
  table: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14"/><path d="M7 8v9"/><path d="M17 8v9"/><path d="M10 17h4"/><path d="M12 8V5"/></svg>',
  linen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10H5z"/><path d="M5 11h14"/><path d="M9 15h6"/></svg>',
};

const PAGE_CONTENT = {
  ko: {
    seo: {
      title: "홈스테드 서울 | 서울의 1인 전용 프라이빗룸",
      description: "서울 방배역 인근 1인 전용 고시텔. 전 객실 개인 욕실, 최소 14일, 보증금 1개월, 공과금 추가 없음.",
      ogTitle: "홈스테드 서울 | 1인 전용 프라이빗룸",
      ogDescription: "가격과 조건이 먼저 보이는 비교형 홈페이지. 조용한 객실, 실용형 레이아웃, 빠른 문의 동선을 담았습니다.",
      locale: "ko_KR",
    },
    brandSubtitle: "서울의 1인 전용 프라이빗룸",
    nav: [{ href: "#pricing", label: "가격" }, { href: "#rooms", label: "객실" }, { href: "#included", label: "구성" }, { href: "#location", label: "위치" }, { href: "#faq", label: "FAQ" }, { href: "#contact", label: "문의" }],
    sections: ["hero", "summary", "pricing", "collections", "inventory", "gallery", "included", "location", "process", "faq", "contact"],
    hero: { kicker: "Private Room · Solo Stay · 14+ Days", title: "서울에서 조용하고 실용적인 1인실", subtitle: "방배역 가까운 1인 전용 고시텔입니다. 전 객실 개인 욕실, 최소 14일, 보증금 1개월, 공과금 추가 없음까지 한 번에 확인할 수 있게 구성했습니다.", chips: ["1인실만 운영", "전 객실 개인 욕실", "공과금 추가 없음", "방배역 인접"], notes: ["최소 거주 14일", "보증금 1개월", "빠른 문의 가능"], visualLabels: ["넓고 정돈된 객실", "생활 동선이 보이는 실내", "밝은 외관과 진입감"], primaryAction: { type: "naver", label: "네이버 문의", fallbackLabel: "빠른 문의" }, secondaryAction: { href: "#rooms", label: "객실 비교 보기" }, tertiaryAction: { type: "phone", label: "전화 문의" } },
    summary: { eyebrow: "Quick Facts", title: "결정 전에 먼저 보는 정보만 간단히", desc: "월 비용, 보증금, 관리비, 최소 거주 조건을 빠르게 스캔할 수 있게 정리합니다.", items: [{ label: "월 총액", value: "60~100만원대", note: "S / A / B 티어 기준" }, { label: "보증금", value: "1개월", note: "기본 월세 기준" }, { label: "관리비", value: "10만원", note: "분리 표기 가능" }, { label: "공과금", value: "추가 없음", note: "예상 비용 계산이 단순" }, { label: "최소 거주", value: "14일", note: "장기 투숙형 단기 거주" }] },
    pricing: { eyebrow: "Pricing & Terms", title: "월 비용과 입주 조건을 먼저 비교하세요", desc: "한국어 페이지는 총액을 먼저 보이게 하고, 월세와 관리비를 분리해 비교하기 쉬운 방식으로 구성합니다.", rows: [{ tier: "S tier", rooms: "201 / 301 / 401 / 101 / 102", note: "정숙성, 면적, 레이아웃 선호도가 높은 대표 객실입니다.", columns: [{ label: "월 총액", value: "1,000,000원", note: "공과금 추가 없음" }, { label: "기본 월세", value: "900,000원", note: "보증금 기준" }, { label: "관리비", value: "100,000원", note: "별도 유틸리티 없음" }, { label: "보증금", value: "900,000원", note: "기본 월세 1개월분" }] }, { tier: "A tier", rooms: "212 / 204 / 208 / 209 / 409", note: "실용형 직사각형과 균형형 객실이 중심입니다.", columns: [{ label: "월 총액", value: "800,000원", note: "공과금 추가 없음" }, { label: "기본 월세", value: "700,000원", note: "보증금 기준" }, { label: "관리비", value: "100,000원", note: "별도 유틸리티 없음" }, { label: "보증금", value: "700,000원", note: "기본 월세 1개월분" }] }, { tier: "B tier", rooms: "가용 객실 발생 시 안내", note: "현재 대표 노출 객실은 아니지만, 일정에 따라 안내 가능한 경우가 있습니다.", columns: [{ label: "월 총액", value: "600,000원", note: "공과금 추가 없음" }, { label: "기본 월세", value: "500,000원", note: "보증금 기준" }, { label: "관리비", value: "100,000원", note: "별도 유틸리티 없음" }, { label: "보증금", value: "500,000원", note: "기본 월세 1개월분" }] }], sideTitle: "같이 안내해야 하는 조건", sideBody: "월 비용만 낮게 보이게 하지 않고, 보증금과 관리비 구조를 함께 보여주는 것이 한국어 사용자에게 더 신뢰를 줍니다.", notes: ["모든 객실은 1인 전용입니다.", "최소 거주는 14일입니다.", "공과금 추가 청구는 없습니다.", "205호 A+ 객실은 A와 S 사이에서 개별 안내합니다.", "빠른 가능 여부 확인은 네이버 문의 또는 카카오 문의가 효율적입니다."] },
    collections: { eyebrow: "Room Logic", title: "가격만이 아니라 객실 성격으로도 고를 수 있게", desc: "낮은 가격이 덜 좋아 보이지 않도록, 객실을 장점 기준으로 묶어 보여줍니다." },
    inventory: { eyebrow: "Inventory", title: "호실별 비교", desc: "모든 호실은 1인실 기준이며, 각 객실이 잘 맞는 사용 상황을 함께 보여줍니다.", helper: "필터를 눌러 조용함, 넓이, 직사각형, 욕실창 중심으로 빠르게 좁혀볼 수 있습니다.", filters: [{ id: "all", label: "전체" }, { id: "quiet", label: "조용한 객실" }, { id: "spacious", label: "넓은 타입" }, { id: "rectangle", label: "직사각형" }, { id: "window", label: "욕실창" }], primaryCta: "이 객실 문의", secondaryCta: "가격 보기" },
    gallery: { eyebrow: "Real Photos", title: "보이는 그대로 확인하는 실제 공간 사진", desc: "과장된 연출보다 방 구조와 생활 동선을 읽을 수 있는 사진 배치를 우선합니다." },
    included: { eyebrow: "Included", title: "바로 생활 가능한 기본 구성을 명확하게", desc: "전 객실 공통 구성과 운영 조건을 한눈에 보이게 정리합니다.", amenities: [{ icon: "bathroom", title: "개인 욕실", desc: "모든 객실이 프라이빗 욕실을 포함합니다." }, { icon: "kitchen", title: "간단 조리 가능", desc: "객실 내 간이 주방 또는 운영자 안내 기준의 주방 이용이 가능합니다." }, { icon: "wash", title: "세탁기", desc: "장기 체류를 위한 세탁 동선을 갖춥니다." }, { icon: "fridge", title: "냉장고", desc: "개인 음식과 음료를 보관할 수 있습니다." }, { icon: "bed", title: "침대", desc: "즉시 생활 가능한 취침 구성이 준비됩니다." }, { icon: "micro", title: "전자레인지", desc: "간단한 식사 준비가 쉽습니다." }, { icon: "table", title: "접이식 테이블과 의자", desc: "식사, 공부, 노트북 사용에 적합합니다." }, { icon: "linen", title: "생활용품 포함", desc: "침구, 베개, 수건, 비누 등 기본 용품이 제공됩니다." }], promises: [{ title: "1인 전용 운영", desc: "호텔이나 다인실이 아니라, 혼자 생활하는 사용자를 전제로 설계된 페이지입니다." }, { title: "공과금 추가 없음", desc: "월 비용 계산이 단순해 예산 판단이 빠릅니다." }, { title: "빠른 입주 판단", desc: "문의 후 가능한 객실과 입주 가능 시점을 바로 확인하는 흐름을 강조합니다." }] },
    location: { eyebrow: "Location", title: "방배역 중심의 실용적인 이동성", desc: "출퇴근과 일상 이동을 먼저 보는 한국어 사용자에게 맞춰 위치 정보를 짧고 직접적으로 정리합니다.", points: ["방배역 도보 약 1~2분", "강남권 이동이 편한 2호선 접근성", "사당역 환승 축과도 가까워 남북 이동이 편리", "학생, 직장인, 시험 준비생이 일상 루틴을 만들기 좋은 입지"], sideTitle: "생활 기준에서 보는 위치", sideBody: "관광지 설명보다 출퇴근, 통학, 일상 편의점·식사·지하철 동선이 잘 읽히도록 구성하는 편이 한국어 페이지에 더 적합합니다." },
    process: { eyebrow: "Move-In Flow", title: "문의부터 입주까지 간단하게", desc: "이미 고시원 거주 경험이 있는 사용자가 빠르게 의사결정할 수 있도록 단계 수를 줄여 설명합니다.", steps: [{ title: "가능 객실 확인", copy: "입주 희망일과 체류 기간을 보내면 가능한 호실을 먼저 안내합니다." }, { title: "가격과 조건 확인", copy: "월 비용, 보증금, 최소 거주 조건을 확정합니다." }, { title: "입주 일정 조율", copy: "호실과 입주일을 맞춰 바로 진행합니다." }, { title: "바로 생활 시작", copy: "기본 생활용품이 준비된 상태로 혼자 생활을 시작할 수 있습니다." }] },
    faq: { eyebrow: "FAQ", title: "자주 묻는 질문", items: [{ q: "모든 객실이 1인실인가요?", a: "네. 홈스테드 서울은 모든 객실을 1인 전용으로 운영합니다." }, { q: "최소 거주 기간은 얼마나 되나요?", a: "최소 거주 기간은 14일입니다." }, { q: "보증금은 얼마인가요?", a: "보증금은 기본 월세 1개월분 기준입니다. 한국어 페이지에서는 총액과 분리 구조를 함께 안내합니다." }, { q: "관리비와 공과금은 어떻게 되나요?", a: "관리비를 분리해 표기할 수 있지만, 공과금 추가 청구는 없습니다." }, { q: "가장 조용한 객실은 어느 호실인가요?", a: "201 / 301 / 401호가 좌우 인접실이 없어 가장 조용한 축으로 안내됩니다." }, { q: "A+ 객실 205호는 얼마인가요?", a: "205호는 A와 S 사이에서 객실 상태와 시점에 따라 개별 안내합니다." }] },
    contact: { eyebrow: "Inquiry", title: "빠르게 문의하고 입주 가능 객실을 확인하세요", message: "한국어 페이지는 네이버 문의와 직접 문의를 더 앞세웁니다. 빠르게 비교하고 결정하려는 사용자를 위한 흐름입니다.", channels: [{ type: "naver", label: "네이버 문의", hint: "우선순위 CTA" }, { type: "kakao", label: "카카오톡", hint: "간단한 상담에 적합" }, { type: "phone", label: "전화", hint: "즉시 확인이 필요할 때" }, { type: "email", label: "이메일", hint: "문서형 문의에 적합" }], form: { name: "이름", contact: "전화번호 또는 이메일", message: "문의 내용", placeholder: "희망 입주일, 체류 기간, 궁금한 호실을 적어 주세요.", consent: "개인정보 수집 및 문의 응답 목적 사용에 동의합니다.", submit: "문의 보내기", sending: "전송 중입니다...", success: "문의가 접수되었습니다. 가능한 객실 확인 후 빠르게 답변드리겠습니다.", error: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요." }, mobileCtas: [{ type: "naver", label: "네이버 문의", fallbackLabel: "빠른 문의" }, { type: "phone", label: "전화 문의" }] },
    footer: { copy: "서울에서 혼자 머무는 사람을 위한, 조용하고 실용적인 프라이빗룸.", address: "서울특별시 서초구 방배동 911-14", links: [{ href: "#pricing", label: "가격" }, { href: "#rooms", label: "객실" }, { href: "#contact", label: "문의" }] },
  },
  en: {
    seo: { title: "Homestead Seoul | Furnished Private Rooms for Solo Stays", description: "Private furnished rooms in Seoul for one person only. Minimum stay 14 days, private bathroom, simple move-in, no extra utility charges.", ogTitle: "Homestead Seoul | Furnished Private Rooms in Seoul", ogDescription: "A calm, practical long-stay room option near Bangbae Station for digital nomads, interns, exchange students, and solo visitors.", locale: "en_US" },
    brandSubtitle: "Private Room Urban Living",
    nav: [{ href: "#about", label: "About" }, { href: "#included", label: "Included" }, { href: "#rooms", label: "Rooms" }, { href: "#pricing", label: "Pricing" }, { href: "#faq", label: "FAQ" }, { href: "#contact", label: "Contact" }],
    sections: ["hero", "concept", "included", "gallery", "process", "collections", "inventory", "pricing", "location", "faq", "contact"],
    hero: { kicker: "Furnished Solo Stay · Seoul · 14+ Days", title: "Furnished private rooms in Seoul for solo stays", subtitle: "Homestead Seoul is a calm, practical private-room gosiwon near Bangbae Station. It is designed for one person per room, with essentials included for stays of 14 days or longer.", chips: ["Private room only", "One person per room", "Utilities included", "Bangbae Station access"], notes: ["Simple move-in", "Minimum stay 14 days", "Foreigner-friendly inquiry"], visualLabels: ["Bright room overview", "Daily essentials already set up", "Well-kept exterior"], primaryAction: { href: "#contact", label: "Check availability" }, secondaryAction: { type: "whatsapp", label: "WhatsApp" }, tertiaryAction: { href: "#rooms", label: "View rooms" } },
    concept: { eyebrow: "What It Is", title: "A practical Seoul base, not a hotel or hostel", desc: "International guests often need a little more context. The English page explains what daily life looks like before asking for a conversion action.", cards: [{ title: "A compact private room for one person", copy: "Every room is for solo occupancy only, which keeps the positioning clear and avoids a shared-living or dorm feeling." }, { title: "Set up for longer stays, not short tourist nights", copy: "The minimum stay is 14 days, so the experience is closer to practical urban living than a nightly accommodation model." }, { title: "Straightforward, furnished, and low-friction", copy: "Private bathroom, daily essentials, and a simple inquiry flow make it easier to settle in for several weeks or months." }] },
    collections: { eyebrow: "Room Collections", title: "Choose by feel, not just by tier", desc: "Instead of making lower-priced rooms feel lesser, the English page groups rooms by the kind of stay they suit best." },
    inventory: { eyebrow: "Room List", title: "Room-by-room overview", desc: "Use the filters to focus on quiet rooms, more spacious options, rectangular layouts, or rooms with bathroom windows.", helper: "The room cards are structured to help foreign guests understand what changes from room to room without relying on local housing jargon.", filters: [{ id: "all", label: "All rooms" }, { id: "quiet", label: "Quiet rooms" }, { id: "spacious", label: "More space" }, { id: "rectangle", label: "Rectangular layout" }, { id: "window", label: "Bathroom window" }], primaryCta: "Ask about this room", secondaryCta: "See pricing" },
    gallery: { eyebrow: "Real Photos", title: "Bright, honest photography of the actual space", desc: "The image treatment stays factual: room overview, circulation, hallway cleanliness, and exterior clarity rather than staged luxury." },
    included: { eyebrow: "What Is Included", title: "The essentials are already part of daily life here", desc: "The English page moves this section earlier because foreigners care about furnished setup, privacy, and how easy it will be to start living right away.", amenities: [{ icon: "bathroom", title: "Private bathroom", desc: "Every room includes its own private bathroom." }, { icon: "kitchen", title: "Kitchenette or kitchen access", desc: "Cooking setup is available in-room or via operator guidance, depending on the room arrangement." }, { icon: "wash", title: "Washing machine", desc: "Useful for weeks-long or months-long stays." }, { icon: "fridge", title: "Refrigerator", desc: "Keep everyday food and drinks in your room." }, { icon: "bed", title: "Bed", desc: "Ready for move-in without bringing furniture." }, { icon: "micro", title: "Microwave", desc: "Easy for quick meals and longer-stay routines." }, { icon: "table", title: "Foldable table and chair", desc: "Works for meals, study, and laptop use." }, { icon: "linen", title: "Bedding and basics", desc: "Bedding, pillow, towels, soap, and related essentials are included." }], promises: [{ title: "Private room comfort", desc: "This is positioned as well-kept urban private-room living, not a backpacker stay." }, { title: "Clear monthly cost", desc: "No extra utility charges helps keep budgeting simple for international guests." }, { title: "Simple start", desc: "A few inquiry details are usually enough to check availability and move-in fit." }] },
    pricing: { eyebrow: "Pricing", title: "All-in monthly pricing is easier to trust", desc: "For international guests, a single monthly total reads as clearer and more reassuring than a split management-fee structure.", rows: [{ tier: "S tier", rooms: "201 / 301 / 401 / 101 / 102", note: "Best for guests who prioritize more space, lower noise, or stronger overall room positioning.", columns: [{ label: "Monthly price", value: "KRW 1,000,000", note: "All-in monthly total" }, { label: "Deposit", value: "1 month rent", note: "Collected before move-in" }, { label: "Utilities", value: "Included", note: "No extra utility charges" }] }, { tier: "A tier", rooms: "212 / 204 / 208 / 209 / 409", note: "Balanced, practical rooms that keep the monthly cost lower without feeling low-end.", columns: [{ label: "Monthly price", value: "KRW 800,000", note: "All-in monthly total" }, { label: "Deposit", value: "1 month rent", note: "Collected before move-in" }, { label: "Utilities", value: "Included", note: "No extra utility charges" }] }, { tier: "B tier", rooms: "Availability-dependent", note: "B-tier rooms can be shared when available, even if they are not the main rooms currently highlighted on the site.", columns: [{ label: "Monthly price", value: "KRW 600,000", note: "All-in monthly total" }, { label: "Deposit", value: "1 month rent", note: "Collected before move-in" }, { label: "Utilities", value: "Included", note: "No extra utility charges" }] }], sideTitle: "Important stay rules", sideBody: "The English page should explain the rules in plain language so guests know what kind of stay this is before they inquire.", notes: ["Every room is for one person only.", "Minimum stay is 14 days.", "Deposit is 1 month rent.", "Utilities do not add extra monthly charges.", "Room 205 is an A+ room quoted individually between A and S tiers."] },
    location: { eyebrow: "Location", title: "A practical base near Bangbae Station", desc: "Foreign guests usually want a simple answer to daily movement: subway access, commute convenience, and how easy the neighborhood feels.", points: ["About 1-2 minutes on foot to Bangbae Station", "Useful Line 2 access for Gangnam-side commutes and broader Seoul movement", "Easy transfer potential via nearby Sadang routes", "A good fit for interns, exchange students, long-stay travelers, and remote workers who want a calmer base"], sideTitle: "What the location should communicate", sideBody: "The goal is not to sell nightlife. It is to communicate reliable subway access, daily practicality, and a calmer solo-living atmosphere." },
    process: { eyebrow: "How Move-In Works", title: "A simpler long-stay setup for Seoul", desc: "This section reduces uncertainty for guests who may be unfamiliar with Korean private-room housing and want a clear next step.", steps: [{ title: "Send your dates", copy: "Share your preferred move-in date and expected stay length." }, { title: "Check matching rooms", copy: "You receive guidance on available rooms that fit your timing and budget." }, { title: "Confirm price and deposit", copy: "Monthly price, deposit, and stay rules are confirmed clearly before move-in." }, { title: "Move in with essentials ready", copy: "Your room already includes the basics needed for everyday solo living." }] },
    faq: { eyebrow: "FAQ", title: "Questions international guests usually ask", items: [{ q: "Is this a hotel or hostel?", a: "No. Homestead Seoul is positioned as private-room urban living for one person per room, with a minimum stay of 14 days." }, { q: "Do I get my own bathroom?", a: "Yes. Every room includes a private bathroom." }, { q: "What is included in the room?", a: "Each room includes a private bathroom, washing machine, refrigerator, bed, microwave, foldable table and chair, hanger, and basic bedding and supplies." }, { q: "How long is the minimum stay?", a: "The minimum stay is 14 days." }, { q: "Are utilities extra?", a: "No. The monthly price is presented as all-in for the English page, with no extra utility charges." }, { q: "Can two people stay in one room?", a: "No. All rooms are for single occupancy only." }] },
    contact: { eyebrow: "Availability Inquiry", title: "Ask about availability in a foreigner-friendly way", message: "The English conversion flow emphasizes direct inquiry, clarity, and reassurance. Email and WhatsApp are the strongest first actions.", channels: [{ type: "email", label: "Email", hint: "Best for clear written details" }, { type: "whatsapp", label: "WhatsApp", hint: "Fast international messaging" }, { type: "kakao", label: "KakaoTalk", hint: "Useful if you already use Kakao" }, { type: "phone", label: "Phone", hint: "Quick direct contact" }], form: { name: "Name", contact: "Phone or email", message: "Message", placeholder: "Please share your dates, expected stay length, and any room preferences.", consent: "I agree to data collection for inquiry response.", submit: "Send inquiry", sending: "Sending...", success: "Inquiry received. We will get back to you with availability as soon as possible.", error: "Failed to send inquiry. Please try again shortly." }, mobileCtas: [{ href: "#contact", label: "Check availability" }, { type: "whatsapp", label: "WhatsApp" }] },
    footer: { copy: "A calm, well-kept private-room option in Seoul for solo stays of two weeks or longer.", address: "911-14 Bangbae-dong, Seocho-gu, Seoul", links: [{ href: "#about", label: "About" }, { href: "#rooms", label: "Rooms" }, { href: "#contact", label: "Contact" }] },
  },
};

let currentLang =
  localStorage.getItem("preferred_lang") ||
  (typeof navigator !== "undefined" && String(navigator.language || "").toLowerCase().startsWith("ko") ? "ko" : "en");

let activeRoomFilter = "all";
let isDrawerOpen = false;
let lastFocusedElement = null;

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mergeFlatStrings(target, source) {
  if (!source || typeof source !== "object") return;
  Object.entries(source).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim()) target[key] = value.trim();
  });
}

function mergeAdminOverrides(overrides) {
  if (!overrides || typeof overrides !== "object") return;
  mergeFlatStrings(branding, overrides.branding);
  mergeFlatStrings(contactConfig, overrides.contact);

  if (overrides.media && typeof overrides.media === "object") {
    if (Array.isArray(overrides.media.heroImages)) {
      overrides.media.heroImages.forEach((src, index) => {
        if (typeof src === "string" && src.trim()) mediaConfig.heroImages[index] = src.trim();
      });
    }
    if (typeof overrides.media.heroImage === "string" && overrides.media.heroImage.trim()) {
      mediaConfig.heroImages[0] = overrides.media.heroImage.trim();
    }
    if (Array.isArray(overrides.media.gallery)) {
      overrides.media.gallery.forEach((item, index) => {
        if (!mediaConfig.gallery[index]) return;
        if (item && typeof item.src === "string" && item.src.trim()) mediaConfig.gallery[index].src = item.src.trim();
      });
    }
  }

  if (overrides.translations && typeof overrides.translations === "object") {
    ["ko", "en"].forEach((lang) => {
      const translation = overrides.translations[lang];
      if (!translation || typeof translation !== "object") return;
      if (typeof translation.heroTitle === "string" && translation.heroTitle.trim()) heroTextOverrides[lang].title = translation.heroTitle.trim();
      if (typeof translation.heroSubtitle === "string" && translation.heroSubtitle.trim()) heroTextOverrides[lang].subtitle = translation.heroSubtitle.trim();
    });
  }
}

async function loadServerAdminOverrides() {
  try {
    const response = await fetch("/api/site-config", { cache: "no-store" });
    if (!response.ok) return false;
    const result = await response.json();
    if (!result || !result.ok || !result.config || typeof result.config !== "object") return false;
    mergeAdminOverrides(result.config);
    return true;
  } catch (_) {
    return false;
  }
}

function loadLocalAdminOverrides() {
  try {
    const raw = localStorage.getItem(ADMIN_OVERRIDE_KEY);
    if (!raw) return;
    mergeAdminOverrides(JSON.parse(raw));
  } catch (_) {
    // Ignore invalid local overrides.
  }
}

function normalizeHeroImages(images) {
  const list = Array.isArray(images) ? images.map((item) => String(item || "").trim()).filter(Boolean) : [];
  if (list.length === 0) list.push("images/5.png");
  while (list.length < 3) list.push(list[list.length - 1]);
  return list.slice(0, 3);
}

function normalizePhoneToDigits(phone) {
  return String(phone || "").replace(/[^\d]/g, "");
}

function isUsableUrl(value) {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes("replace-me")) return false;
  try {
    new URL(trimmed, location.origin);
    return true;
  } catch (_) {
    return trimmed.startsWith("#");
  }
}

function getCurrentCopy() {
  return PAGE_CONTENT[currentLang] || PAGE_CONTENT.ko;
}

function getHeroData(copy) {
  return {
    ...copy.hero,
    title: heroTextOverrides[currentLang].title || copy.hero.title,
    subtitle: heroTextOverrides[currentLang].subtitle || copy.hero.subtitle,
  };
}

function icon(name) {
  return ICONS[name] || "";
}

function getRoomPrice(room) {
  return PRICE_BY_KEY[room.priceKey]?.[currentLang] || PRICE_BY_KEY.A[currentLang];
}

function resolveAction(action) {
  const fallbackHref = "#contact";
  if (!action) return { href: fallbackHref, label: "", target: "", rel: "" };
  if (action.href) {
    const href = action.href.trim();
    return { href, label: action.label || "", target: href.startsWith("http") ? "_blank" : "", rel: href.startsWith("http") ? "noopener noreferrer" : "" };
  }
  if (action.type === "naver") {
    if (isUsableUrl(contactConfig.naverUrl)) return { href: contactConfig.naverUrl.trim(), label: action.label || "", target: "_blank", rel: "noopener noreferrer" };
    return { href: fallbackHref, label: action.fallbackLabel || action.label || "", target: "", rel: "" };
  }
  if (action.type === "email") return { href: `mailto:${contactConfig.email}`, label: action.label || "", target: "", rel: "" };
  if (action.type === "phone") return { href: `tel:${normalizePhoneToDigits(contactConfig.phone)}`, label: action.label || "", target: "", rel: "" };
  if (action.type === "whatsapp") {
    const phone = normalizePhoneToDigits(contactConfig.whatsappNumber || contactConfig.phone);
    const text = currentLang === "ko" ? encodeURIComponent("안녕하세요. 홈스테드 서울 입주 가능 객실을 문의드립니다.") : encodeURIComponent("Hello, I would like to ask about room availability at Homestead Seoul.");
    return { href: `https://wa.me/${phone}?text=${text}`, label: action.label || "", target: "_blank", rel: "noopener noreferrer" };
  }
  if (action.type === "kakao" && isUsableUrl(contactConfig.kakaoUrl)) {
    return { href: contactConfig.kakaoUrl.trim(), label: action.label || "", target: "_blank", rel: "noopener noreferrer" };
  }
  return { href: fallbackHref, label: action.label || "", target: "", rel: "" };
}

function renderActionLink(action, className) {
  const resolved = resolveAction(action);
  const targetAttr = resolved.target ? ` target="${resolved.target}" rel="${resolved.rel}"` : "";
  return `<a class="${className}" href="${escapeHtml(resolved.href)}"${targetAttr}>${escapeHtml(resolved.label)}</a>`;
}

function renderSectionHead(eyebrow, title, desc) {
  return `<div class="section-head"><p class="section-eyebrow">${escapeHtml(eyebrow)}</p><h2 class="section-title">${escapeHtml(title)}</h2><p class="section-desc">${escapeHtml(desc)}</p></div>`;
}

function renderHero(copy) {
  const hero = getHeroData(copy);
  const heroImages = normalizeHeroImages(mediaConfig.heroImages);
  return `<section class="section reveal"><div class="section-shell hero-shell"><div class="hero-grid"><div class="hero-copy"><span class="hero-kicker">${escapeHtml(hero.kicker)}</span><h1 class="hero-title">${escapeHtml(hero.title)}</h1><p class="hero-subtitle">${escapeHtml(hero.subtitle)}</p><div class="hero-chip-row">${hero.chips.map((chip) => `<span class="hero-chip">${escapeHtml(chip)}</span>`).join("")}</div><div class="hero-cta">${renderActionLink(hero.primaryAction, "btn btn-primary")}${renderActionLink(hero.secondaryAction, "btn btn-secondary")}${renderActionLink(hero.tertiaryAction, "btn btn-ghost")}</div><div class="hero-aside-note">${hero.notes.map((note) => `<span>${escapeHtml(note)}</span>`).join("")}</div></div><div class="hero-visual"><div class="visual-main"><img src="${escapeHtml(heroImages[0])}" alt="${escapeHtml(hero.visualLabels[0])}"><span class="visual-caption">${escapeHtml(hero.visualLabels[0])}</span></div><div class="visual-stack"><div class="visual-card"><img src="${escapeHtml(heroImages[1])}" alt="${escapeHtml(hero.visualLabels[1])}"><span class="visual-caption">${escapeHtml(hero.visualLabels[1])}</span></div><div class="visual-card"><img src="${escapeHtml(heroImages[2])}" alt="${escapeHtml(hero.visualLabels[2])}"><span class="visual-caption">${escapeHtml(hero.visualLabels[2])}</span></div></div></div></div></div></section>`;
}

function renderSummary(copy) {
  if (!copy.summary) return "";
  return `<section class="section reveal"><div class="section-shell soft">${renderSectionHead(copy.summary.eyebrow, copy.summary.title, copy.summary.desc)}<div class="summary-strip">${copy.summary.items.map((item) => `<article class="summary-item"><span class="summary-label">${escapeHtml(item.label)}</span><strong class="summary-value">${escapeHtml(item.value)}</strong><span class="summary-note">${escapeHtml(item.note)}</span></article>`).join("")}</div></div></section>`;
}

function renderConcept(copy) {
  if (!copy.concept) return "";
  return `<section id="about" class="section reveal"><div class="section-shell">${renderSectionHead(copy.concept.eyebrow, copy.concept.title, copy.concept.desc)}<div class="concept-grid">${copy.concept.cards.map((card) => `<article class="concept-card"><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.copy)}</p></article>`).join("")}</div></div></section>`;
}

function renderCollections(copy) {
  return `<section id="rooms" class="section reveal"><div class="section-shell">${renderSectionHead(copy.collections.eyebrow, copy.collections.title, copy.collections.desc)}<div class="collection-grid">${COLLECTIONS.map((collection) => `<article class="collection-card"><div class="collection-media"><img src="${escapeHtml(collection.image)}" alt="${escapeHtml(collection.title[currentLang])}"><span class="collection-stat">${escapeHtml(collection.stat[currentLang])}</span></div><div class="collection-body"><h3>${escapeHtml(collection.title[currentLang])}</h3><p class="collection-copy">${escapeHtml(collection.copy[currentLang])}</p><ul class="collection-room-list" style="margin-top:14px"><li>${escapeHtml((currentLang === "ko" ? "해당 호실: " : "Rooms: ") + collection.rooms.join(" / "))}</li></ul></div></article>`).join("")}</div></div></section>`;
}

function renderInventory(copy) {
  return `<section class="section reveal"><div class="section-shell">${renderSectionHead(copy.inventory.eyebrow, copy.inventory.title, copy.inventory.desc)}<div class="inventory-toolbar"><p class="helper-copy">${escapeHtml(copy.inventory.helper)}</p><div class="filter-bar" role="tablist">${copy.inventory.filters.map((filter) => `<button type="button" class="filter-btn ${activeRoomFilter === filter.id ? "active" : ""}" data-room-filter="${escapeHtml(filter.id)}">${escapeHtml(filter.label)}</button>`).join("")}</div></div><div class="room-grid">${ROOMS.map((room) => { const price = getRoomPrice(room); const hidden = activeRoomFilter !== "all" && !room.filters.includes(activeRoomFilter); return `<article class="room-card ${hidden ? "is-hidden" : ""}" data-room-filters="${escapeHtml(room.filters.join(" "))}"><div class="room-card-media"><img src="${escapeHtml(room.image)}" alt="${escapeHtml(`Room ${room.id}`)}"></div><div class="room-card-body"><div class="room-card-top"><div class="room-card-title-wrap"><span class="room-card-tag">${escapeHtml(room.tag[currentLang])}</span><h3 class="room-card-title">${escapeHtml(currentLang === "ko" ? `${room.id}호` : `Room ${room.id}`)}</h3></div><span class="tier-pill">${escapeHtml(room.tier)}</span></div><p class="room-card-copy">${escapeHtml(room.focus[currentLang])}</p><div class="price-block"><p class="price-main">${escapeHtml(price.main)}</p><p class="price-sub">${escapeHtml(price.sub)}</p></div><ul class="room-feature-list">${room.features[currentLang].map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul><div class="room-card-actions">${renderActionLink({ href: "#contact", label: copy.inventory.primaryCta }, "btn btn-primary btn-compact")}${renderActionLink({ href: "#pricing", label: copy.inventory.secondaryCta }, "btn btn-secondary btn-compact")}</div></div></article>`; }).join("")}</div></div></section>`;
}

function renderGallery(copy) {
  return `<section id="gallery" class="section reveal"><div class="section-shell soft">${renderSectionHead(copy.gallery.eyebrow, copy.gallery.title, copy.gallery.desc)}<div class="gallery-grid">${mediaConfig.gallery.map((item, index) => { const caption = currentLang === "ko" ? item.captionKo : item.captionEn; return `<button type="button" class="gallery-item" data-gallery-src="${escapeHtml(item.src)}" data-gallery-alt="${escapeHtml(caption)}" data-gallery-caption="${escapeHtml(caption)}"><img src="${escapeHtml(item.src)}" alt="${escapeHtml(caption)}"><span class="gallery-label">${escapeHtml(index + 1 < 10 ? `0${index + 1}` : index + 1)}</span></button>`; }).join("")}</div></div></section>`;
}

function renderIncluded(copy) {
  return `<section id="included" class="section reveal"><div class="section-shell">${renderSectionHead(copy.included.eyebrow, copy.included.title, copy.included.desc)}<div class="included-grid">${copy.included.amenities.map((item) => `<article class="amenity-card"><span class="amenity-icon">${icon(item.icon)}</span><h3 class="amenity-title">${escapeHtml(item.title)}</h3><p class="amenity-desc">${escapeHtml(item.desc)}</p></article>`).join("")}</div><div class="promise-grid" style="margin-top:18px">${copy.included.promises.map((item) => `<article class="promise-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.desc)}</p></article>`).join("")}</div></div></section>`;
}

function renderPricing(copy) {
  const splitMode = currentLang === "ko";
  return `<section id="pricing" class="section reveal"><div class="section-shell soft">${renderSectionHead(copy.pricing.eyebrow, copy.pricing.title, copy.pricing.desc)}<div class="pricing-layout"><div class="pricing-panel"><h3>${escapeHtml(splitMode ? "월 비용 구조" : "Monthly pricing")}</h3><div class="pricing-table">${copy.pricing.rows.map((row) => `<article class="pricing-row"><div class="pricing-row-head"><strong>${escapeHtml(row.tier)}</strong><span class="price-label">${escapeHtml(row.rooms)}</span></div><div class="pricing-row-body"><div class="${splitMode ? "pricing-split-grid" : "pricing-allin-grid"}">${row.columns.map((column) => `<div class="pricing-col"><span class="pricing-col-label">${escapeHtml(column.label)}</span><span class="pricing-col-value">${escapeHtml(column.value)}</span><span class="pricing-col-note">${escapeHtml(column.note)}</span></div>`).join("")}</div><span class="helper-copy">${escapeHtml(row.note)}</span></div></article>`).join("")}</div></div><aside class="pricing-note-card"><h3>${escapeHtml(copy.pricing.sideTitle)}</h3><p>${escapeHtml(copy.pricing.sideBody)}</p><ul class="pricing-note-list">${copy.pricing.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul></aside></div></div></section>`;
}

function renderProcess(copy) {
  return `<section id="movein" class="section reveal"><div class="section-shell">${renderSectionHead(copy.process.eyebrow, copy.process.title, copy.process.desc)}<div class="process-grid">${copy.process.steps.map((step, index) => `<article class="step-card"><span class="step-index">${index + 1}</span><h3>${escapeHtml(step.title)}</h3><p class="step-copy">${escapeHtml(step.copy)}</p></article>`).join("")}</div></div></section>`;
}

function renderLocation(copy) {
  return `<section id="location" class="section reveal"><div class="section-shell">${renderSectionHead(copy.location.eyebrow, copy.location.title, copy.location.desc)}<div class="location-grid"><div class="map-card"><iframe class="map-frame" title="${escapeHtml(currentLang === "ko" ? "홈스테드 서울 위치" : "Homestead Seoul location")}" src="${escapeHtml(contactConfig.mapEmbed)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><aside class="location-card"><h3>${escapeHtml(copy.location.sideTitle)}</h3><p>${escapeHtml(copy.location.sideBody)}</p><ul class="location-list" style="margin-top:14px">${copy.location.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></aside></div></div></section>`;
}

function renderFaq(copy) {
  return `<section id="faq" class="section reveal"><div class="section-shell soft">${renderSectionHead(copy.faq.eyebrow, copy.faq.title, "")}<div class="faq-list">${copy.faq.items.map((item) => `<details class="faq-item"><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`).join("")}</div></div></section>`;
}

function renderContact(copy) {
  const channelCard = (channel) => { const action = resolveAction({ type: channel.type, label: channel.label, fallbackLabel: channel.label }); const attrs = action.target ? ` target="${action.target}" rel="${action.rel}"` : ""; return `<a class="channel-card" href="${escapeHtml(action.href)}"${attrs}><div class="channel-title"><strong>${escapeHtml(channel.label)}</strong><span class="channel-badge">${escapeHtml(channel.type)}</span></div><p class="channel-hint">${escapeHtml(channel.hint)}</p></a>`; };
  return `<section id="contact" class="section reveal"><div class="section-shell"><div class="contact-wrap"><div class="contact-intro">${renderSectionHead(copy.contact.eyebrow, copy.contact.title, copy.contact.message)}<div class="channel-grid">${copy.contact.channels.map(channelCard).join("")}</div></div><form id="inquiryForm" class="inquiry-form"><div class="field-grid"><div class="input-field"><label for="nameField">${escapeHtml(copy.contact.form.name)}</label><input id="nameField" name="name" type="text" maxlength="80" required></div><div class="input-field"><label for="contactField">${escapeHtml(copy.contact.form.contact)}</label><input id="contactField" name="contact" type="text" maxlength="120" required></div></div><div class="input-field"><label for="messageField">${escapeHtml(copy.contact.form.message)}</label><textarea id="messageField" name="message" maxlength="1200" placeholder="${escapeHtml(copy.contact.form.placeholder)}" required></textarea></div><label class="consent-row"><input type="checkbox" name="consent" required><span>${escapeHtml(copy.contact.form.consent)}</span></label><input type="hidden" name="language" value="${escapeHtml(currentLang)}"><button type="submit" class="btn btn-primary">${escapeHtml(copy.contact.form.submit)}</button><p id="formStatus" class="form-status" role="status" aria-live="polite"></p></form></div></div></section>`;
}

function renderPage() {
  const copy = getCurrentCopy();
  const sections = {
    hero: renderHero(copy),
    summary: renderSummary(copy),
    concept: renderConcept(copy),
    collections: renderCollections(copy),
    inventory: renderInventory(copy),
    gallery: renderGallery(copy),
    included: renderIncluded(copy),
    pricing: renderPricing(copy),
    process: renderProcess(copy),
    location: renderLocation(copy),
    faq: renderFaq(copy),
    contact: renderContact(copy),
  };
  document.getElementById("app").innerHTML = copy.sections.map((key) => sections[key]).join("");
  renderChrome(copy);
  bindInventoryFilters();
  bindGalleryModal();
  bindInquiryForm();
  bindReveal();
  bindDrawerLinks();
  applySeo(copy);
}

function renderChrome(copy) {
  document.documentElement.lang = currentLang;
  document.getElementById("brandTitle").textContent = currentLang === "ko" ? branding.ko : branding.en;
  document.getElementById("brandSubtitle").textContent = copy.brandSubtitle;
  document.getElementById("drawerTagline").textContent = copy.brandSubtitle;
  document.getElementById("footerBrand").textContent = currentLang === "ko" ? branding.ko : branding.en;
  document.getElementById("footerCopy").textContent = copy.footer.copy;
  document.getElementById("footerAddress").textContent = copy.footer.address;
  document.getElementById("desktopNav").innerHTML = copy.nav.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("");
  document.getElementById("mobileNav").innerHTML = copy.nav.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("");
  const hero = getHeroData(copy);
  const headerPrimary = resolveAction(hero.primaryAction);
  const headerCta = document.getElementById("headerPrimaryCta");
  headerCta.textContent = headerPrimary.label;
  headerCta.href = headerPrimary.href;
  if (headerPrimary.target) {
    headerCta.target = headerPrimary.target;
    headerCta.rel = headerPrimary.rel;
  } else {
    headerCta.removeAttribute("target");
    headerCta.removeAttribute("rel");
  }
  document.getElementById("drawerCtas").innerHTML = renderActionLink(hero.primaryAction, "btn btn-primary") + renderActionLink(hero.secondaryAction, "btn btn-secondary");
  document.getElementById("stickyMobileCta").innerHTML = `<div class="sticky-mobile-cta-inner">${copy.contact.mobileCtas.map((cta, index) => renderActionLink(cta, `btn ${index === 0 ? "btn-primary" : "btn-secondary"}`)).join("")}</div>`;
  document.getElementById("footerLinks").innerHTML = copy.footer.links.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("");
  document.querySelectorAll("[data-lang-btn]").forEach((button) => button.classList.toggle("active", button.dataset.langBtn === currentLang));
}

function applySeo(copy) {
  document.title = copy.seo.title;
  document.getElementById("metaDescription").setAttribute("content", copy.seo.description);
  document.getElementById("ogTitle").setAttribute("content", copy.seo.ogTitle);
  document.getElementById("ogDescription").setAttribute("content", copy.seo.ogDescription);
  document.querySelector('meta[property="og:locale"]').setAttribute("content", copy.seo.locale);
}

function bindInventoryFilters() { document.querySelectorAll("[data-room-filter]").forEach((button) => button.addEventListener("click", () => { activeRoomFilter = button.dataset.roomFilter || "all"; renderPage(); })); }
function openImageModal(src, alt, caption) { const modal = document.getElementById("imageModal"); document.getElementById("imageModalImg").src = src; document.getElementById("imageModalImg").alt = alt; document.getElementById("imageModalCaption").textContent = caption; modal.hidden = false; document.body.style.overflow = "hidden"; }
function closeImageModal() { const modal = document.getElementById("imageModal"); document.getElementById("imageModalImg").src = ""; document.getElementById("imageModalCaption").textContent = ""; modal.hidden = true; document.body.style.overflow = ""; }
function bindGalleryModal() { document.querySelectorAll("[data-gallery-src]").forEach((button) => button.addEventListener("click", () => openImageModal(button.dataset.gallerySrc || "", button.dataset.galleryAlt || "", button.dataset.galleryCaption || ""))); }
function setStatus(message, type = "") { const node = document.getElementById("formStatus"); if (node) { node.textContent = message; node.className = type ? `form-status ${type}` : "form-status"; } }
function buildMailtoFallback(payload) { const subject = payload.language === "ko" ? "[홈스테드 서울] 웹사이트 문의" : "[Homestead Seoul] Website inquiry"; const body = payload.language === "ko" ? `이름: ${payload.name}\n연락처: ${payload.contact}\n\n문의 내용:\n${payload.message}` : `Name: ${payload.name}\nContact: ${payload.contact}\n\nMessage:\n${payload.message}`; return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }
function triggerInquiryFallback(payload) { const message = payload.language === "ko" ? "이 환경에서는 메일 앱으로 문의를 이어갑니다." : "This preview opens your email app to continue the inquiry."; window.location.href = buildMailtoFallback(payload); setStatus(message, "success"); }
async function handleInquirySubmit(event) { event.preventDefault(); const copy = getCurrentCopy(); const form = event.currentTarget; const data = new FormData(form); const payload = { name: String(data.get("name") || "").trim(), contact: String(data.get("contact") || "").trim(), message: String(data.get("message") || "").trim(), language: String(data.get("language") || currentLang), turnstileToken: String(data.get("turnstileToken") || "").trim() }; if (location.hostname.endsWith("github.io")) { triggerInquiryFallback(payload); return; } setStatus(copy.contact.form.sending); try { const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const contentType = response.headers.get("content-type") || ""; const result = contentType.includes("application/json") ? await response.json() : null; if (response.ok && result && result.ok) { form.reset(); setStatus(copy.contact.form.success, "success"); return; } if (response.status === 404 || response.status >= 500) { triggerInquiryFallback(payload); return; } setStatus((result && result.message) || copy.contact.form.error, "error"); } catch (_) { triggerInquiryFallback(payload); } }
function bindInquiryForm() { document.getElementById("inquiryForm")?.addEventListener("submit", handleInquirySubmit); }
function bindReveal() { const elements = document.querySelectorAll(".reveal"); const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("show"); observer.unobserve(entry.target); } }); }, { threshold: 0.14 }); elements.forEach((element) => observer.observe(element)); }
function openDrawer() { const drawer = document.getElementById("mobileDrawer"); const backdrop = document.getElementById("drawerBackdrop"); const menuBtn = document.getElementById("menuBtn"); lastFocusedElement = document.activeElement; drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); backdrop.hidden = false; menuBtn.setAttribute("aria-expanded", "true"); isDrawerOpen = true; }
function closeDrawer() { const drawer = document.getElementById("mobileDrawer"); const backdrop = document.getElementById("drawerBackdrop"); const menuBtn = document.getElementById("menuBtn"); drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); backdrop.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); isDrawerOpen = false; if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus(); }
function bindDrawerLinks() { document.querySelectorAll("#mobileDrawer a").forEach((link) => link.addEventListener("click", closeDrawer)); }
function bindStaticChrome() { document.querySelectorAll("[data-lang-btn]").forEach((button) => button.addEventListener("click", () => { if (button.dataset.langBtn === currentLang) return; currentLang = button.dataset.langBtn; activeRoomFilter = "all"; localStorage.setItem("preferred_lang", currentLang); closeDrawer(); renderPage(); window.scrollTo({ top: 0, behavior: "smooth" }); })); document.getElementById("menuBtn").addEventListener("click", () => (isDrawerOpen ? closeDrawer() : openDrawer())); document.getElementById("drawerCloseBtn").addEventListener("click", closeDrawer); document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer); document.getElementById("imageModalClose").addEventListener("click", closeImageModal); document.getElementById("imageModal").addEventListener("click", (event) => { if (event.target === document.getElementById("imageModal")) closeImageModal(); }); document.addEventListener("keydown", (event) => { if (event.key !== "Escape") return; if (!document.getElementById("imageModal").hidden) { closeImageModal(); return; } if (isDrawerOpen) closeDrawer(); }); }
function bindYear() { document.getElementById("year").textContent = String(new Date().getFullYear()); }

window.HOMESTEAD_ADMIN_META = { key: ADMIN_OVERRIDE_KEY, allowedEmail: "homesteadseoul@gmail.com" };

async function init() {
  const serverLoaded = await loadServerAdminOverrides();
  if (!serverLoaded) loadLocalAdminOverrides();
  bindStaticChrome();
  bindYear();
  renderPage();
}

init();
