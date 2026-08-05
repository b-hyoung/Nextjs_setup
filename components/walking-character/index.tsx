"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 인터랙티브 캐릭터
 * - 스크롤: 영상처럼 부드러운 시간 기반 걷기 (아래=walk 시트, 위=back 시트)
 * - 멈추면: 사이클 완결 후 idle — 마우스 방향을 9방향 시선(gaze 시트)으로 따라봄
 * - gaze 시트가 없으면 걷기 0프레임으로 idle
 */
const FRAME_COUNT = 8;
const FRAME_MS = 80; // 걷기 재생 속도 (~12.5fps)
const STOP_AFTER_MS = 200;
const GAZE_DEADZONE = 70; // px — 이 안쪽이면 정면
const GAZE_THROTTLE_MS = 100; // 시선 갱신 최소 간격 (두리번거림 방지)

type Sheet = "walk" | "back";

const walkSrc = (sheet: Sheet, i: number) =>
  `/images/character/${sheet}-${i}.webp`;
// gaze 인덱스: 0 좌상 1 상 2 우상 / 3 좌 4 정면 5 우 / 6 좌하 7 하 8 우하
const gazeSrc = (i: number) => `/images/character/gaze-${i}.webp`;

const preload = (srcs: string[]) =>
  Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = src;
        }),
    ),
  );

const WalkingCharacter = () => {
  const [frame, setFrame] = useState(0);
  const [sheet, setSheet] = useState<Sheet>("walk");
  const [idle, setIdle] = useState(true);
  const [gaze, setGaze] = useState(4);
  const [walkReady, setWalkReady] = useState(false);
  const [gazeReady, setGazeReady] = useState(false);
  const dir = useRef<Sheet>("walk");
  const lastScrollAt = useRef(0);
  const lastY = useRef(0);
  const lastGazeAt = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);

  // 프리로드: 걷기 16프레임(필수) + 시선 9프레임(선택)
  useEffect(() => {
    let alive = true;
    preload(
      (["walk", "back"] as const).flatMap((s) =>
        Array.from({ length: FRAME_COUNT }, (_, i) => walkSrc(s, i)),
      ),
    )
      .then(() => alive && setWalkReady(true))
      .catch(() => {});
    preload(Array.from({ length: 9 }, (_, i) => gazeSrc(i)))
      .then(() => alive && setGazeReady(true))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // 걷기: 시간 기반 재생 루프
  useEffect(() => {
    if (!walkReady) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;
      if (delta === 0) return;
      dir.current = delta > 0 ? "walk" : "back";
      lastScrollAt.current = performance.now();
    };

    let raf = 0;
    let acc = 0;
    let prev = performance.now();
    let currentFrame = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = now - prev;
      prev = now;

      const scrollingRecently =
        now - lastScrollAt.current < STOP_AFTER_MS && lastScrollAt.current > 0;
      const shouldAnimate =
        !reduced.matches && (scrollingRecently || currentFrame !== 0);

      if (!shouldAnimate) {
        acc = 0;
        setIdle(true);
        return;
      }

      setIdle(false);
      setSheet(dir.current);
      acc += dt;
      while (acc >= FRAME_MS) {
        acc -= FRAME_MS;
        currentFrame = (currentFrame + 1) % FRAME_COUNT;
        if (!scrollingRecently && currentFrame === 0) break;
      }
      setFrame(currentFrame);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [walkReady]);

  // 시선: 마우스 방향 → 9방향 (idle일 때만)
  useEffect(() => {
    if (!gazeReady) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastGazeAt.current < GAZE_THROTTLE_MS) return;
      lastGazeAt.current = now;
      const box = boxRef.current?.getBoundingClientRect();
      if (!box) return;
      // 캐릭터 머리 근처를 시선 원점으로
      const ox = box.left + box.width / 2;
      const oy = box.top + box.height * 0.3;
      const dx = e.clientX - ox;
      const dy = e.clientY - oy;
      if (reduced.matches) {
        setGaze(4);
        return;
      }
      const col =
        Math.abs(dx) < GAZE_DEADZONE ? 1 : dx < 0 ? 0 : 2;
      const row =
        Math.abs(dy) < GAZE_DEADZONE ? 1 : dy < 0 ? 0 : 2;
      setGaze(row * 3 + col);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [gazeReady]);

  if (!walkReady) return null;

  const showGaze = idle && gazeReady;

  return (
    <div
      ref={boxRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed bottom-4 right-4 z-40 hidden md:block lg:right-10",
        idle && "character-idle",
      )}
    >
      {/* 모든 프레임을 겹쳐두고 현재 것만 표시 — 교체 깜빡임 없음 */}
      <div className="relative h-40 w-32 lg:h-48 lg:w-40">
        {(["walk", "back"] as const).map((s) =>
          Array.from({ length: FRAME_COUNT }, (_, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${s}-${i}`}
              src={walkSrc(s, i)}
              alt=""
              draggable={false}
              className={cn(
                "absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]",
                !showGaze && s === sheet && i === frame
                  ? "visible"
                  : "invisible",
              )}
            />
          )),
        )}
        {gazeReady &&
          Array.from({ length: 9 }, (_, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`gaze-${i}`}
              src={gazeSrc(i)}
              alt=""
              draggable={false}
              className={cn(
                "absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]",
                showGaze && i === gaze ? "visible" : "invisible",
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default WalkingCharacter;
