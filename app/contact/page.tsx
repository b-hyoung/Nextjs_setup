import type { Metadata } from "next";
import Image from "next/image";
import { Navigation } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CONTACT, SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "훈아티스 | 회사소개",
  description: "훈아티스 회사소개 및 오시는 길 안내",
};

const MAP_QUERY = encodeURIComponent("전북 전주시 덕진구 백제대로 816");

/** 길찾기 앱 딥링크 — 주소 검색으로 진입 (좌표 불필요) */
const NAV_APPS = [
  { label: "티맵", href: `tmap://search?name=${MAP_QUERY}` },
  { label: "네이버지도", href: `https://map.naver.com/v5/search/${MAP_QUERY}` },
  { label: "카카오맵", href: `https://map.kakao.com/link/search/${MAP_QUERY}` },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* 히어로 — 현장 사진 위 다크 인트로 (헤더 투명 상태와 맞물림) */}
        <section className="relative overflow-hidden bg-hero text-white">
          <Image
            src="/images/gal-therapy-4.webp"
            alt="밤 단풍 정원 실시간 렌더링"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hero/75 via-hero/45 to-hero/85" />
          <div className="hero-text-guard relative mx-auto max-w-[1440px] px-5 pb-24 pt-44 sm:pb-32 sm:pt-52">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand">
              Let&apos;s Build Together
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              회사소개
            </h1>
          </div>
        </section>

        {/* 사업장 안내 — 좌측 공간 사진 + 우측 정보 테이블, 아래 전폭 지도 */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:py-20">
            <div className="grid items-start gap-10 lg:grid-cols-[440px_1fr] lg:gap-16">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src="/images/office-building.webp"
                  alt="훈아티스 사옥 — 전주 백제대로 816"
                  fill
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                  {SITE.name}
                </h2>
                <p className="mt-2 text-[15px] font-semibold text-brand-strong">
                  AI·XR·디지털트윈 실시간 콘텐츠 스튜디오
                </p>
                <dl className="mt-9 space-y-5 text-base">
                  <div className="flex gap-6">
                    <dt className="w-24 shrink-0 font-bold text-neutral-900">
                      대표
                    </dt>
                    <dd className="font-medium text-neutral-700">{CONTACT.ceo}</dd>
                  </div>
                  <div className="flex gap-6">
                    <dt className="w-24 shrink-0 font-bold text-neutral-900">
                      주소
                    </dt>
                    <dd className="font-medium text-neutral-700">{CONTACT.address}</dd>
                  </div>
                  <div className="flex gap-6">
                    <dt className="w-24 shrink-0 font-bold text-neutral-900">
                      대표번호
                    </dt>
                    <dd className="font-medium text-neutral-700">
                      <a
                        href={`tel:${CONTACT.tel}`}
                        className="transition-colors hover:text-brand-strong"
                      >
                        {CONTACT.tel}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-6">
                    <dt className="w-24 shrink-0 font-bold text-neutral-900">
                      팩스
                    </dt>
                    <dd className="font-medium text-neutral-700">{CONTACT.fax}</dd>
                  </div>
                  <div className="flex gap-6">
                    <dt className="w-24 shrink-0 font-bold text-neutral-900">
                      이메일
                    </dt>
                    <dd className="font-medium text-neutral-700">
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="transition-colors hover:text-brand-strong"
                      >
                        {CONTACT.email}
                      </a>
                    </dd>
                  </div>
                </dl>
                <p className="mt-8 text-[15px] text-neutral-500">
                  프로젝트·협업 문의는{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-semibold text-brand-strong underline underline-offset-4 transition-colors hover:text-neutral-900"
                  >
                    이메일로 보내주세요
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* 지도 */}
            <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              오시는 길
            </h3>
            <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
              <iframe
                title={`${SITE.name} 위치 지도`}
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=16&ie=UTF8&output=embed`}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* 길찾기 */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-neutral-900">
                앱으로 길찾기
              </span>
              {NAV_APPS.map((app) => (
                <a
                  key={app.label}
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-brand-strong hover:text-brand-strong"
                >
                  <Navigation size={13} />
                  {app.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
