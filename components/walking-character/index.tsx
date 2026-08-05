"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 인터랙티브 캐릭터 — 우선순위: 걷기 > 마우스 시선 > 날개 펄럭임 idle
 * - 스크롤: 시간 기반 걷기 재생 (아래=walk 시트, 위=back 시트)
 * - 멈춘 뒤 마우스가 움직이면: 9방향 시선(gaze)으로 커서를 따라봄
 * - 마우스도 잠잠하면: 6프레임 날개 펄럭임(idle 시트) + 둥실 부유
 */
const WALK_FRAMES = 8;
const IDLE_FRAMES = 6;
const FRAME_MS = 70; // 걷기 재생 (~14fps)
const IDLE_FRAME_MS = 150; // 펄럭임 재생
const STOP_AFTER_MS = 450; // 스크롤 멈춘 뒤에도 이만큼 더 걷고 마무리 (양방향 동일)
const GAZE_DEADZONE = 70;
const GAZE_THROTTLE_MS = 100;
const GAZE_HOLD_MS = 2000; // 마우스 멈춘 뒤 시선 유지 시간

type Sheet = "walk" | "back";

const walkSrc = (sheet: Sheet, i: number) =>
  `/images/character/${sheet}-${i}.webp`;
// gaze: 0 좌상 1 상 2 우상 / 3 좌 4 정면 5 우 / 6 좌하 7 하 8 우하
const gazeSrc = (i: number) => `/images/character/gaze-${i}.webp`;
const idleSrc = (i: number) => `/images/character/idle-${i}.webp`;

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
  const [gazeActive, setGazeActive] = useState(false);
  const [gazeMirror, setGazeMirror] = useState(false);
  const [idleFrame, setIdleFrame] = useState(0);
  const [walkReady, setWalkReady] = useState(false);
  const [gazeReady, setGazeReady] = useState(false);
  const [idleReady, setIdleReady] = useState(false);
  const dir = useRef<Sheet>("walk");
  const lastScrollAt = useRef(0);
  const lastY = useRef(0);
  const lastGazeAt = useRef(0);
  const gazeHold = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // 프리로드: 걷기(필수) / 시선·펄럭임(있으면 활성화)
  useEffect(() => {
    let alive = true;
    preload(
      (["walk", "back"] as const).flatMap((sh) =>
        Array.from({ length: WALK_FRAMES }, (_, i) => walkSrc(sh, i)),
      ),
    )
      .then(() => alive && setWalkReady(true))
      .catch(() => {});
    preload(Array.from({ length: 9 }, (_, i) => gazeSrc(i)))
      .then(() => alive && setGazeReady(true))
      .catch(() => {});
    preload(Array.from({ length: IDLE_FRAMES }, (_, i) => idleSrc(i)))
      .then(() => alive && setIdleReady(true))
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
        currentFrame = (currentFrame + 1) % WALK_FRAMES;
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

  // 시선: 마우스 방향 → 9방향, 멈추면 2초 뒤 펄럭임으로 복귀
  useEffect(() => {
    if (!gazeReady) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastGazeAt.current < GAZE_THROTTLE_MS) return;
      lastGazeAt.current = now;
      const box = boxRef.current?.getBoundingClientRect();
      if (!box) return;
      const ox = box.left + box.width / 2;
      const oy = box.top + box.height * 0.3; // 머리 근처가 시선 원점
      const dx = e.clientX - ox;
      const dy = e.clientY - oy;
      if (reduced.matches) {
        setGaze(4);
        return;
      }
      // 시트 아트가 왼쪽 시선만 명확 → 오른쪽은 왼쪽 셀(col0)을 CSS 미러링으로 사용
      const row = Math.abs(dy) < GAZE_DEADZONE ? 1 : dy < 0 ? 0 : 2;
      if (Math.abs(dx) < GAZE_DEADZONE) {
        setGaze(row * 3 + 1);
        setGazeMirror(false);
      } else {
        setGaze(row * 3); // col0 = 왼쪽 보는 아트
        setGazeMirror(dx > 0); // 오른쪽이면 좌우 반전
      }
      setGazeActive(true);
      if (gazeHold.current) clearTimeout(gazeHold.current);
      gazeHold.current = setTimeout(() => setGazeActive(false), GAZE_HOLD_MS);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (gazeHold.current) clearTimeout(gazeHold.current);
    };
  }, [gazeReady]);

  // 펄럭임 idle 재생
  const flapping = idle && idleReady && !(gazeActive && gazeReady);
  useEffect(() => {
    if (!flapping) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setIdleFrame((i) => (i + 1) % IDLE_FRAMES),
      IDLE_FRAME_MS,
    );
    return () => clearInterval(t);
  }, [flapping]);

  if (!walkReady) return null;

  const showGaze = idle && gazeActive && gazeReady;
  const showIdle = flapping;
  const layer = (visible: boolean) =>
    cn(
      "absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]",
      visible ? "visible" : "invisible",
    );

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
      <div className="relative h-52 w-40 lg:h-64 lg:w-48">
        {(["walk", "back"] as const).map((sh) =>
          Array.from({ length: WALK_FRAMES }, (_, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${sh}-${i}`}
              src={walkSrc(sh, i)}
              alt=""
              draggable={false}
              className={layer(
                !showGaze && !showIdle && sh === sheet && i === frame,
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
              className={cn(layer(showGaze && i === gaze), showGaze && i === gaze && gazeMirror && "-scale-x-100")}
            />
          ))}
        {idleReady &&
          Array.from({ length: IDLE_FRAMES }, (_, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`idle-${i}`}
              src={idleSrc(i)}
              alt=""
              draggable={false}
              className={layer(showIdle && i === idleFrame)}
            />
          ))}
      </div>
    </div>
  );
};

export default WalkingCharacter;
