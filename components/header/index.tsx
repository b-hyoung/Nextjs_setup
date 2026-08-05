/** 헤더 — 다크 히어로 위에 얹히는 고정 내비게이션 */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="#top"
          className="text-lg font-extrabold tracking-tight text-white"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
          <span className="ml-2 hidden text-xs font-medium text-white/60 sm:inline">
            {SITE.nameEn}
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) =>
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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-2 py-3 text-sm font-medium text-white/90 hover:text-brand"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
