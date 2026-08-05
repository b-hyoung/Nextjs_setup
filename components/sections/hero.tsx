import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/constants/site";

/** 히어로 — 사이트에서 유일한 다크 화면 (REQUIREMENTS §2, §4①) */
const Hero = () => {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-center bg-hero text-white">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16">
        <p className="text-sm font-semibold tracking-[0.2em] text-brand">
          REAL-TIME CONTENT STUDIO
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE.tagline}
          <br />
          <span className="text-brand">{SITE.name}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          {SITE.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-hero transition-colors hover:bg-brand-strong hover:text-white"
          >
            문의하기
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#business"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/60"
          >
            사업분야 보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
