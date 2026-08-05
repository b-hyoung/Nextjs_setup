"use client";

import { useMemo, useSyncExternalStore } from "react";
import { HERO_SLIDES, IMAGE_LIBRARY } from "@/constants/site";

/**
 * 히어로 슬라이드 커스텀 스토어 — /customize에서 고른 이미지 순서를
 * localStorage에 저장하고 히어로가 실시간 구독한다.
 */
const STORAGE_KEY = "hoonartis-hero-slides";
const STORE_EVENT = "hoonartis-hero-slides-change";

const subscribe = (cb: () => void) => {
  window.addEventListener(STORE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(STORE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const getSnapshot = () => localStorage.getItem(STORAGE_KEY);
const getServerSnapshot = () => null;

export const writeHeroSlides = (srcs: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(srcs));
  window.dispatchEvent(new Event(STORE_EVENT));
};

export const resetHeroSlides = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(STORE_EVENT));
};

export type HeroSlide = { src: string; alt: string; caption: string };

const DEFAULT_SLIDES: HeroSlide[] = HERO_SLIDES.map((s) => ({ ...s }));

/** 저장된 src 순서 목록 (없으면 null) */
export const useCustomSlideSrcs = (): string[] | null => {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
    } catch {
      return null;
    }
  }, [raw]);
};

/** 히어로가 실제로 렌더링할 슬라이드 (커스텀 없으면 기본값) */
export const useHeroSlides = (): HeroSlide[] => {
  const custom = useCustomSlideSrcs();
  return useMemo(() => {
    if (!custom) return DEFAULT_SLIDES;
    const slides = custom
      .map((src) => IMAGE_LIBRARY.find((img) => img.src === src))
      .filter((img): img is (typeof IMAGE_LIBRARY)[number] => Boolean(img))
      .map((img) => ({ src: img.src, alt: img.label, caption: img.label }));
    return slides.length > 0 ? slides : DEFAULT_SLIDES;
  }, [custom]);
};
