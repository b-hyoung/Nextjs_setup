import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { HERO_VIDEO, SITE } from "@/constants/site";

/** 히어로 — 자사 실시간 렌더 이미지가 화면을 가득 채우는 풀스크린 구성 */
const Hero = () => {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-hero text-white"
    >
      {/* 배경: PPTX에서 추출한 자사 언리얼 렌더 */}
      <Image
        src={HERO_VIDEO.poster}
        alt={HERO_VIDEO.posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* 가독성 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-hero/70 via-hero/45 to-hero/85" />

      <div className="hero-enter relative mx-auto w-full max-w-6xl px-5 pt-16 text-center">
        <h1 className="mx-auto text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE.tagline}
          <br />
          <span className="text-brand">{SITE.name}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          {SITE.description}
        </p>
        <p className="mt-8 text-sm font-semibold italic text-white/60">
          “{SITE.slogan}”
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-hero transition-colors hover:bg-brand-strong hover:text-white"
          >
            문의하기
            <ArrowRight size={16} />
          </Link>
          <a
            href={`https://youtu.be/${HERO_VIDEO.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70"
          >
            <Play size={14} fill="currentColor" />
            데모 영상 보기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
