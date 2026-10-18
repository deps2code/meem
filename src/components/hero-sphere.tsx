"use client";

import { useEffect, useRef } from "react";
import type { HeroContent } from "@/lib/site-content";

const BUFFER_SIZE = 160;
const AUTO_ROTATE_SPEED = 0.35; // rad/sec
const WAVE_COLOR: [number, number, number] = [231, 148, 201];
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function normalize(x: number, y: number, z: number) {
  const len = Math.sqrt(x * x + y * y + z * z);
  return { x: x / len, y: y / len, z: z / len };
}

const LIGHT_DIR = normalize(0.5, 0.5, 1.0);

type HeroSphereProps = {
  content: HeroContent;
};

export function HeroSphere({ content }: HeroSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = BUFFER_SIZE;
    canvas.height = BUFFER_SIZE;
    ctx.imageSmoothingEnabled = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const litColor = WAVE_COLOR;

    const rotX = { current: 0.3 };
    const rotY = { current: 0 };
    const isDragging = { current: false };
    const lastPos = { current: { x: 0, y: 0 } };

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      rotY.current += dx * 0.01;
      rotX.current = Math.max(-1.4, Math.min(1.4, rotX.current + dy * 0.01));
      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    const imageData = ctx.createImageData(BUFFER_SIZE, BUFFER_SIZE);
    const data = imageData.data;

    let rafId = 0;
    let lastTime = performance.now();

    const draw = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!isDragging.current && !prefersReducedMotion) {
        rotY.current += AUTO_ROTATE_SPEED * dt;
      }

      const cx = Math.cos(rotX.current);
      const sx = Math.sin(rotX.current);
      const cy = Math.cos(rotY.current);
      const sy = Math.sin(rotY.current);

      const rox = 0;
      const roy = 0;
      const roz = 2.2;

      for (let y = 0; y < BUFFER_SIZE; y++) {
        const v = (y + 0.5 - BUFFER_SIZE / 2) / (BUFFER_SIZE / 2);
        for (let x = 0; x < BUFFER_SIZE; x++) {
          const u = (x + 0.5 - BUFFER_SIZE / 2) / (BUFFER_SIZE / 2);

          let rdx = u;
          let rdy = v;
          let rdz = -1.2;
          const rdLen = Math.sqrt(rdx * rdx + rdy * rdy + rdz * rdz);
          rdx /= rdLen;
          rdy /= rdLen;
          rdz /= rdLen;

          const b = 2 * (rox * rdx + roy * rdy + roz * rdz);
          const c = rox * rox + roy * roy + roz * roz - 1;
          const disc = b * b - 4 * c;

          let lit = false;

          if (disc >= 0) {
            const t = (-b - Math.sqrt(disc)) / 2;
            if (t > 0) {
              const hx = rox + rdx * t;
              const hy = roy + rdy * t;
              const hz = roz + rdz * t;

              const nx1 = hx * cy + hz * sy;
              const ny1 = hy;
              const nz1 = -hx * sy + hz * cy;

              const nx2 = nx1;
              const ny2 = ny1 * cx - nz1 * sx;
              const nz2 = ny1 * sx + nz1 * cx;

              const diff = Math.max(
                0,
                nx2 * LIGHT_DIR.x + ny2 * LIGHT_DIR.y + nz2 * LIGHT_DIR.z,
              );
              const threshold = BAYER_4X4[y % 4][x % 4] / 16 - 0.5;

              if (diff + threshold > 0.5) lit = true;
            }
          }

          const idx = (y * BUFFER_SIZE + x) * 4;
          if (lit) {
            const [r, g, bl] = litColor;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = bl;
            data[idx + 3] = 255;
          } else {
            data[idx] = 0;
            data[idx + 1] = 0;
            data[idx + 2] = 0;
            data[idx + 3] = 0;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <section id="home" className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--accent) 45%, transparent) 0%, color-mix(in oklch, var(--accent) 12%, transparent) 45%, transparent 75%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="relative z-10 aspect-square w-[88vmin] max-w-[680px] touch-none select-none"
        style={{ imageRendering: "pixelated" }}
      />
      <h1 className="pointer-events-none absolute z-30 select-none text-6xl font-bold tracking-tight text-foreground sm:text-8xl md:text-9xl">
        {content.title}
      </h1>
    </section>
  );
}
