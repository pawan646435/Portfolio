"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Vector3, type Group } from "three";
import type { Line2 } from "three-stdlib";
import { useReducedMotion } from "@/lib/hooks";
import { spotlight } from "@/lib/spotlight";

const PHI = 1.618033988749;
const B = Math.log(PHI) / (Math.PI / 2);
const TOTAL_TURNS = 3;
const STEPS = 400;

type MiniSpiralProps = {
  scale: number;
  position: [number, number, number];
  rotationSpeed: { x: number; y: number; z: number };
  breatheAmplitude: number;
  opacity: number;
  interactive: boolean;
  activeOpacity: number;
};

function MiniSpiral({
  scale,
  position,
  rotationSpeed,
  breatheAmplitude,
  opacity,
  interactive,
  activeOpacity,
}: MiniSpiralProps) {
  const groupRef = useRef<Group>(null);
  const lineRef = useRef<Line2>(null);
  const glowRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const points = useMemo(() => {
    const totalT = TOTAL_TURNS * Math.PI * 2;
    const pts: Vector3[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const t = (i / STEPS) * totalT;
      const r = 0.15 * Math.pow(Math.E, B * t);
      pts.push(new Vector3(r * Math.cos(t), r * Math.sin(t), (t / totalT) * 0.4 - 0.2));
    }
    return pts;
  }, []);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (!reducedMotion) {
      group.rotation.z += rotationSpeed.z;
      group.rotation.x += rotationSpeed.x;
      group.rotation.y += rotationSpeed.y;
      const breathe = Math.sin(clock.getElapsedTime() * 0.4);
      group.scale.setScalar(scale + breathe * breatheAmplitude);
    } else {
      group.scale.setScalar(scale);
    }

    if (interactive && lineRef.current) {
      const target = spotlight.active ? 1 : 0;
      const rate = 1 - Math.exp(-delta / 1.2);
      glowRef.current += (target - glowRef.current) * rate;
      lineRef.current.material.opacity = opacity + (activeOpacity - opacity) * glowRef.current;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Line ref={lineRef} points={points} color="#C9A84C" transparent opacity={opacity} lineWidth={1.5} />
    </group>
  );
}

export default function GoldenSpiralMini({
  className = "w-50 h-50",
  scale = 0.8,
  position = [0, 0, 0],
  rotationSpeed = { x: 0, y: 0, z: 0.002 },
  breatheAmplitude = 0.04,
  opacity = 0.6,
  interactive = false,
  activeOpacity = 0.6,
  cameraPosition = [0, 0, 5],
  fov = 45,
  dpr = [1, 1],
  pointLightIntensity = 0.8,
  ambientLightIntensity = 0.3,
  ambientColor = "#3D2B00",
  frameloop = "always",
  gl = { antialias: true, alpha: true, powerPreference: "high-performance" },
}: {
  className?: string;
  scale?: number;
  position?: [number, number, number];
  rotationSpeed?: { x: number; y: number; z: number };
  breatheAmplitude?: number;
  opacity?: number;
  interactive?: boolean;
  activeOpacity?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
  dpr?: [number, number];
  pointLightIntensity?: number;
  ambientLightIntensity?: number;
  ambientColor?: string;
  frameloop?: "always" | "demand";
  gl?: { antialias: boolean; alpha: boolean; powerPreference: "high-performance" | "low-power" };
}) {
  return (
    <div className={className} style={{ touchAction: "pan-y" }}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={dpr}
        performance={{ min: 0.5 }}
        frameloop={frameloop}
        gl={gl}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <pointLight color="#FFD700" intensity={pointLightIntensity} position={[2, 2, 2]} />
        <ambientLight color={ambientColor} intensity={ambientLightIntensity} />
        <MiniSpiral
          scale={scale}
          position={position}
          rotationSpeed={rotationSpeed}
          breatheAmplitude={breatheAmplitude}
          opacity={opacity}
          interactive={interactive}
          activeOpacity={activeOpacity}
        />
      </Canvas>
    </div>
  );
}
