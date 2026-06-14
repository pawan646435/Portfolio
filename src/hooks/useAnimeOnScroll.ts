'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseAnimeOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useAnimeOnScroll<T extends HTMLElement>(
  options: UseAnimeOnScrollOptions = {}
) {
  const { threshold = 0.2, rootMargin = '0px', once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (once && hasTriggered.current) return;
          hasTriggered.current = true;
          setIsVisible(true);
        } else if (!once) {
          setIsVisible(false);
        }
      });
    },
    [once]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, threshold, rootMargin]);

  return { ref, isVisible };
}
