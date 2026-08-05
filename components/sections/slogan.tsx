import React from "react";
import { SITE } from "@/constants/site";

/** 비전 스테이트먼트 — 좌정렬 대형 텍스트 밴드 */
const Slogan = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:py-24">
        <p className="max-w-3xl text-balance text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-3xl">
          {SITE.vision}
        </p>
        <div className="mt-6 h-1 w-16 bg-brand" />
      </div>
    </section>
  );
};

export default Slogan;
