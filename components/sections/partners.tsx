import React from "react";
import { PARTNER_CATEGORIES } from "@/constants/site";

/** 파트너 — 사이드 헤딩 + 조용한 텍스트 컬럼 (REQUIREMENTS §3.5) */
const Partners = () => {
  return (
    <section id="partners" className="scroll-mt-16 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[240px_1fr]">
        <div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-neutral-900">
            파트너
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            전국 지자체·대학교·국내외 페스티벌과 함께 GITEX 등 글로벌 무대에서
            프로젝트를 수행해 왔습니다.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {PARTNER_CATEGORIES.map((partner) => (
            <article
              key={partner.title}
              className="border-t-2 border-neutral-900 pt-4"
            >
              <h3 className="text-lg font-bold text-neutral-900">
                {partner.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {partner.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
