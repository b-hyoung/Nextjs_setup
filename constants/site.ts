/**
 * 훈아티스 사이트 콘텐츠 데이터
 * 출처: docs/REQUIREMENTS.md (훈아티스_회사소개서_ver2.pptx 추출본)
 * 이 파일 밖에서 문구·수치를 새로 만들지 않는다.
 */

export const SITE = {
  name: "훈아티스",
  nameEn: "Hoon Artis",
  slogan: "Let's benefit the world with what we create",
  tagline: "AI·XR·디지털트윈 실시간 콘텐츠 스튜디오",
  description:
    "훈아티스는 Unreal Engine 5 기반으로 AI, XR, 디지털트윈, 미디어아트를 다루는 실시간 콘텐츠 제작 스튜디오입니다. 기존의 어떤 콘텐츠 형태든 몰입형 기술 파이프라인으로 재구성합니다.",
  /** 히어로 표시용 — 문장 단위 줄바꿈 고정 */
  descriptionLines: [
    "훈아티스는 Unreal Engine 5 기반으로 AI, XR, 디지털트윈, 미디어아트를 다루는 실시간 콘텐츠 제작 스튜디오입니다.",
    "기존의 어떤 콘텐츠 형태든 몰입형 기술 파이프라인으로 재구성합니다.",
  ],
  vision:
    "물리 세계와 디지털 세계를 잇는 몰입형 기술을 개척해 교육·문화·미래도시를 위한 경험을 만듭니다.",
} as const;

export const NAV_ITEMS = [
  { label: "사업분야", href: "#business" },
  { label: "적용분야", href: "#fields" },
  // 연혁은 프로젝트명 확정 후 노출 (HISTORY 데이터 채워지면 복원)
  { label: "파트너", href: "#partners" },
  { label: "문의하기", href: "#contact" },
] as const;

/** 히어로 데모 영상 — 소개서 표지의 "Watch Demo Video" 링크 (slide3) */
export const HERO_VIDEO = {
  youtubeId: "auAKxX2oUNU",
  poster: "/images/hero-poster.webp",
  posterAlt: "훈아티스 실시간 렌더링 데모 — 한옥과 설경",
} as const;

/**
 * 이미지 라이브러리 — PPTX에서 추출한 모든 콘텐츠 이미지.
 * /customize 페이지에서 히어로 슬라이드로 골라 넣을 수 있는 전체 목록.
 */
export const IMAGE_LIBRARY = [
  // 행사·체험 현장
  { src: "/images/moments/hoonartis-booth.webp", label: "훈아티스 전시 부스" },
  { src: "/images/moments/booth-demo.webp", label: "부스 콘텐츠 시연" },
  { src: "/images/moments/expo-booth.webp", label: "넛다구리 체험 부스" },
  { src: "/images/moments/dome-audience.webp", label: "몰입형 상영관 관람" },
  { src: "/images/gal-training-3.webp", label: "전시 부스 플레이" },
  { src: "/images/moments/media-install.webp", label: "원형 미디어아트 설치" },
  { src: "/images/biz-training.webp", label: "메타키즈 교육 현장" },
  { src: "/images/gal-training-2.webp", label: "강의실 실습" },
  // 프로젝트 렌더·화면
  { src: "/images/hero-poster.webp", label: "한옥 실시간 렌더" },
  { src: "/images/biz-twin.webp", label: "디지털트윈 자연 환경" },
  { src: "/images/gal-twin-2.webp", label: "사찰 실사 부지" },
  { src: "/images/gal-twin-3.webp", label: "숲 환경 렌더" },
  { src: "/images/biz-mediaart.webp", label: "인터랙티브 월" },
  { src: "/images/gal-mediaart-2.webp", label: "라이트 인터랙티브 룸" },
  { src: "/images/gal-mediaart-3.webp", label: "프로젝션 시연" },
  { src: "/images/biz-xredu.webp", label: "XR 체험 부스 렌더" },
  { src: "/images/gal-xredu-2.webp", label: "활쏘기 XR 게임" },
  { src: "/images/gal-xredu-3.webp", label: "역사 문서 XR 체험" },
  { src: "/images/biz-therapy.webp", label: "힐링 환경 렌더" },
  { src: "/images/gal-therapy-2.webp", label: "몰입형 명상" },
  { src: "/images/gal-therapy-4.webp", label: "밤 단풍 정원" },
  { src: "/images/gal-therapy-3.webp", label: "한옥 호수 힐링" },
  { src: "/images/gal-device-4.webp", label: "그린스크린 스튜디오" },
  { src: "/images/biz-device.webp", label: "센서·트래킹 장비" },
  { src: "/images/gal-device-2.webp", label: "로봇팔 캐릭터 인터랙션" },
  { src: "/images/gal-device-3.webp", label: "VR 인터랙션 게임" },
  // 행사·협약 기록
  { src: "/images/moments/award.webp", label: "공모전 수상" },
  { src: "/images/moments/xr-alliance.webp", label: "XR·메타버스 얼라이언스" },
  { src: "/images/moments/iksan-mou.webp", label: "익산 협약" },
  { src: "/images/moments/jeonju-ict.webp", label: "전주 ICT 기업인" },
  { src: "/images/moments/vietnam-forum.webp", label: "베트남 포럼 MOU" },
  { src: "/images/moments/partnership.webp", label: "파트너십 협약" },
] as const;

/** 히어로 배경 슬라이드 기본값 — /customize에서 확정한 구성 (2026-08-05) */
export const HERO_SLIDES = [
  {
    src: "/images/gal-device-2.webp",
    alt: "로봇 팔과 캐릭터 인터랙션 데모",
    caption: "로봇팔 캐릭터 인터랙션",
  },
  {
    src: "/images/biz-training.webp",
    alt: "메타키즈 교육 프로그램 현장",
    caption: "메타키즈 교육 현장",
  },
  {
    src: "/images/biz-mediaart.webp",
    alt: "인터랙티브 월 프로젝션 설치 공간",
    caption: "인터랙티브 월",
  },
  {
    src: "/images/gal-mediaart-2.webp",
    alt: "라이트 인터랙티브 룸",
    caption: "라이트 인터랙티브 룸",
  },
  {
    src: "/images/gal-training-3.webp",
    alt: "전시 부스에서 게임을 플레이하는 참가자",
    caption: "전시 부스 플레이",
  },
  {
    src: "/images/moments/expo-booth.webp",
    alt: "관람객이 넛다구리를 체험하는 부스",
    caption: "넛다구리 체험 부스",
  },
  {
    src: "/images/biz-xredu.webp",
    alt: "XR 체험 부스 렌더",
    caption: "XR 체험 부스 렌더",
  },
  {
    src: "/images/biz-twin.webp",
    alt: "언리얼 엔진으로 재구성한 자연 환경",
    caption: "디지털트윈 자연 환경",
  },
  {
    src: "/images/gal-therapy-2.webp",
    alt: "몰입형 명상 체험",
    caption: "몰입형 명상",
  },
  {
    src: "/images/moments/dome-audience.webp",
    alt: "몰입형 상영관을 관람하는 관객",
    caption: "몰입형 상영관 관람",
  },
] as const;

/** 메인 캐릭터 스티커 — 소개서 렌더(요정 캐릭터) 크롭 */
export const CHARACTER_STICKER = {
  src: "/images/character-sticker.webp",
  alt: "훈아티스 메인 캐릭터 — 요정 날개 소녀",
} as const;

/**
 * 사업분야 6개 — §3.2 핵심 역량 + 추가 제작 영역
 * images: PPTX에서 추출한 실제 프로젝트 이미지 여러 장 / video: 소개서에 링크된 자사 유튜브 데모
 */
export const BUSINESS_AREAS = [
  {
    title: "실시간 디바이스 제어·피지컬 AI",
    tags: "행동 인식 / 센서·IoT 연동",
    description:
      "AI 모델과 센서, IoT 디바이스를 실시간으로 연동해 행동 인식, 소음 분석, 반응형 인터랙션을 구현합니다. Azure Kinect·Orbbec·LiDAR 기반 실감형 인터랙션과 5G MEC·IoT 연동 AI 시뮬레이션을 다룹니다.",
    images: [
      { src: "/images/gal-device-2.webp", alt: "로봇 팔과 캐릭터 인터랙션 데모" },
      { src: "/images/gal-device-4.webp", alt: "그린스크린 스튜디오" },
      { src: "/images/gal-device-3.webp", alt: "VR 인터랙션 게임 화면" },
    ],
    video: null,
  },
  {
    title: "디지털트윈 & AI 시뮬레이션",
    tags: "공간 데이터 / 환경 시뮬레이션",
    description:
      "GIS·LiDAR·BIM 공간 데이터로 실제 부지를 정밀 재구성하고, 도시 환경의 소음·바람·인구 흐름을 AI로 모델링합니다. 실시간 IoT 센서 데이터를 연동해 환경 교육·스마트시티 콘텐츠에 최적화합니다.",
    images: [
      { src: "/images/biz-twin.webp", alt: "언리얼 엔진으로 재구성한 자연 환경" },
      { src: "/images/gal-twin-2.webp", alt: "실제 부지 — 사찰 원본 사진" },
      { src: "/images/gal-twin-3.webp", alt: "숲 환경 실시간 렌더" },
    ],
    video: null,
  },
  {
    title: "몰입형 미디어아트 & 인터랙티브 전시",
    tags: "프로젝션 맵핑 / 설치미술",
    description:
      "4면·5면 프로젝션 맵핑과 대형 인터랙티브 월, 센서 기반 설치미술 콘텐츠를 제작합니다. 다수의 현장 운영 경험으로 기획부터 운영까지 지원합니다.",
    images: [
      { src: "/images/biz-mediaart.webp", alt: "인터랙티브 월 프로젝션 설치 공간" },
      { src: "/images/gal-mediaart-2.webp", alt: "라이트 인터랙티브 룸" },
      { src: "/images/gal-mediaart-3.webp", alt: "프로젝션 시연 현장" },
    ],
    video: "https://youtu.be/MCDH-Qy-Yzw",
  },
  {
    title: "XR·VR 교육 콘텐츠",
    tags: "Meta Quest / PCVR",
    description:
      "복잡한 개념을 체험형 디지털 환경으로 전환하는 몰입형 XR 학습 콘텐츠를 만듭니다. Meta Quest 3, PCVR 등 다양한 디바이스 대응 제작·배포 경험을 갖추고 있습니다.",
    images: [
      { src: "/images/biz-xredu.webp", alt: "XR 체험 부스 운영 현장" },
      { src: "/images/gal-xredu-2.webp", alt: "활쏘기 XR 학습 게임" },
      { src: "/images/gal-xredu-3.webp", alt: "역사 문서 XR 체험" },
    ],
    video: "https://youtu.be/fUOEKwBV6-U",
  },
  {
    title: "디지털 테라피",
    tags: "힐링 환경 / 명상·치유",
    description:
      "자연·명상·치유 요소를 실시간 렌더링 기술로 결합한 몰입형 힐링 환경을 통해 정서 균형, 스트레스 완화, 깊은 심리적 이완을 전달합니다.",
    images: [
      { src: "/images/gal-therapy-4.webp", alt: "밤 단풍 정원 힐링 환경" },
      { src: "/images/biz-therapy.webp", alt: "실시간 렌더링 힐링 환경 — 숲과 호수" },
      { src: "/images/gal-therapy-2.webp", alt: "몰입형 명상 체험" },
    ],
    video: "https://youtu.be/vdkhWgUaMLo",
  },
  {
    title: "실감형 교육 프로그램",
    tags: "XR 커리큘럼 / 실무 워크숍",
    description:
      "대학·기관 대상 XR 교육 커리큘럼을 운영하고 실감형 콘텐츠 제작 워크숍을 진행합니다. 정부기관·대학·기업에 AI·언리얼엔진·프로그래밍 실무 교육을 제공합니다.",
    images: [
      { src: "/images/biz-training.webp", alt: "메타키즈 교육 프로그램 강의 현장" },
      { src: "/images/gal-training-2.webp", alt: "강의실 실습 현장" },
      { src: "/images/gal-training-3.webp", alt: "전시 부스 시연" },
    ],
    video: null,
  },
] as const;

/** 적용분야 4단 — §3.3 */
export const FIELDS = [
  {
    title: "교육",
    titleEn: "Education",
    description:
      "복잡한 개념을 체험형 디지털 환경으로 전환하는 몰입형 XR 학습을 제공합니다.",
  },
  {
    title: "문화",
    titleEn: "Culture",
    description:
      "디지털 미디어와 실시간 기술로 관객 중심의 인터랙티브 스토리텔링을 구현합니다.",
  },
  {
    title: "역사",
    titleEn: "History",
    description:
      "공간 재구성과 몰입형 시각화로 역사 서사를 생생하게 재해석합니다.",
  },
  {
    title: "축제",
    titleEn: "Festival",
    description:
      "AI-XR 인터랙션으로 방문객 참여를 높이는 실시간 몰입형 콘텐츠를 더합니다.",
  },
] as const;

/**
 * 연혁 타임라인 — §3.6
 * 프로젝트명·고객사는 소개서에서 이미지로만 존재 → 확인되는 대로 채운다 (지어내지 않는다).
 */
export const HISTORY: { date: string; items: string[] }[] = [
  { date: "2025", items: [] },
  { date: "2024", items: [] },
  { date: "2023", items: [] },
  { date: "2017", items: [] },
];

/** 파트너 로고 — 소개서 Key Clients & Partners 슬라이드(17·20·25)에서 추출 */
export const PARTNER_LOGOS = [
  { src: "/images/partners/jeonju-city.webp", name: "전주시" },
  { src: "/images/partners/iksan.webp", name: "익산시" },
  { src: "/images/partners/jeonju-univ.webp", name: "전주대학교" },
  { src: "/images/partners/vision-college.webp", name: "전주비전대학교" },
  { src: "/images/partners/sori-arts.webp", name: "한국소리문화의전당" },
  { src: "/images/partners/mbc.webp", name: "MBC" },
  { src: "/images/partners/jtv.webp", name: "JTV" },
  { src: "/images/partners/epic-games.webp", name: "Epic Games" },
  { src: "/images/partners/gitex.webp", name: "GITEX GLOBAL" },
  { src: "/images/partners/gstar.webp", name: "G-STAR" },
  { src: "/images/partners/megaus-expo.webp", name: "메가어스 엑스포" },
] as const;

/** 연락처 — §3.7 */
export const CONTACT = {
  address: "전북 전주시 덕진구 백제대로 816, 605호",
  addressEn: "605, 816 Baekje-daero, Deokjin-gu, Jeonju-si, Jeonbuk-do, Korea",
  tel: "0507-1402-5660",
  fax: "0504-013-5658",
  mobile: "+82-10-8181-5658",
  email: "hoonartis@gmail.com",
  website: "www.hoonartis.com",
} as const;
