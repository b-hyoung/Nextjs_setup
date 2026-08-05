import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { BUSINESS_AREAS } from "@/constants/site";
import SectionHeading from "./section-heading";
import { cn } from "@/lib/utils";

/**
 * 사업분야 — 이미지와 설명 문단을 짝지은 지그재그 행 구조.
 * playpark식 균일 카드 그리드 대신, 각 영역의 실제 프로젝트 이미지가 문단 옆에 붙는다.
 */
const Business = () => {
  return (
    <section id="business" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:py-24">
        <SectionHeading
          title="사업분야"
          description={
            "훈아티스는 AI·XR·디지털트윈·미디어아트 기술을 기반으로\n산업·교육·문화 분야에 특화된 실감형 콘텐츠를 개발합니다."
          }
        />
        <div className="mt-16 space-y-16 sm:space-y-20">
          {BUSINESS_AREAS.map((area, i) => (
            <article
              key={area.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              {/* 대표 이미지 1장 + 보조 이미지 2장 모자이크 */}
              <div className={cn("space-y-3", i % 2 === 1 && "lg:order-2")}>
                <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={area.images[0].src}
                    alt={area.images[0].alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {area.images.slice(1).map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[16/8] overflow-hidden rounded-lg bg-neutral-100"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={cn(i % 2 === 1 && "lg:order-1")}>
                <p className="text-sm font-semibold text-brand-strong">
                  {area.tags}
                </p>
                <h3 className="mt-2 text-balance text-2xl font-extrabold tracking-tight text-neutral-900">
                  {area.title}
                </h3>
                <p className="mt-4 leading-relaxed text-neutral-600">
                  {area.description}
                </p>
                {area.video && (
                  <a
                    href={area.video}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
                  >
                    데모 영상 보기
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Business;
