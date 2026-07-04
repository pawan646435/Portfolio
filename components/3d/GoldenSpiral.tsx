"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Color, Vector3, EdgesGeometry, PlaneGeometry, type Group, type Mesh, type MeshStandardMaterial } from "three";
import { useReducedMotion } from "@/lib/hooks";

const PHI = 1.618033988749;
const B = Math.log(PHI) / (Math.PI / 2);

const COLOR_INNER = new Color("#6B6355");
const COLOR_MID = new Color("#C9A84C");
const COLOR_OUTER = new Color("#FFD700");

/** Point on the golden spiral r = a·e^(bθ) at parameter t (in radians), tilted slightly in z. */
function spiralPoint(t: number, totalT: number, radiusScale: number) {
  const r = radiusScale * Math.pow(Math.E, B * t);
  return new Vector3(r * Math.cos(t), r * Math.sin(t), (t / totalT) * 0.4 - 0.2);
}

function useSpiralPoints(totalTurns: number, steps: number, radiusScale = 0.15) {
  return useMemo(() => {
    const totalT = totalTurns * Math.PI * 2;
    const points: Vector3[] = [];
    for (let i = 0; i <= steps; i++) {
      points.push(spiralPoint((i / steps) * totalT, totalT, radiusScale));
    }
    return points;
  }, [totalTurns, steps, radiusScale]);
}

function useGradientColors(count: number) {
  return useMemo(() => {
    const colors: Color[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const c = new Color();
      if (t < 0.5) c.lerpColors(COLOR_INNER, COLOR_MID, t * 2);
      else c.lerpColors(COLOR_MID, COLOR_OUTER, (t - 0.5) * 2);
      colors.push(c);
    }
    return colors;
  }, [count]);
}

function FibonacciDots({ totalTurns, radiusScale }: { totalTurns: number; radiusScale: number }) {
  const reducedMotion = useReducedMotion();
  const materials = useRef<(MeshStandardMaterial | null)[]>([]);
  const totalT = totalTurns * Math.PI * 2;

  const dots = useMemo(() => {
    const halfTurns = Math.round(totalTurns * 2);
    return Array.from({ length: halfTurns }, (_, i) => ({
      pos: spiralPoint(((i + 1) * 0.5) * Math.PI * 2, totalT, radiusScale),
      radius: 0.02 + i * 0.008,
    }));
  }, [totalTurns, radiusScale, totalT]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    materials.current.forEach((mat, i) => {
      if (!mat) return;
      mat.emissiveIntensity = reducedMotion ? 0.15 : 0.15 + Math.sin(t * 1.2 + i * 0.8) * 0.1;
    });
  });

  return (
    <>
      {dots.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[d.radius, 12, 12]} />
          <meshStandardMaterial
            ref={(el) => {
              materials.current[i] = el;
            }}
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.15}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </>
  );
}

const GOLDEN_RECTANGLES = [
  { w: 1.0, h: 0.618, z: -0.5, opacity: 0.04 },
  { w: 1.618, h: 1.0, z: -0.8, opacity: 0.02 },
  { w: 2.618, h: 1.618, z: -1.2, opacity: 0.01 },
];

function GoldenRectangles() {
  const groupRef = useRef<Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame(() => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.z -= 0.0008;
  });

  const edges = useMemo(
    () => GOLDEN_RECTANGLES.map((r) => new EdgesGeometry(new PlaneGeometry(r.w, r.h))),
    []
  );

  return (
    <group ref={groupRef}>
      {GOLDEN_RECTANGLES.map((r, i) => (
        <lineSegments key={i} geometry={edges[i]} position={[0, 0, r.z]}>
          <lineBasicMaterial color="#C9A84C" transparent opacity={r.opacity} />
        </lineSegments>
      ))}
    </group>
  );
}

function MeasurementArc() {
  const meshRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(() => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.z += 0.0005;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2.2, 0.004, 8, 64, Math.PI * 0.75]} />
      <meshBasicMaterial color="#C9A84C" transparent opacity={0.04} />
    </mesh>
  );
}

function SpiralGroup({ interactive }: { interactive: boolean }) {
  const groupRef = useRef<Group>(null);
  const reducedMotion = useReducedMotion();
  const { size } = useThree();
  const isDesktop = interactive && size.width > 768;

  const totalTurns = 4;
  const points = useSpiralPoints(totalTurns, 800);
  const colors = useGradientColors(points.length);

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDesktop) return;
    function handlePointerMove(e: PointerEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTarget.current = { x: x * 0.15, y: y * 0.15 };
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isDesktop]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    if (!reducedMotion) {
      group.rotation.z += 0.0015;
      group.rotation.x += 0.0004;
      group.rotation.y += 0.0006;
      const breathe = Math.sin(clock.getElapsedTime() * 0.4);
      group.scale.setScalar(2.6 + breathe * 0.04);
    } else {
      group.scale.setScalar(2.6);
    }

    if (isDesktop) {
      mouseCurrent.current.x += (mouseTarget.current.y - mouseCurrent.current.x) * 0.05;
      mouseCurrent.current.y += (mouseTarget.current.x - mouseCurrent.current.y) * 0.05;
      group.rotation.x += mouseCurrent.current.x * 0.01;
      group.rotation.y += mouseCurrent.current.y * 0.01;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <group scale={1.02}>
          <Line points={points} color="#C9A84C" transparent opacity={0.02} lineWidth={1.5} />
        </group>
        <Line points={points} vertexColors={colors} transparent opacity={0.18} lineWidth={1.5} />
        <FibonacciDots totalTurns={totalTurns} radiusScale={0.15} />
      </group>
      <GoldenRectangles />
      <MeasurementArc />
    </>
  );
}

export default function GoldenSpiral({
  className = "w-full h-62.5 md:h-125",
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ touchAction: "pan-y" }}
      data-cursor={interactive ? "globe" : undefined}
    >
      <span
        aria-hidden="true"
        className="font-classical absolute pointer-events-none select-none"
        style={{ top: "4%", right: "6%", fontSize: "3rem", color: "rgba(201,168,76,0.06)" }}
      >
        φ
      </span>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <pointLight color="#FFD700" intensity={0.3} position={[2, 3, 3]} />
        <pointLight color="#C9A84C" intensity={0.4} position={[-3, -2, 2]} />
        <ambientLight color="#3D2B00" intensity={0.06} />
        <SpiralGroup interactive={interactive} />
      </Canvas>
    </div>
  );
}
