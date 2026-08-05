import React from "react";
import { FIELDS } from "@/constants/site";
import SectionHeading from "./section-heading";

/** 적용분야 — 교육·문화·역사·축제 4단 (REQUIREMENTS §3.3) */
const Fields = () => {
  return (
    <section id="fields" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          title="적용분야"
          description="실시간 기술이 만드는 몰입형 경험은 교육·문화·역사·축제 현장에서 검증되고 있습니다."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
          {FIELDS.map((field, i) => (
            <article key={field.title} className="bg-white p-6">
              <p className="text-xs font-bold text-brand-strong">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-bold text-neutral-900">
                {field.title}
                <span className="ml-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
                  {field.titleEn}
                </span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
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
