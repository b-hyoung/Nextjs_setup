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
              src="/images/logo-wide.png"
              alt={`${SITE.nameEn} 로고`}
              width={170}
              height={30}
              className="h-7 w-auto"
            />
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
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/55">
          © {new Date().getFullYear()} {SITE.nameEn}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
