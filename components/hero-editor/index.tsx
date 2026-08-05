"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eraser,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { IMAGE_LIBRARY } from "@/constants/site";
import {
  resetHeroSlides,
  useCustomSlideSrcs,
  useHeroSlides,
  writeHeroSlides,
} from "@/lib/hero-slides-store";
import { cn } from "@/lib/utils";

/**
 * 히어로 슬라이드 편집기 — 라이브러리 전체에서 원하는 이미지를 골라
 * 순서를 정하면 홈 히어로에 그대로 반영된다 (localStorage 저장).
 */
const HeroEditor = () => {
  const custom = useCustomSlideSrcs();
  const current = useHeroSlides();
  // 편집 기준 목록: 커스텀이 있으면 그것, 없으면 현재 기본값 순서
  const selected = custom ?? current.map((s) => s.src);

  const isSelected = (src: string) => selected.includes(src);

  const add = (src: string) => {
    if (!isSelected(src)) writeHeroSlides([...selected, src]);
  };
  const remove = (src: string) =>
    writeHeroSlides(selected.filter((s) => s !== src));
  const move = (src: string, dir: -1 | 1) => {
    const i = selected.indexOf(src);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= selected.length) return;
    const next = [...selected];
    [next[i], next[j]] = [next[j], next[i]];
    writeHeroSlides(next);
  };

  const labelOf = (src: string) =>
    IMAGE_LIBRARY.find((img) => img.src === src)?.label ?? src;

  return (
    <div className="min-h-svh bg-neutral-50 pb-24">
      {/* 상단 바 */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900"
          >
            <ArrowLeft size={16} />
            홈으로
          </Link>
          <h1 className="text-base font-bold text-neutral-900">
            히어로 이미지 편집
          </h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => writeHeroSlides([])}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-neutral-900"
            >
              <Eraser size={14} />
              전부 비우기
            </button>
            <button
              type="button"
              onClick={resetHeroSlides}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-neutral-900"
            >
              <RotateCcw size={14} />
              기본값으로
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5">
        {/* 선택된 슬라이드 — 순서 그대로 히어로에 반영 */}
        <section className="pt-8">
          <h2 className="text-sm font-bold text-neutral-900">
            히어로에 들어갈 순서
            <span className="ml-2 font-medium text-neutral-500">
              {selected.length}장 · 화살표로 순서 변경
            </span>
          </h2>
          {selected.length === 0 ? (
            <p className="mt-4 rounded-lg border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
              아래 라이브러리에서 이미지를 하나씩 골라 담아보세요. 비어 있는
              동안 히어로는 어두운 배경만 표시됩니다. (기본 구성으로 돌아가려면
              우측 상단 &ldquo;기본값으로&rdquo;)
            </p>
          ) : (
            <ul className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {selected.map((src, i) => (
                <li key={src} className="w-52 shrink-0">
                  <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-brand">
                    <Image
                      src={src}
                      alt={labelOf(src)}
                      fill
                      sizes="208px"
                      className="object-cover"
                    />
                    <span className="absolute left-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-hero">
                      {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(src)}
                      aria-label={`${labelOf(src)} 빼기`}
                      className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => move(src, -1)}
                      disabled={i === 0}
                      aria-label="앞으로"
                      className="rounded p-1 text-neutral-600 hover:bg-neutral-200 disabled:opacity-30"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <p className="truncate px-1 text-xs font-medium text-neutral-600">
                      {labelOf(src)}
                    </p>
                    <button
                      type="button"
                      onClick={() => move(src, 1)}
                      disabled={i === selected.length - 1}
                      aria-label="뒤로"
                      className="rounded p-1 text-neutral-600 hover:bg-neutral-200 disabled:opacity-30"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 전체 라이브러리 */}
        <section className="mt-10">
          <h2 className="text-sm font-bold text-neutral-900">
            이미지 라이브러리
            <span className="ml-2 font-medium text-neutral-500">
              {IMAGE_LIBRARY.length}장 · 클릭해서 넣기
            </span>
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {IMAGE_LIBRARY.map((img) => {
              const active = isSelected(img.src);
              return (
                <li key={img.src}>
                  <button
                    type="button"
                    onClick={() => (active ? remove(img.src) : add(img.src))}
                    className="group w-full text-left"
                  >
                    <div
                      className={cn(
                        "relative aspect-video overflow-hidden rounded-lg border-2 transition-colors",
                        active
                          ? "border-brand"
                          : "border-transparent group-hover:border-neutral-300",
                      )}
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        sizes="(min-width: 1024px) 20vw, 50vw"
                        className={cn(
                          "object-cover transition-opacity",
                          active && "opacity-70",
                        )}
                      />
                      <span
                        className={cn(
                          "absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full text-xs font-bold transition-colors",
                          active
                            ? "bg-brand text-hero"
                            : "bg-black/50 text-white opacity-0 group-hover:opacity-100",
                        )}
                      >
                        {active ? selected.indexOf(img.src) + 1 : <Plus size={13} />}
                      </span>
                    </div>
                    <p className="mt-1.5 truncate text-xs font-medium text-neutral-600">
                      {img.label}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 미리보기 이동 */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-hero transition-colors hover:bg-brand-strong hover:text-white"
          >
            홈에서 확인하기
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
