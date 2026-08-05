import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Navigation, Phone, Printer } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CONTACT, SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "문의하기 | 훈아티스",
  description: "훈아티스 문의 및 오시는 길 안내",
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
            src="/images/moments/expo-booth.webp"
            alt="훈아티스 전시 부스 현장"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hero/75 via-hero/45 to-hero/85" />
          <div className="hero-text-guard relative mx-auto max-w-[1440px] px-5 pb-16 pt-44 sm:pb-20 sm:pt-52">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand">
              Let&apos;s Build Together
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              문의하기
            </h1>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/85">
              <MapPin size={15} className="shrink-0 text-brand" />
              {CONTACT.address} {SITE.name}
            </p>
          </div>
        </section>

        {/* 오시는 길 */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              오시는 길
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* 지도 */}
              <div>
                <div className="overflow-hidden rounded-xl border border-neutral-200">
                  <iframe
                    title={`${SITE.name} 위치 지도`}
                    src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=16&ie=UTF8&output=embed`}
                    className="h-[420px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin size={15} className="shrink-0 text-brand-strong" />
                  {CONTACT.address} {SITE.name}
                </p>
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

              {/* 연락처 카드 */}
              <aside className="h-fit rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-lg font-bold text-neutral-900">연락처</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <Phone
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-strong"
                    />
                    <div>
                      <dt className="font-semibold text-neutral-500">전화</dt>
                      <dd className="mt-0.5 text-neutral-900">{CONTACT.tel}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Printer
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-strong"
                    />
                    <div>
                      <dt className="font-semibold text-neutral-500">팩스</dt>
                      <dd className="mt-0.5 text-neutral-900">{CONTACT.fax}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-strong"
                    />
                    <div>
                      <dt className="font-semibold text-neutral-500">이메일</dt>
                      <dd className="mt-0.5 text-neutral-900">
                        {CONTACT.email}
                      </dd>
                    </div>
                  </div>
                </dl>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-6 block rounded-full bg-brand py-3 text-center text-sm font-bold text-hero transition-colors hover:bg-brand-strong hover:text-white"
                >
                  이메일 문의하기
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
