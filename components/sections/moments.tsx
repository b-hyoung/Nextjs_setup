import React from "react";
import Image from "next/image";
import { MOMENTS } from "@/constants/site";

/**
 * 메인 스트립 — 만든 것들과 전시·행사 참여 사진이 끊김 없이 흐르는 마퀴.
 * 히어로 바로 아래에 붙어 "실제로 활동하는 회사"를 첫 화면에서 보여준다.
 */
const Moments = () => {
  return (
    <section aria-label="프로젝트·행사 사진 모음" className="bg-hero py-5">
      <div className="marquee-mask overflow-hidden">
        {/* gap 대신 li margin — -50% 이동이 정확히 한 세트 폭이 되도록 */}
        <ul className="marquee flex w-max">
          {/* 무한 루프를 위해 두 벌 렌더링 */}
          {[0, 1].map((dup) => (
            <React.Fragment key={dup}>
              {MOMENTS.map((m) => (
                <li
                  key={`${dup}-${m.src}`}
                  aria-hidden={dup === 1 || undefined}
                  className="relative mr-4 h-40 w-64 shrink-0 overflow-hidden rounded-lg sm:h-48 sm:w-80"
                >
                  <Image
                    src={m.src}
                    alt={dup === 0 ? m.alt : ""}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Moments;
