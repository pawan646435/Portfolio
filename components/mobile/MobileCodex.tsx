"use client";

import dynamic from "next/dynamic";
import MobileEntryGate from "@/components/mobile/MobileEntryGate";
import MobileLayout from "@/components/mobile/MobileLayout";

const MobileAudio = dynamic(() => import("@/components/mobile/MobileAudio"), {
  ssr: false,
});
const MobileRoomIdentity = dynamic(
  () => import("@/components/mobile/rooms/MobileRoomIdentity"),
  { ssr: false }
);
const MobileRoomStory = dynamic(
  () => import("@/components/mobile/rooms/MobileRoomStory"),
  { ssr: false }
);
const MobileRoomWorks = dynamic(
  () => import("@/components/mobile/rooms/MobileRoomWorks"),
  { ssr: false }
);
const MobileRoomArsenal = dynamic(
  () => import("@/components/mobile/rooms/MobileRoomArsenal"),
  { ssr: false }
);
const MobileRoomDialogue = dynamic(
  () => import("@/components/mobile/rooms/MobileRoomDialogue"),
  { ssr: false }
);

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
