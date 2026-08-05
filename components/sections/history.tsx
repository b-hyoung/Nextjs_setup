import React from "react";
import { HISTORY } from "@/constants/site";
import SectionHeading from "./section-heading";

/**
 * 연혁 — 연도별 실적 타임라인 (playpark ⑤ 참고)
 * 프로젝트명은 소개서에서 이미지로만 존재해 아직 비어 있음 (REQUIREMENTS §3.6 TODO).
 * items가 채워지기 전까지는 연도 축만 노출한다 — 지어내지 않는다.
 */
const History = () => {
  const filled = HISTORY.filter((h) => h.items.length > 0);
  if (filled.length === 0) {
    // 확정된 프로젝트명이 없는 동안 섹션 자체를 렌더링하지 않는다
    // (빈 연혁은 신뢰를 깎는다 — 기존 hoonartis.com 실패 요인 반복 금지)
    return null;
  }

  return (
    <section id="history" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:py-24">
        <SectionHeading
          title="연혁"
          description="지금의 훈아티스가 걸어온 길입니다."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {filled.map((year) => (
            <div key={year.date}>
              <p className="border-b-2 border-brand pb-2 text-2xl font-extrabold text-neutral-900">
                {year.date}
              </p>
              <ul className="mt-4 space-y-3">
                {year.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-neutral-700"
                  >
                    <span className="mr-1.5 text-brand-strong">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;
