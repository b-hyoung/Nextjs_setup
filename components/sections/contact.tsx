import React from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/constants/site";

/** 문의 — 이메일이 주인공인 비대칭 구성. 주소·전화는 보조 메타 (REQUIREMENTS §3.7) */
const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-16 bg-neutral-50">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:py-24 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            프로젝트를 시작해볼까요?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-neutral-600">
            프로젝트 협업, 교육 프로그램, 파트너십 등 어떤 문의든 환영합니다.
           
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="group mt-8 inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-neutral-900 underline decoration-brand decoration-4 underline-offset-8 transition-colors hover:text-brand-strong sm:text-3xl"
          >
            {CONTACT.email}
            <ArrowUpRight
              size={28}
              className="text-brand-strong transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* 보조 연락처 메타 */}
        <dl className="space-y-5 border-t-2 border-neutral-900 pt-5 text-sm lg:mt-2">
          <div>
            <dt className="font-bold text-neutral-900">주소</dt>
            <dd className="mt-1 leading-relaxed text-neutral-600">
              {CONTACT.address}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-neutral-900">전화</dt>
            <dd className="mt-1 text-neutral-600">{CONTACT.tel}</dd>
          </div>
          <div>
            <dt className="font-bold text-neutral-900">팩스</dt>
            <dd className="mt-1 text-neutral-600">{CONTACT.fax}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Contact;
