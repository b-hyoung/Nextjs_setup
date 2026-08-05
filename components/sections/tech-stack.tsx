import React from "react";
import { TECH_STACK } from "@/constants/site";
import SectionHeading from "./section-heading";

/** 기술 스택 — 소개서에 명시된 장비·엔진만 나열 (REQUIREMENTS §4⑤) */
const TechStack = () => {
  return (
    <section id="tech" className="scroll-mt-16 bg-neutral-50">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:py-24">
        <SectionHeading
          title="기술 스택"
          description="캐릭터·환경·VFX·인터랙션·프로그래밍까지 전 과정을 인하우스 실시간 엔진 워크플로로 제작합니다."
        />
        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {TECH_STACK.map((tech) => (
            <li
              key={tech.name}
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2"
            >
              <span className="text-sm font-semibold text-neutral-900">
                {tech.name}
              </span>
              <span className="text-xs text-neutral-500">{tech.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TechStack;
