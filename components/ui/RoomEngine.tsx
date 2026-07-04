"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rooms } from "@/lib/data";
import { ROOM_COUNT, ROOM_TRANSITION_MS, useApp } from "@/lib/context/AppContext";
import { useRoomPreloader } from "@/lib/hooks";

const NAV_THROTTLE_MS = 1200;
const SWIPE_THRESHOLD_PX = 50;

export default function RoomEngine({ children }: { children: ReactNode[] }) {
  const {
    hasEntered,
    currentRoom,
    setCurrentRoom,
    overlayOpen,
    isTransitioning,
  } = useApp();
  const lastNav = useRef(0);
  const [sweepDir, setSweepDir] = useState<"left" | "right" | null>(null);
  const [showKeys, setShowKeys] = useState(true);
  const keysTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useRoomPreloader(currentRoom);

  const navigate = useCallback(
    (target: number) => {
      const now = performance.now();
      if (now - lastNav.current < NAV_THROTTLE_MS) return;
      if (target < 0 || target >= ROOM_COUNT || target === currentRoom) return;
      lastNav.current = now;
      setSweepDir(target > currentRoom ? "right" : "left");
      setCurrentRoom(target);
      window.dispatchEvent(new CustomEvent("roomchange", { detail: target }));
    },
    [currentRoom, setCurrentRoom]
  );

  // Wheel navigation
  useEffect(() => {
    if (!hasEntered) return;
    const onWheel = (e: WheelEvent) => {
      if (overlayOpen) return;
      // ignore horizontal trackpad noise & tiny deltas
      if (Math.abs(e.deltaY) < 10) return;
      navigate(currentRoom + (e.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [hasEntered, overlayOpen, currentRoom, navigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!hasEntered) return;
    const onKey = (e: KeyboardEvent) => {
      if (overlayOpen) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        navigate(currentRoom + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        navigate(currentRoom - 1);
      } else {
        return;
      }
      setShowKeys(true);
      if (keysTimer.current) clearTimeout(keysTimer.current);
      keysTimer.current = setTimeout(() => setShowKeys(false), 4000);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasEntered, overlayOpen, currentRoom, navigate]);

  // Hide the shortcut hint after 4s of stillness
  useEffect(() => {
    keysTimer.current = setTimeout(() => setShowKeys(false), 4000);
    return () => {
      if (keysTimer.current) clearTimeout(keysTimer.current);
    };
  }, []);

  // Swipe navigation
  useEffect(() => {
    if (!hasEntered) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      if (overlayOpen) return;
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      navigate(currentRoom + (delta < 0 ? 1 : -1));
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [hasEntered, overlayOpen, currentRoom, navigate]);

  // Clear the sweep line after its animation
  useEffect(() => {
    if (!sweepDir) return;
    const t = setTimeout(() => setSweepDir(null), ROOM_TRANSITION_MS / 2);
    return () => clearTimeout(t);
  }, [sweepDir]);

  return (
    <main className="rooms-container" role="main" aria-label="Portfolio rooms">
      <div
        className="rooms-track"
        data-transitioning={isTransitioning}
        style={{ transform: `translateX(-${currentRoom * 100}vw)` }}
      >
        {children.map((child, i) => (
          <section
            key={rooms[i]}
            id={`room-${i}`}
            className="room"
            aria-label={rooms[i]}
            aria-hidden={currentRoom !== i}
          >
            {/* Lazy-mount: only the current room and its neighbours */}
            <div className="room-inner">
              {Math.abs(currentRoom - i) <= 1 ? child : null}
            </div>
          </section>
        ))}
      </div>

      {sweepDir && <div className="room-sweep" data-dir={sweepDir} aria-hidden="true" />}

      {/* Room indicator dots */}
      <nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] flex flex-col items-center gap-2"
        aria-label="Room navigation"
      >
        <div className="flex items-center gap-3">
          {rooms.map((name, i) => (
            <button
              key={name}
              className="room-dot"
              data-active={currentRoom === i}
              aria-label={`Go to ${name}`}
              aria-current={currentRoom === i}
              onClick={() => navigate(i)}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentRoom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-jetbrains-mono text-[0.65rem] tracking-[0.15em] uppercase text-text-muted"
          >
            {rooms[currentRoom]}
          </motion.span>
        </AnimatePresence>
      </nav>

      {/* Prev / next rails */}
      <AnimatePresence>
        {currentRoom > 0 && (
          <motion.button
            key="prev"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="room-rail left-2 -translate-y-1/2"
            onClick={() => navigate(currentRoom - 1)}
            aria-label="Previous room"
          >
            ← PREV
          </motion.button>
        )}
        {currentRoom < ROOM_COUNT - 1 && (
          <motion.button
            key="next"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="room-rail right-2 -translate-y-1/2"
            onClick={() => navigate(currentRoom + 1)}
            aria-label="Next room"
          >
            NEXT →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      <AnimatePresence>
        {showKeys && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-6 right-6 z-[500] font-jetbrains-mono text-[0.6rem]"
            style={{ color: "rgba(201,168,76,0.25)" }}
          >
            ← → to navigate · ? for shortcuts
          </motion.span>
        )}
      </AnimatePresence>
    </main>
  );
}
