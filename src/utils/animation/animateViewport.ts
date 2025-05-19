import type { ViewPort } from "../../types/types";

type EasingFunction = (t: number) => number;

// Common easing functions
export const easingFunctions = {
  // Linear - no easing
  linear: (t: number): number => t,
  
  // Quadratic
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => (--t) * t * t + 1,
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Elastic
  easeOutElastic: (t: number): number => {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
  }
};

interface AnimateViewportOptions {
  startViewPort: ViewPort;
  targetViewPort: ViewPort;
  duration?: number; // in milliseconds
  easing?: EasingFunction;
  onUpdate: (viewPort: ViewPort) => void;
  onComplete?: () => void;
}

/**
 * Animates a viewport transition from start to target
 */
export function animateViewport({
  startViewPort,
  targetViewPort,
  duration = 500, // default 500ms
  easing = easingFunctions.easeOutCubic, // default easing
  onUpdate,
  onComplete
}: AnimateViewportOptions): { cancel: () => void } {
  const startTime = performance.now();
  const startFrom = startViewPort.from;
  const startTo = startViewPort.to;
  const targetFrom = targetViewPort.from;
  const targetTo = targetViewPort.to;
  
  let animationFrameId: number;
  let isCancelled = false;
  
  const animate = (currentTime: number) => {
    if (isCancelled) return;
    
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    
    const currentFrom = startFrom + (targetFrom - startFrom) * easedProgress;
    const currentTo = startTo + (targetTo - startTo) * easedProgress;
    
    onUpdate({
      from: currentFrom,
      to: currentTo
    });
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };
  
  animationFrameId = requestAnimationFrame(animate);
  
  // Return a function to cancel the animation
  return {
    cancel: () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
    }
  };
}
