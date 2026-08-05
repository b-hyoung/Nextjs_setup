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
  vision:
    "물리 세계와 디지털 세계를 잇는 몰입형 기술을 개척해 교육·문화·미래도시를 위한 경험을 만듭니다.",
} as const;

export const NAV_ITEMS = [
  { label: "사업분야", href: "#business" },
  { label: "적용분야", href: "#fields" },
  { label: "기술", href: "#tech" },
  { label: "연혁", href: "#history" },
  { label: "파트너", href: "#partners" },
  { label: "팀", href: "#team" },
  { label: "문의하기", href: "#contact" },
] as const;

/** 히어로 데모 영상 — 소개서 표지의 "Watch Demo Video" 링크 (slide3) */
export const HERO_VIDEO = {
  youtubeId: "auAKxX2oUNU",
  poster: "/images/hero-poster.webp",
  posterAlt: "훈아티스 실시간 렌더링 데모 — 한옥과 설경",
} as const;

/**
 * 사업분야 6개 — §3.2 핵심 역량 + 추가 제작 영역
 * image: PPTX에서 추출한 실제 프로젝트 이미지 / video: 소개서에 링크된 자사 유튜브 데모
 */
export const BUSINESS_AREAS = [
  {
    title: "실시간 디바이스 제어·피지컬 AI",
    tags: "행동 인식 / 센서·IoT 연동",
    description:
      "AI 모델과 센서, IoT 디바이스를 실시간으로 연동해 행동 인식, 소음 분석, 반응형 인터랙션을 구현합니다. Azure Kinect·Orbbec·LiDAR 기반 실감형 인터랙션과 5G MEC·IoT 연동 AI 시뮬레이션을 다룹니다.",
    image: "/images/biz-device.webp",
    imageAlt: "센서·트래킹 장비 구성 현장",
    video: null,
  },
  {
    title: "디지털트윈 & AI 시뮬레이션",
    tags: "공간 데이터 / 환경 시뮬레이션",
    description:
      "GIS·LiDAR·BIM 공간 데이터로 실제 부지를 정밀 재구성하고, 도시 환경의 소음·바람·인구 흐름을 AI로 모델링합니다. 실시간 IoT 센서 데이터를 연동해 환경 교육·스마트시티 콘텐츠에 최적화합니다.",
    image: "/images/biz-twin.webp",
    imageAlt: "언리얼 엔진으로 재구성한 자연 환경 디지털트윈",
    video: null,
  },
  {
    title: "몰입형 미디어아트 & 인터랙티브 전시",
    tags: "프로젝션 맵핑 / 설치미술",
    description:
      "4면·5면 프로젝션 맵핑과 대형 인터랙티브 월, 센서 기반 설치미술 콘텐츠를 제작합니다. 다수의 현장 운영 경험으로 기획부터 운영까지 지원합니다.",
    image: "/images/biz-mediaart.webp",
    imageAlt: "인터랙티브 월 프로젝션 설치 공간",
    video: "https://youtu.be/MCDH-Qy-Yzw",
  },
  {
    title: "XR·VR 교육 콘텐츠",
    tags: "Meta Quest / PCVR",
    description:
      "복잡한 개념을 체험형 디지털 환경으로 전환하는 몰입형 XR 학습 콘텐츠를 만듭니다. Meta Quest 3, PCVR 등 다양한 디바이스 대응 제작·배포 경험을 갖추고 있습니다.",
    image: "/images/biz-xredu.webp",
    imageAlt: "XR 체험 부스 운영 현장",
    video: "https://youtu.be/fUOEKwBV6-U",
  },
  {
    title: "디지털 테라피",
    tags: "힐링 환경 / 명상·치유",
    description:
      "자연·명상·치유 요소를 실시간 렌더링 기술로 결합한 몰입형 힐링 환경을 통해 정서 균형, 스트레스 완화, 깊은 심리적 이완을 전달합니다.",
    image: "/images/biz-therapy.webp",
    imageAlt: "실시간 렌더링 힐링 환경 — 숲과 호수",
    video: "https://youtu.be/vdkhWgUaMLo",
  },
  {
    title: "실감형 교육 프로그램",
    tags: "XR 커리큘럼 / 실무 워크숍",
    description:
      "대학·기관 대상 XR 교육 커리큘럼을 운영하고 실감형 콘텐츠 제작 워크숍을 진행합니다. 정부기관·대학·기업에 AI·언리얼엔진·프로그래밍 실무 교육을 제공합니다.",
    image: "/images/biz-training.webp",
    imageAlt: "메타키즈 교육 프로그램 강의 현장",
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

/** 기술 스택 — §4 ⑤ */
export const TECH_STACK = [
  { name: "Unreal Engine 5.4 / 5.6", category: "실시간 엔진" },
  { name: "Blender", category: "3D 제작" },
  { name: "Meta Quest 3", category: "XR 디바이스" },
  { name: "PCVR", category: "XR 디바이스" },
  { name: "Azure Kinect", category: "센서" },
  { name: "Orbbec", category: "센서" },
  { name: "LiDAR", category: "공간 스캔" },
  { name: "GIS · BIM", category: "공간 데이터" },
  { name: "5G MEC · IoT", category: "인프라 연동" },
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

/** 파트너 카테고리 — §3.5 (개별 로고 자료 확보 전) */
export const PARTNER_CATEGORIES = [
  {
    title: "지자체·공공기관",
    description: "전국 지자체·공공기관 프로젝트 다수 수행",
  },
  {
    title: "대학·연구기관",
    description: "대학 강의·산학협력 및 XR 교육 커리큘럼 운영",
  },
  {
    title: "글로벌 행사",
    description: "GITEX 등 글로벌 테크 페어 참가 실적",
  },
  {
    title: "B2B 파트너",
    description: "기업 대상 실감형 콘텐츠·교육 협력",
  },
] as const;

/** 팀 — §3.4 (소개서 기재 내용만) */
export const TEAM = [
  {
    name: "이훈주",
    role: "CEO · 사업총괄",
    career: "콘텐츠 제작·메타버스 기획 총괄 7년",
    highlights: [
      "AI 콘텐츠 제작 + 현장 교육, 두 가지 실무 기반 융합",
      "기능성 게임 제작, XR 기반 이러닝 콘텐츠 개발",
      "XR 메타버스 제작 지원",
    ],
  },
  {
    name: "이권주",
    role: "CTO",
    career: "XR 콘텐츠 제작 실무 경력 14년",
    highlights: [
      "언리얼 엔진 실습·메타휴먼 교육",
      "유니티 기초 C# 프로그래밍 교육 특강",
      "'아트숲 속 XR 세계소리여행' 레벨 디자인",
    ],
  },
  {
    name: "김상혁",
    role: "COO",
    career: "분자생물학 전공 · 생성형 AI 미디어 프로젝트 5건 이상",
    highlights: [
      "AI 콘텐츠 생성·인터랙티브 실습 지도",
      "XR 콘텐츠 체험 교육 보조강사",
      "'보노루의 모험' 게임 제작",
    ],
  },
] as const;

export const TEAM_NOTE =
  "전기공학·분자생물학·디자인 배경이 융합된 현장형 원팀. 교육·기술·감성까지 연결하는 융합형 전문가들로 구성되어 있습니다.";

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
