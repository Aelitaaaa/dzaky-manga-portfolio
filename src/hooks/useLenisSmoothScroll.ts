import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let globalLenisInstance: Lenis | null = null;

export function stopLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.stop();
  }
}

export function startLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.start();
  }
}

export function useLenisSmoothScroll(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({
      anchors: { offset: -88 },
      lerp: 0.085,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
    });

    globalLenisInstance = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      if (globalLenisInstance === lenis) globalLenisInstance = null;
    };
  }, [enabled]);
}
