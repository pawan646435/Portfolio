"use client";

import { MotionConfig } from "framer-motion";
import { ParticlesProvider as Provider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import type { ReactNode } from "react";
import { AppProvider } from "@/lib/context/AppContext";

async function init(engine: Engine) {
  await loadSlim(engine);
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Provider init={init}>
        <AppProvider>{children}</AppProvider>
      </Provider>
    </MotionConfig>
  );
}
