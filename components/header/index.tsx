/** 헤더 — 다크 히어로 위에 얹히는 고정 내비게이션 */
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
  const navItems = NAV_ITEMS;

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
        scrolled || open
          ? "bg-hero/95 backdrop-blur border-b border-white/10"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5">
        <Link
          href="#top"
          aria-label={`${SITE.name} 홈으로`}
          onClick={() => setOpen(false)}
          className="flex flex-col items-center gap-[3px]"
        >
          <Image
            src="/images/logo-2026-wordmark.webp"
            alt={`${SITE.nameEn} 로고`}
            width={1361}
            height={118}
            priority
            className="h-5 w-auto"
          />
          {/* 서브타이틀은 텍스트로 — 작은 크기에서도 선명 */}
          <span className="text-[9px] font-medium uppercase leading-none tracking-[0.3em] text-white/60">
            Immersive AI Labs
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
            item.label === "문의하기" ? (
              <Link
                key={item.href}
                href={item.href}
                className="ml-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-hero transition-colors hover:bg-brand-strong hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
          {/* 히어로 이미지 편집 진입 */}
          <Link
            href="/customize"
            aria-label="히어로 이미지 편집"
            title="히어로 이미지 편집"
            className="ml-1 rounded-md p-2 text-white/60 transition-colors hover:text-white"
          >
            <SlidersHorizontal size={16} />
          </Link>
        </nav>

        {/* 모바일 토글 */}
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <nav className="border-t border-white/10 bg-hero px-5 pb-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-2 py-3 text-sm font-medium text-white/90 hover:text-brand"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/customize"
            className="block rounded-md px-2 py-3 text-sm font-medium text-white/90 hover:text-brand"
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
