import React from "react";
import { SITE } from "@/constants/site";

/** 시그니처 마퀴 — 주황 띠 위를 검정 대문자 시그니처가 무한히 흐른다 */
const SignatureMarquee = () => {
  const item = (
    <>
      <span className="mx-6">{SITE.slogan.toUpperCase()}</span>
      <span aria-hidden className="mx-2">
        ✦
      </span>
    </>
  );

  return (
    <section
      aria-label={SITE.slogan}
      className="overflow-hidden bg-brand py-3.5"
    >
      <div className="marquee flex w-max font-heading text-lg font-extrabold tracking-wide text-neutral-950 sm:text-xl">
        {/* 무한 루프용 두 벌 — 두 번째는 장식 */}
        <div className="flex shrink-0 items-center">
          {Array.from({ length: 4 }, (_, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 items-center">
          {Array.from({ length: 4 }, (_, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureMarquee;
