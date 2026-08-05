import React from "react";
import { SITE } from "@/constants/site";

/** 슬로건 — 화이트 배경 시작점, 액센트 한 줄 (playpark ② 참고) */
const Slogan = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-24">
        <p className="text-2xl font-extrabold tracking-tight text-brand-strong sm:text-3xl">
          “{SITE.slogan}”
        </p>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-neutral-600">
          {SITE.vision}
        </p>
      </div>
    </section>
  );
};

export default Slogan;
