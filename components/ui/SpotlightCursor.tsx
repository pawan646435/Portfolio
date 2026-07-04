"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/lib/context/AppContext";
import { spotlight, spotlightProximity } from "@/lib/spotlight";
import { useReducedMotion } from "@/lib/hooks";

const REVEAL_REFRESH_MS = 800;

/**
 * The torch-light layer: a large gold radial gradient following the cursor,
 * plus the reveal loop that lifts [data-reveal] elements out of darkness.
 *
 * data-reveal attributes:
 *   data-reveal            — opt in (value ignored)
 *   data-reveal-base="0.12" — opacity in darkness
 *   data-reveal-max="1"     — opacity under full light
 *   data-reveal-radius="250" — reveal falloff radius in px
 */
export default function SpotlightCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const { hasEntered, isTransitioning } = useApp();
  const reducedMotion = useReducedMotion();

  // Dim the torch while walking between rooms
  useEffect(() => {
    const el = layerRef.current;
    if (el) el.style.opacity = isTransitioning ? "0.3" : "1";
  }, [isTransitioning]);

  // Torch ignition: radius 30px -> full size over 2s on first entry
  useEffect(() => {
    if (!hasEntered || reducedMotion) return;
    const el = layerRef.current;
    if (!el) return;
    const fullRadius =
      typeof navigator !== "undefined" && navigator.hardwareConcurrency < 4 ? 200 : 280;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2000);
      const eased = 1 - Math.pow(1 - t, 3);
      el.style.setProperty("--spot-r", `${30 + (fullRadius - 30) * eased}px`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasEntered, reducedMotion]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const layer = layerRef.current;

    // Coarse pointers / reduced motion: no darkness reveal — everything visible
    if (!finePointer || reducedMotion) {
      const showAll = () => {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) => {
            el.style.opacity = el.dataset.revealMax ?? "1";
          });
      };
      showAll();
      const interval = setInterval(showAll, REVEAL_REFRESH_MS);
      return () => clearInterval(interval);
    }

    let nodes: HTMLElement[] = [];
    const collect = () => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    };
    collect();
    const interval = setInterval(collect, REVEAL_REFRESH_MS);

    const onMove = (e: MouseEvent) => {
      spotlight.x = e.clientX;
      spotlight.y = e.clientY;
      spotlight.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const tick = () => {
      if (layer && spotlight.active) {
        layer.style.setProperty("--cx", `${spotlight.x}px`);
        layer.style.setProperty("--cy", `${spotlight.y}px`);
      }
      for (const el of nodes) {
        if (!el.isConnected) continue;
        const base = parseFloat(el.dataset.revealBase ?? "0.12");
        const max = parseFloat(el.dataset.revealMax ?? "1");
        const radius = parseFloat(el.dataset.revealRadius ?? "250");
        const p = spotlightProximity(el.getBoundingClientRect(), radius);
        el.style.opacity = String(base + (max - base) * p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return <div ref={layerRef} className="spotlight-layer" aria-hidden="true" />;
}
