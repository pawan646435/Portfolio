"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AppContextValue = {
  hasEntered: boolean;
  setHasEntered: (v: boolean) => void;
  currentRoom: number;
  setCurrentRoom: (room: number) => void;
  audioEnabled: boolean;
  setAudioEnabled: (v: boolean) => void;
  overlayOpen: boolean;
  setOverlayOpen: (v: boolean) => void;
  /** True while the room track is animating between rooms */
  isTransitioning: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

export const ROOM_COUNT = 5;
export const ROOM_TRANSITION_MS = 1200;

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentRoom, setCurrentRoomState] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setCurrentRoom = useCallback((room: number) => {
    const clamped = Math.max(0, Math.min(ROOM_COUNT - 1, room));
    setCurrentRoomState((prev) => {
      if (prev === clamped) return prev;
      setIsTransitioning(true);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(
        () => setIsTransitioning(false),
        ROOM_TRANSITION_MS
      );
      return clamped;
    });
  }, []);

  const value = useMemo(
    () => ({
      hasEntered,
      setHasEntered,
      currentRoom,
      setCurrentRoom,
      audioEnabled,
      setAudioEnabled,
      overlayOpen,
      setOverlayOpen,
      isTransitioning,
    }),
    [hasEntered, currentRoom, setCurrentRoom, audioEnabled, overlayOpen, isTransitioning]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
