"use client";

import dynamic from "next/dynamic";
import EntryGate from "@/components/gates/EntryGate";
import RoomEngine from "@/components/ui/RoomEngine";
import ShortcutsOverlay from "@/components/ui/ShortcutsOverlay";
import { useDevice } from "@/lib/hooks";

const SpotlightCursor = dynamic(() => import("@/components/ui/SpotlightCursor"), {
  ssr: false,
});
const AmbientAudio = dynamic(() => import("@/components/ui/AmbientAudio"), {
  ssr: false,
});
const MobileCodex = dynamic(() => import("@/components/mobile/MobileCodex"), {
  ssr: false,
});

const RoomIdentity = dynamic(() => import("@/components/rooms/RoomIdentity"), {
  ssr: false,
});
const RoomStory = dynamic(() => import("@/components/rooms/RoomStory"), {
  ssr: false,
});
const RoomWorks = dynamic(() => import("@/components/rooms/RoomWorks"), {
  ssr: false,
});
const RoomArsenal = dynamic(() => import("@/components/rooms/RoomArsenal"), {
  ssr: false,
});
const RoomDialogue = dynamic(() => import("@/components/rooms/RoomDialogue"), {
  ssr: false,
});

/** Blank #080808 frame shown for the single tick before device detection. */
function LoadingGate() {
  return <div className="fixed inset-0 bg-bg-base" />;
}

export default function CodexExperience() {
  const { isMobile, isLoaded } = useDevice();

  if (!isLoaded) return <LoadingGate />;
  if (isMobile) return <MobileCodex />;

  return (
    <>
      <a
        href="#room-0"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-bg-base focus:text-accent-gold focus:p-3"
      >
        Skip to content
      </a>
      <SpotlightCursor />
      <EntryGate />
      <RoomEngine>
        <RoomIdentity />
        <RoomStory />
        <RoomWorks />
        <RoomArsenal />
        <RoomDialogue />
      </RoomEngine>
      <AmbientAudio />
      <ShortcutsOverlay />
    </>
  );
}
