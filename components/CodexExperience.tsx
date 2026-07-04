"use client";

import EntryGate from "@/components/gates/EntryGate";
import RoomEngine from "@/components/ui/RoomEngine";
import SpotlightCursor from "@/components/ui/SpotlightCursor";
import AmbientAudio from "@/components/ui/AmbientAudio";
import ShortcutsOverlay from "@/components/ui/ShortcutsOverlay";
import RoomIdentity from "@/components/rooms/RoomIdentity";
import RoomStory from "@/components/rooms/RoomStory";
import RoomWorks from "@/components/rooms/RoomWorks";
import RoomArsenal from "@/components/rooms/RoomArsenal";
import RoomDialogue from "@/components/rooms/RoomDialogue";
import MobileCodex from "@/components/mobile/MobileCodex";
import { useDevice } from "@/lib/hooks";

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
