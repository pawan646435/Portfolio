'use client';

import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // 0 to 1
  normalizedY: number; // 0 to 1
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const updatePosition = () => {
      const { x, y } = mouseRef.current;
      setPosition({
        x,
        y,
        normalizedX: x / window.innerWidth,
        normalizedY: y / window.innerHeight,
      });
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return position;
}
