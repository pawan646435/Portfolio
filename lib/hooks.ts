"use client";

import { useEffect, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMedia(REDUCED_MOTION_QUERY),
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

const MOBILE_QUERY = "(max-width: 768px)";
const TOUCH_QUERY = "(pointer: coarse)";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}

const emptySubscribe = () => () => {};

/**
 * Device detection for the desktop/mobile component-tree split.
 * `isLoaded` guards against hydration flicker — render nothing until
 * the client has measured the real viewport.
 */
export function useDevice() {
  const isMobile = useSyncExternalStore(
    subscribeMedia(MOBILE_QUERY),
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
  const isTouch = useSyncExternalStore(
    subscribeMedia(TOUCH_QUERY),
    () => window.matchMedia(TOUCH_QUERY).matches,
    () => false
  );
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return { isMobile, isTouch, isLoaded };
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false
  );
}

const ROOM_IMPORTS = [
  () => import("@/components/rooms/RoomIdentity"),
  () => import("@/components/rooms/RoomStory"),
  () => import("@/components/rooms/RoomWorks"),
  () => import("@/components/rooms/RoomArsenal"),
  () => import("@/components/rooms/RoomDialogue"),
];

/** Warms the chunk cache for the current room and its immediate neighbours. */
export function useRoomPreloader(currentRoom: number) {
  useEffect(() => {
    for (const i of [currentRoom - 1, currentRoom, currentRoom + 1]) {
      ROOM_IMPORTS[i]?.();
    }
  }, [currentRoom]);
}
