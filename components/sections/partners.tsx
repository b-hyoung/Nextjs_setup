import React from "react";
import { Building2, GraduationCap, Globe2, Handshake } from "lucide-react";
import { PARTNER_CATEGORIES } from "@/constants/site";
import SectionHeading from "./section-heading";

const ICONS = [Building2, GraduationCap, Globe2, Handshake];

/** 파트너 — 로고 자료 확보 전까지 카테고리 카드 (REQUIREMENTS §3.5) */
const Partners = () => {
  return (
    <section id="partners" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          title="파트너"
          description={
            "훈아티스는 전국 지자체·대학교·국내외 페스티벌과 함께\nGITEX 등 글로벌 무대에서 프로젝트를 수행해 왔습니다."
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_CATEGORIES.map((partner, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article
                key={partner.title}
                className="rounded-xl border border-neutral-200 p-6 text-center"
              >
                <Icon
                  className="mx-auto text-brand-strong"
                  size={28}
                  strokeWidth={1.75}
                />
                <h3 className="mt-4 text-base font-bold text-neutral-900">
                  {partner.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {partner.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Partners;
