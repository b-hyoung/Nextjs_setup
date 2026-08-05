import React from "react";
import { BUSINESS_AREAS } from "@/constants/site";
import SectionHeading from "./section-heading";

/** 사업분야 — 카드 6개, [제목 / 명사+적용분야 태그 / 설명] (playpark ③ 참고) */
const Business = () => {
  return (
    <section id="business" className="scroll-mt-16 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          title="사업분야"
          description={
            "훈아티스는 AI·XR·디지털트윈·미디어아트 기술을 기반으로\n산업·교육·문화 분야에 특화된 실감형 콘텐츠를 개발합니다."
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_AREAS.map((area) => (
            <article
              key={area.title}
              className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-neutral-900">
                {area.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-brand-strong">
                {area.tags}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Business;
