"use client";

import MobileEntryGate from "@/components/mobile/MobileEntryGate";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileAudio from "@/components/mobile/MobileAudio";
import MobileRoomIdentity from "@/components/mobile/rooms/MobileRoomIdentity";
import MobileRoomStory from "@/components/mobile/rooms/MobileRoomStory";
import MobileRoomWorks from "@/components/mobile/rooms/MobileRoomWorks";
import MobileRoomArsenal from "@/components/mobile/rooms/MobileRoomArsenal";
import MobileRoomDialogue from "@/components/mobile/rooms/MobileRoomDialogue";

/**
 * The mobile codex — a vertical, page-by-page reading of the portfolio.
 * An entirely separate component tree: desktop components are never
 * mounted here, and nothing here mounts on desktop.
 */
export default function MobileCodex() {
  return (
    <>
      <a
        href="#room-0"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-bg-base focus:text-accent-gold focus:p-3"
      >
        Skip to content
      </a>
      <MobileEntryGate />
      <MobileLayout>
        <MobileRoomIdentity />
        <MobileRoomStory />
        <MobileRoomWorks />
        <MobileRoomArsenal />
        <MobileRoomDialogue />
      </MobileLayout>
      <MobileAudio />
    </>
  );
}
