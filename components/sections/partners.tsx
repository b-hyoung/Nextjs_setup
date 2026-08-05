import React from "react";
import Image from "next/image";
import { PARTNER_LOGOS } from "@/constants/site";
import SectionHeading from "./section-heading";

/** 파트너 — 소개서에서 추출한 실제 협력 기관·행사 로고 그리드 (REQUIREMENTS §3.5) */
const Partners = () => {
  return (
    <section id="partners" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          title="파트너"
          description={
            "전국 지자체·대학교·문화기관·방송사와 함께 프로젝트를 수행하고\nGITEX·G-STAR 등 국내외 무대에 참가해 왔습니다."
          }
        />
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNER_LOGOS.map((partner) => (
            <li
              key={partner.name}
              className="flex flex-col items-center justify-center gap-3 bg-white px-6 py-8"
            >
              <div className="relative flex h-12 w-full items-center justify-center">
                <Image
                  src={partner.src}
                  alt={`${partner.name} 로고`}
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-medium text-neutral-500">
                {partner.name}
              </span>
            </li>
          ))}
          {/* 4열 그리드 마지막 칸 채움 */}
          <li aria-hidden className="hidden bg-white lg:block" />
        </ul>
      </div>
    </section>
  );
};

export default Partners;
