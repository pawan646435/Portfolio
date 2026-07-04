"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks";

const PARTICLE_COLORS = ["#C9A84C", "#F0C060", "#FFD700"];
const MAX_PARTICLES = 20;
const VELOCITY_THRESHOLD = 8;
const SPAWN_THROTTLE_MS = 40;
const MAX_TRAVEL = 15;
const RING_LERP = 0.12;
const PARTICLE_DURATION_MS = 450;

export default function CustomCursor() {
  const enabled = useMediaQuery("(pointer: fine)");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    const last = { x: mouse.x, y: mouse.y };
    let lastSpawn = 0;
    const particleQueue: HTMLDivElement[] = [];

    function spawnParticle(x: number, y: number, dx: number, dy: number) {
      const container = particlesRef.current;
      if (!container) return;

      let travelX = -dx * 0.6 + (Math.random() - 0.5) * 8;
      let travelY = -dy * 0.6 + (Math.random() - 0.5) * 8;
      const mag = Math.sqrt(travelX * travelX + travelY * travelY) || 1;
      if (mag > MAX_TRAVEL) {
        travelX = (travelX / mag) * MAX_TRAVEL;
        travelY = (travelY / mag) * MAX_TRAVEL;
      }

      const size = 2 + Math.random() * 2;
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

      const el = document.createElement("div");
      el.className = "cursor-particle";
      el.style.left = `${x + (Math.random() - 0.5) * 8}px`;
      el.style.top = `${y + (Math.random() - 0.5) * 8}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = color;
      el.style.setProperty("--tx", `${travelX}px`);
      el.style.setProperty("--ty", `${travelY}px`);
      el.style.animationDuration = `${PARTICLE_DURATION_MS}ms`;

      const cleanup = () => {
        el.remove();
        const idx = particleQueue.indexOf(el);
        if (idx !== -1) particleQueue.splice(idx, 1);
      };
      el.addEventListener("animationend", cleanup);

      container.appendChild(el);
      particleQueue.push(el);
      if (particleQueue.length > MAX_PARTICLES) {
        particleQueue.shift()?.remove();
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!reducedMotion) {
        const now = performance.now();
        const dx = mouse.x - last.x;
        const dy = mouse.y - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > VELOCITY_THRESHOLD && now - lastSpawn > SPAWN_THROTTLE_MS) {
          spawnParticle(mouse.x, mouse.y, dx, dy);
          lastSpawn = now;
        }
      }
      last.x = mouse.x;
      last.y = mouse.y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    }

    function resolveState(target: EventTarget | null): string {
      if (!(target instanceof Element)) return "default";
      if (target.closest('[data-cursor="view"]')) return "view";
      if (target.closest('[data-cursor="globe"]')) return "globe";
      if (target.closest('[data-cursor="text"]')) return "text";
      if (target.closest("a, button, input, textarea, select, [role='button']")) return "link";
      return "default";
    }

    let currentState = "default";
    function handleMouseOver(e: MouseEvent) {
      const state = resolveState(e.target);
      if (state === currentState) return;
      currentState = state;
      dotRef.current?.setAttribute("data-state", state);
      ringRef.current?.setAttribute("data-state", state);
    }

    function handleMouseDown() {
      dotRef.current?.setAttribute("data-pressed", "true");
      ringRef.current?.setAttribute("data-pressed", "true");
    }
    function handleMouseUp() {
      dotRef.current?.removeAttribute("data-pressed");
      ringRef.current?.removeAttribute("data-pressed");
    }

    function handleMouseLeaveDoc() {
      dotRef.current?.setAttribute("data-hidden", "true");
      ringRef.current?.setAttribute("data-hidden", "true");
    }
    function handleMouseEnterDoc() {
      dotRef.current?.removeAttribute("data-hidden");
      ringRef.current?.removeAttribute("data-hidden");
    }

    let rafId: number;
    function tick() {
      ring.x += (mouse.x - ring.x) * RING_LERP;
      ring.y += (mouse.y - ring.y) * RING_LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);
    document.addEventListener("mouseenter", handleMouseEnterDoc);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      document.removeEventListener("mouseenter", handleMouseEnterDoc);
      cancelAnimationFrame(rafId);
      particleQueue.forEach((el) => el.remove());
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} id="custom-cursor-dot" data-state="default">
        <div className="cursor-dot-inner" />
      </div>
      <div ref={ringRef} id="custom-cursor-ring" data-state="default">
        <div className="cursor-ring-inner">
          <span className="cursor-ring-text">View →</span>
        </div>
      </div>
      <div ref={particlesRef} id="cursor-particles" />
    </>
  );
}
