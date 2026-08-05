"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import {
  CHARACTER_STICKER,
  HERO_SLIDES,
  HERO_VIDEO,
  SITE,
} from "@/constants/site";
import { cn } from "@/lib/utils";

const SLIDE_MS = 2200;

/** 히어로 — 체험·플레이 현장 사진이 빠른 컷으로 나열되는 풀스크린 구성 */
const Hero = ({ showSticker = true }: { showSticker?: boolean }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_MS,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-hero text-white"
    >
      {/* 배경 슬라이드 — PPTX에서 추출한 실제 작업물 */}
      {HERO_SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-300",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      {/* 가독성 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-hero/55 via-hero/25 to-hero/65" />

      <div className="hero-enter relative mx-auto w-full max-w-[1440px] px-5 pt-16 text-center">
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

      {/* 메인 캐릭터 스티커 — 투명 배경 다이컷 */}
      <div
        className={cn(
          "absolute bottom-14 right-6 hidden rotate-6 lg:right-20",
          showSticker && "md:block",
        )}
      >
        <Image
          src={CHARACTER_STICKER.src}
          alt={CHARACTER_STICKER.alt}
          width={287}
          height={520}
          className="h-48 w-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] lg:h-60"
        />
      </div>

      {/* 현재 슬라이드 캡션 + 인디케이터 */}
      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
        <p className="text-xs font-medium text-white/70">
          {HERO_SLIDES[index].caption}
        </p>
        <div className="flex gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`${i + 1}번 슬라이드 보기`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1 rounded-full transition-all",
                i === index ? "w-8 bg-brand" : "w-4 bg-white/30",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
