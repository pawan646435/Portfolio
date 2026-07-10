"use client";

import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { ParticlesProvider as Provider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import type { ReactNode } from "react";
import { AppProvider } from "@/lib/context/AppContext";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const ChatWidget = dynamic(() => import("@/components/ui/ChatWidget"), {
  ssr: false,
});

async function init(engine: Engine) {
  await loadSlim(engine);
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Provider init={init}>
        <AppProvider>
          <CustomCursor />
          {children}
          <ChatWidget />
        </AppProvider>
      </Provider>
    </MotionConfig>
  );
}
