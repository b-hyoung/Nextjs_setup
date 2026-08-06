import React from "react";
import Image from "next/image";
import { CONTACT, SITE } from "@/constants/site";

const Footer = () => {
  return (
    <footer className="bg-hero text-white/70">
      <div className="mx-auto max-w-[1440px] px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/images/logo-2026-wordmark.webp"
              alt={`${SITE.nameEn} 로고`}
              width={1361}
              height={118}
              className="h-6 w-auto"
            />
            {/* 서브타이틀은 래스터 대신 텍스트로 — 작은 크기에서도 선명 */}
            <p className="mt-2 text-[11px] font-medium tracking-[0.25em] text-white/50">
              IMMERSIVE AI LABS
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed">
              {SITE.tagline}
            </p>
          </div>
          <dl className="space-y-1.5 text-sm">
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-white/55">주소</dt>
              <dd>{CONTACT.address}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-white/55">전화</dt>
              <dd>{CONTACT.tel}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-white/55">이메일</dt>
              <dd>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-brand"
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        {/* 사업자정보 + 저작권 — 대표자명은 회사소개 본문이 아닌 여기가 제자리 */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {SITE.name}
            <span className="px-2 text-white/25">|</span>
            대표 {CONTACT.ceo}
          </p>
          <p>© {new Date().getFullYear()} {SITE.nameEn}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
