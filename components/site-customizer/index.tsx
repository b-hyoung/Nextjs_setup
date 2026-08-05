"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { SECTION_REGISTRY, type SectionId } from "@/constants/site";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import Slogan from "@/components/sections/slogan";
import Business from "@/components/sections/business";
import Fields from "@/components/sections/fields";
import TechStack from "@/components/sections/tech-stack";
import History from "@/components/sections/history";
import Partners from "@/components/sections/partners";
import Contact from "@/components/sections/contact";

const STORAGE_KEY = "hoonartis-visible-sections";
const STORE_EVENT = "hoonartis-sections-change";

const defaultVisibility = () =>
  Object.fromEntries(SECTION_REGISTRY.map((s) => [s.id, true])) as Record<
    SectionId,
    boolean
  >;

// localStorage를 외부 스토어로 구독 (SSR 스냅샷은 null → 기본값)
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

const writeVisibility = (next: Record<SectionId, boolean>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(STORE_EVENT));
};

/**
 * 사이트 커스터마이저 — 우측 사이드 패널에서 섹션을 넣었다 뺐다 하며
 * 원하는 구성만 남길 수 있다. 선택은 localStorage에 저장된다.
 */
const SiteCustomizer = () => {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = useMemo<Record<SectionId, boolean>>(() => {
    if (!raw) return defaultVisibility();
    try {
      return { ...defaultVisibility(), ...JSON.parse(raw) };
    } catch {
      return defaultVisibility();
    }
  }, [raw]);
  const [open, setOpen] = useState(false);

  const toggle = (id: SectionId) =>
    writeVisibility({ ...visible, [id]: !visible[id] });

  const hiddenAnchors = SECTION_REGISTRY.filter(
    (s) => s.anchor && !visible[s.id],
  ).map((s) => s.anchor as string);

  return (
    <>
      <Header hiddenAnchors={hiddenAnchors} />
      <main>
        <Hero showSticker={visible.sticker} />
        {visible.slogan && <Slogan />}
        {visible.business && <Business />}
        {visible.fields && <Fields />}
        {visible.tech && <TechStack />}
        <History />
        {visible.partners && <Partners />}
        {visible.contact && <Contact />}
      </main>

      {/* 패널 열기 버튼 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="섹션 구성 열기"
        className={cn(
          "fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-xl bg-hero/90 p-3 text-white shadow-lg backdrop-blur transition-transform hover:bg-hero",
          open && "translate-x-full",
        )}
      >
        <SlidersHorizontal size={18} />
      </button>

      {/* 사이드 패널 */}
      <aside
        aria-label="섹션 구성 패널"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-svh w-72 flex-col bg-hero text-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="text-sm font-bold">섹션 구성</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="패널 닫기"
            className="text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {SECTION_REGISTRY.map((section) => (
            <li key={section.id}>
              <label className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 hover:bg-white/5">
                <span className="text-sm">{section.label}</span>
                {/* 토글 스위치 */}
                <input
                  type="checkbox"
                  checked={visible[section.id]}
                  onChange={() => toggle(section.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                    visible[section.id] ? "bg-brand" : "bg-white/20",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 size-4 rounded-full bg-white transition-all",
                      visible[section.id] ? "left-4.5" : "left-0.5",
                    )}
                  />
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => writeVisibility(defaultVisibility())}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 py-2.5 text-sm font-semibold text-white/90 hover:border-white/60"
          >
            <RotateCcw size={14} />
            전체 되돌리기
          </button>
        </div>
      </aside>
    </>
  );
};

export default SiteCustomizer;
