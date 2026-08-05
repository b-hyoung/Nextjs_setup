"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 스크롤 워킹 캐릭터 — 8프레임 걷기 사이클을 스크롤로 스크럽한다.
 * 아래로 스크롤: 앞으로 걷기 / 위로: 뒤로 걷기 (프레임 역재생)
 * 멈추면: 사이클 완결 지점(0프레임)까지 부드럽게 마저 걷고 → 요정답게 둥실 idle
 */
const FRAME_COUNT = 8;
const PX_PER_FRAME = 55; // 스크롤 몇 px마다 한 프레임 넘길지 (보폭 감각)
const IDLE_DELAY_MS = 180; // 스크롤 멈춤 판정
const IDLE_STEP_MS = 90; // idle 복귀 시 프레임 진행 속도

const frameSrc = (i: number) => `/images/character/walk-${i}.webp`;
const mod = (n: number, m: number) => ((n % m) + m) % m;

const WalkingCharacter = () => {
  const [frame, setFrame] = useState(0);
  const [idle, setIdle] = useState(true);
  const [ready, setReady] = useState(false);
  const rawFrame = useRef(0); // 스크롤 누적 기준 프레임(비양자화)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // 프레임 프리로드 — 전부 로드된 뒤에만 표시 (깜빡임 방지)
  useEffect(() => {
    let alive = true;
    Promise.all(
      Array.from({ length: FRAME_COUNT }, (_, i) => {
        return new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = frameSrc(i);
        });
      }),
    )
      .then(() => alive && setReady(true))
      .catch(() => {
        /* 프레임 없으면 렌더링하지 않음 */
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clearTimers = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (settleTimer.current) clearInterval(settleTimer.current);
      settleTimer.current = null;
    };

    // 멈춤 → 가장 가까운 '앞으로' 사이클 완결(0프레임)까지 마저 걷고 idle
    const settleToIdle = () => {
      if (reduced.matches) {
        setFrame(0);
        setIdle(true);
        return;
      }
      settleTimer.current = setInterval(() => {
        const current = Math.round(rawFrame.current);
        if (mod(current, FRAME_COUNT) === 0) {
          clearInterval(settleTimer.current!);
          settleTimer.current = null;
          setIdle(true);
          return;
        }
        rawFrame.current = current + 1;
        setFrame(mod(current + 1, FRAME_COUNT));
      }, IDLE_STEP_MS);
    };

    const onScroll = () => {
      clearTimers();
      setIdle(false);
      if (reduced.matches) return; // 모션 최소화: 걷기 스크럽 없음
      rawFrame.current = window.scrollY / PX_PER_FRAME;
      setFrame(mod(Math.round(rawFrame.current), FRAME_COUNT));
      idleTimer.current = setTimeout(settleToIdle, IDLE_DELAY_MS);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimers();
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed bottom-4 right-4 z-40 hidden md:block lg:right-10",
        idle && "character-idle",
      )}
    >
      {/* 프레임 전부 겹쳐두고 현재 프레임만 표시 — 교체 깜빡임 없음 */}
      <div className="relative h-40 w-32 lg:h-48 lg:w-40">
        {Array.from({ length: FRAME_COUNT }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={frameSrc(i)}
            alt=""
            draggable={false}
            className={cn(
              "absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]",
              i === frame ? "visible" : "invisible",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default WalkingCharacter;
