"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SITE } from "@/constants/site";
import { useHeroSlides } from "@/lib/hero-slides-store";
import { cn } from "@/lib/utils";

const SLIDE_MS = 2200;

/**
 * 히어로 — 체험·플레이 현장 사진이 빠른 컷으로 나열되는 구성.
 * 데스크톱: 풀블리드 배경 / 모바일: 텍스트 아래 프레임 슬라이드쇼 (가로 사진이 잘리지 않게)
 */
const Hero = () => {
  const slides = useHeroSlides();
  const [index, setIndex] = useState(0);
  // 전부 뺀 상태(0장)면 어두운 배경만 유지
  const safeIndex = slides.length > 0 ? index % slides.length : 0;

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_MS,
    );
    return () => clearInterval(t);
  }, [slides.length]);

  const indicator = (className?: string) => (
    <div className={cn("flex justify-center gap-2", className)}>
      {slides.map((slide, i) => (
        <button
          key={slide.src}
          type="button"
          aria-label={`${i + 1}번 슬라이드 보기`}
          onClick={() => setIndex(i)}
          className={cn(
            "h-1 rounded-full transition-all",
            i === safeIndex ? "w-8 bg-brand" : "w-4 bg-white/30",
          )}
        />
      ))}
    </div>
  );

  return (
    <section
      id="top"
      className="relative flex flex-col justify-center overflow-hidden bg-hero text-white md:min-h-svh"
    >
      {/* 데스크톱: 풀블리드 배경 슬라이드 */}
      <div className="absolute inset-0 hidden md:block">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-300",
              i === safeIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {/* 가독성 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-hero/55 via-hero/25 to-hero/65" />
      </div>

      <div className="hero-enter hero-scrim hero-text-guard relative mx-auto w-full max-w-[1440px] px-5 pb-16 pt-24 text-center md:py-28">
        <h1 className="mx-auto text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE.tagline}
          <br />
          <span className="text-brand">{SITE.name}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-4xl text-sm leading-relaxed text-white/80 sm:text-base md:mt-6 lg:max-w-5xl lg:text-lg">
          {SITE.descriptionLines[0]}
          <br className="hidden sm:block" />
          <span className="sm:contents"> {SITE.descriptionLines[1]}</span>
        </p>

        {/* 모바일: 프레임 슬라이드쇼 — 가로 사진을 자르지 않고 보여준다 */}
        {slides.length > 0 && (
          <div className="mt-10 md:hidden">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
              {slides.map((slide, i) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={cn(
                    "object-cover transition-opacity duration-300",
                    i === safeIndex ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
            <p className="mt-3 text-xs font-medium text-white/70">
              {slides[safeIndex].caption}
            </p>
            {indicator("mt-2.5")}
          </div>
        )}
      </div>


      {/* 스크롤 마우스 인디케이터 (데스크톱) */}
      <a
        href="#business"
        aria-label="아래로 스크롤"
        className={cn(
          "absolute left-1/2 hidden -translate-x-1/2 md:block",
          slides.length > 0 ? "bottom-24" : "bottom-14",
        )}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-brand pt-1.5">
          <span className="scroll-wheel size-1.5 rounded-full bg-brand" />
        </span>
      </a>

      {/* 데스크톱: 캡션 + 인디케이터 */}
      {slides.length > 0 && (
        <div className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-3 md:flex">
          <p className="hero-text-guard text-xs font-medium text-white/70">
            {slides[safeIndex].caption}
          </p>
          {indicator()}
        </div>
      )}
    </section>
  );
};

export default Hero;
