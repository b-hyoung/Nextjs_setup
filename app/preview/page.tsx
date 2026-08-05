import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "시그니처 표현 비교 | 훈아티스",
  robots: { index: false },
};

const BG = "/images/moments/expo-booth.webp";

/** 비교용 히어로 프레임 — 실제 히어로와 동일한 배경·오버레이·스크림 */
const Frame = ({
  label,
  reference,
  children,
}: {
  label: string;
  reference: string;
  children: React.ReactNode;
}) => (
  <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-hero text-white">
    <Image src={BG} alt="" fill sizes="100vw" className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-hero/55 via-hero/25 to-hero/65" />
    {/* 안 라벨 */}
    <div className="absolute left-5 top-5 z-10 rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-hero">
      {label}
      <span className="ml-2 font-medium opacity-70">{reference}</span>
    </div>
    <div className="hero-scrim hero-text-guard relative mx-auto w-full max-w-[1440px] px-5 py-28 text-center">
      {children}
    </div>
  </section>
);

export default function PreviewPage() {
  return (
    <main>
      {/* A안 — 버넥트식: 시그니처를 브랜드컬러 트래킹 캡스 도장으로 */}
      <Frame label="A안" reference="버넥트식 · 시그니처 = 도장">
        <h1 className="mx-auto text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE.tagline}
          <br />
          <span className="text-brand">{SITE.name}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white/80 lg:text-lg">
          {SITE.descriptionLines[0]}
          <br />
          {SITE.descriptionLines[1]}
        </p>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.35em] text-brand">
          {SITE.slogan}
        </p>
      </Frame>

      {/* B안 — 시공테크식: 영문 시그니처가 메인 디스플레이 */}
      <Frame label="B안" reference="시공테크식 · 시그니처 = 주인공">
        <p className="text-base font-semibold text-white/85 sm:text-lg">
          {SITE.tagline} <span className="text-brand">{SITE.name}</span>
        </p>
        <h1 className="mx-auto mt-6 max-w-5xl text-balance font-heading text-4xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          Let&apos;s benefit
          <br />
          the world with
          <br />
          what we create
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-white/70 lg:text-base">
          {SITE.descriptionLines[0]}
        </p>
      </Frame>

      {/* C안 — 자이언트스텝식: 회사명 초대형 워드마크 타이포 */}
      <Frame label="C안" reference="자이언트스텝식 · 회사명 = 타이포 요소">
        <h1 className="mx-auto text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE.tagline}
        </h1>
        <p className="mt-6 text-sm font-medium italic text-white/75 sm:text-base">
          &ldquo;{SITE.slogan}&rdquo;
        </p>
        <p className="pointer-events-none mt-14 select-none font-heading text-[10vw] font-extrabold uppercase leading-none tracking-tight text-white/90">
          HOONARTIS
        </p>
      </Frame>
    </main>
  );
}
