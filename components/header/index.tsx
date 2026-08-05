/** 헤더 — 최상단: 투명+화이트 로고 / 스크롤: 화이트 배경+블랙 로고 */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, SlidersHorizontal } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-neutral-200 bg-white shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5">
        <Link
          href="/"
          aria-label={`${SITE.name} 홈으로`}
          onClick={() => setOpen(false)}
          className="flex flex-col items-center gap-[3px]"
        >
          <Image
            src={
              solid
                ? "/images/logo-2026-black-wordmark.webp"
                : "/images/logo-2026-wordmark.webp"
            }
            alt={`${SITE.nameEn} 로고`}
            width={1363}
            height={118}
            priority
            className="h-5 w-auto"
          />
          {/* 서브타이틀은 텍스트로 — 작은 크기에서도 선명 */}
          <span
            className={cn(
              "text-[9px] font-medium uppercase leading-none tracking-[0.3em]",
              solid ? "text-neutral-500" : "text-white/60",
            )}
          >
            Immersive AI Labs
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                solid
                  ? "text-neutral-600 hover:text-neutral-900"
                  : "text-white/80 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-hero transition-colors hover:bg-brand-strong hover:text-white"
          >
            회사소개
          </Link>
          {/* 히어로 이미지 편집 진입 */}
          <Link
            href="/customize"
            aria-label="히어로 이미지 편집"
            title="히어로 이미지 편집"
            className={cn(
              "ml-1 rounded-md p-2 transition-colors",
              solid
                ? "text-neutral-400 hover:text-neutral-900"
                : "text-white/60 hover:text-white",
            )}
          >
            <SlidersHorizontal size={16} />
          </Link>
        </nav>

        {/* 모바일 토글 */}
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className={cn("md:hidden", solid ? "text-neutral-900" : "text-white")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <nav className="border-t border-neutral-100 bg-white px-5 pb-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-2 py-3 text-sm font-medium text-neutral-700 hover:text-brand-strong"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block rounded-md px-2 py-3 text-sm font-medium text-neutral-700 hover:text-brand-strong"
            onClick={() => setOpen(false)}
          >
            회사소개
          </Link>
          <Link
            href="/customize"
            className="block rounded-md px-2 py-3 text-sm font-medium text-neutral-700 hover:text-brand-strong"
            onClick={() => setOpen(false)}
          >
            히어로 이미지 편집
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
