import React from "react";
import { CONTACT, SITE } from "@/constants/site";

const Footer = () => {
  return (
    <footer className="bg-hero text-white/70">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-extrabold text-white">
              {SITE.name}
              <span className="ml-2 text-xs font-medium text-white/50">
                {SITE.nameEn}
              </span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">
              {SITE.tagline}
            </p>
          </div>
          <dl className="space-y-1.5 text-sm">
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-white/40">주소</dt>
              <dd>{CONTACT.address}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-white/40">전화</dt>
              <dd>{CONTACT.tel}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-white/40">이메일</dt>
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
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} {SITE.nameEn}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
