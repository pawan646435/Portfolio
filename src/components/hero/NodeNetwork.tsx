'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

// Generate points that form the text "PAWAN KUMAR"
function generateTextPoints(
  text: string,
  width: number,
  height: number,
  fontSize: number
): { x: number; y: number }[] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.floor(fontSize)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  const imageData = ctx.getImageData(0, 0, width, height);
  const points: { x: number; y: number }[] = [];
  const gap = 3; // Finer sampling for higher density outline

  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const i = (y * width + x) * 4;
      if (imageData.data[i + 3] > 128) {
        points.push({ x, y });
      }
    }
  }

  return points;
}

interface Node {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface NodeNetworkProps {
  onComplete: () => void;
  onFadeComplete: () => void;
  phase: 'network' | 'content' | 'done';
}

export default function NodeNetwork({
  onComplete,
  onFadeComplete,
  phase,
}: NodeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const phaseRef = useRef<'scatter' | 'converge' | 'done'>('scatter');
  const progressRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const completedRef = useRef(false);
  
  // Track phase prop via ref to access latest value in render loop
  const phasePropRef = useRef(phase);
  useEffect(() => {
    phasePropRef.current = phase;
  }, [phase]);

  // Track initial fade-in and post-morph dissolve progress
  const canvasAlphaRef = useRef(0);
  const fadeProgressRef = useRef(1);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const isMobile = w < 768;
    const fontSize = Math.floor(
      isMobile 
        ? Math.min(44, w / 8) 
        : w < 1024 
        ? Math.min(80, w / 10) 
        : Math.min(140, w / 11)
    );
    const numNodes = isMobile ? 180 : w < 1024 ? 350 : 600;

    // Generate target positions from text
    const textPoints = generateTextPoints('PAWAN KUMAR', w, h, fontSize);

    // Create nodes scattered randomly, with targets from text points
    nodesRef.current = Array.from({ length: numNodes }, (_, i) => {
      const target =
        textPoints.length > 0
          ? textPoints[i % textPoints.length]
          : { x: w / 2, y: h / 2 };

      return {
        x: Math.random() * w,
        y: Math.random() * h,
        targetX: target.x,
        targetY: target.y,
        originX: Math.random() * w,
        originY: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.3,
      };
    });

    setIsReady(true);
  }, []);

  useEffect(() => {
    init();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Wait 1s floating, then converge
    const timer = setTimeout(() => {
      if (nodesRef.current.length > 0) {
        nodesRef.current.forEach((node) => {
          node.originX = node.x;
          node.originY = node.y;
        });
      }
      phaseRef.current = 'converge';
    }, 1000);

    const renderFrame = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const internalPhase = phaseRef.current;
      const parentPhase = phasePropRef.current;

      // 1. Initial fade-in of canvas
      if (canvasAlphaRef.current < 1) {
        canvasAlphaRef.current = Math.min(canvasAlphaRef.current + 0.02, 1);
      }

      // 2. Parent-phase-triggered dissolve fade-out
      if (parentPhase === 'content') {
        fadeProgressRef.current = Math.max(fadeProgressRef.current - 0.02, 0);
      }

      if (internalPhase === 'converge') {
        progressRef.current = Math.min(progressRef.current + 0.008, 1);
      }

      const progress = progressRef.current;
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const globalAlpha = canvasAlphaRef.current * fadeProgressRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (internalPhase === 'scatter') {
          // Random floating
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
        } else if (internalPhase === 'converge') {
          // Converge toward text target
          node.x = node.originX + (node.targetX - node.originX) * ease;
          node.y = node.originY + (node.targetY - node.originY) * ease;
        }

        // Dissolve movement: if parentPhase is 'content', drift with low velocity
        if (parentPhase === 'content') {
          node.x += node.vx * 0.4;
          node.y += node.vy * 0.4;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        const finalNodeOpacity = node.opacity * (0.3 + ease * 0.7) * globalAlpha;
        ctx.fillStyle = `rgba(79, 140, 255, ${finalNodeOpacity})`;
        ctx.fill();

        // Draw connections (limited for performance)
        if (i < nodes.length - 1) {
          const maxConnections = 3;
          let connections = 0;
          for (let j = i + 1; j < nodes.length && connections < maxConnections; j++) {
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distSq = dx * dx + dy * dy;
            const maxDist = internalPhase === 'scatter' ? 100 : 30 + (1 - ease) * 70;

            if (distSq < maxDist * maxDist) {
              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist / maxDist) * 0.15 * globalAlpha;
              if (alpha > 0) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(79, 140, 255, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                connections++;
              }
            }
          }
        }
      }

      // Check if done with converge
      if (progress >= 1 && !completedRef.current) {
        completedRef.current = true;
        // Hold for 1.5 seconds, then morph (onComplete)
        setTimeout(() => {
          onComplete();
        }, 1500);
      }

      // Check if dissolve is complete
      if (parentPhase === 'content' && fadeProgressRef.current <= 0) {
        phaseRef.current = 'done';
        onFadeComplete();
        return; // Stop animation loop
      }

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    animationRef.current = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timer);
    };
  }, [init, onComplete, onFadeComplete, isReady]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10"
      aria-hidden="true"
    />
  );
}
