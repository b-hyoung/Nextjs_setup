import React from "react";
import { Mail, MapPin, Phone, Printer, Globe } from "lucide-react";
import { CONTACT } from "@/constants/site";
import SectionHeading from "./section-heading";

/** 문의 — 실제 연락처만 노출 (REQUIREMENTS §3.7) */
const Contact = () => {
  const rows = [
    { icon: MapPin, label: "주소", value: CONTACT.address },
    { icon: Phone, label: "전화", value: CONTACT.tel },
    { icon: Printer, label: "팩스", value: CONTACT.fax },
    {
      icon: Mail,
      label: "이메일",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: Globe,
      label: "웹사이트",
      value: CONTACT.website,
      href: `https://${CONTACT.website}`,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:py-24">
        <SectionHeading
          title="문의하기"
          description={
            "프로젝트 협업, 교육 프로그램, 파트너십 등\n어떤 문의든 환영합니다."
          }
        />
        <div className="mx-auto mt-12 max-w-lg">
          <dl className="divide-y divide-neutral-100 rounded-xl border border-neutral-200">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center gap-4 px-6 py-4">
                <row.icon
                  size={18}
                  strokeWidth={1.75}
                  className="shrink-0 text-brand-strong"
                />
                <dt className="w-16 shrink-0 text-sm font-semibold text-neutral-500">
                  {row.label}
                </dt>
                <dd className="text-sm text-neutral-800">
                  {row.href ? (
                    <a
                      href={row.href}
                      className="hover:text-brand-strong"
                      {...(row.href.startsWith("https")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-8 block rounded-full bg-brand py-3.5 text-center text-sm font-bold text-hero transition-colors hover:bg-brand-strong hover:text-white"
          >
            이메일로 문의하기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
