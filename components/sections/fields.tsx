import React from "react";
import { FIELDS } from "@/constants/site";

/** 적용분야 — 사이드 헤딩 + 4열 리스트 (REQUIREMENTS §3.3) */
const Fields = () => {
  return (
    <section id="fields" className="scroll-mt-16 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[240px_1fr]">
        <div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-neutral-900">
            적용분야
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            실시간 기술이 만드는 몰입형 경험은 교육·문화·역사·축제 현장에서
            검증되고 있습니다.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <article
              key={field.title}
              className="border-t-2 border-neutral-900 pt-4"
            >
              <h3 className="text-lg font-bold text-neutral-900">
                {field.title}
                <span className="ml-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {field.titleEn}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {field.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fields;
