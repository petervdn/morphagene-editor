import { useState, useCallback, useEffect, useRef } from "react";
import type { ViewPort } from "../../types/types";
import { animateViewport, easingFunctions } from "../animation/animateViewport";

type UseWaveformZoomProps = {
  audioDuration: number;
  maxZoom?: number;
  animationDuration?: number;
  easingFunction?: keyof typeof easingFunctions;
};

type UseWaveformZoomResult = {
  viewPort: ViewPort;
  zoomLevel: number;
  handleWheel: (e: React.WheelEvent, mouseX: number) => void;
  handleDrag: (deltaX: number, containerWidth: number) => void;
  setZoomLevel: (level: number) => void;
  zoomToRange: (
    start: number,
    end: number,
    options?: {
      duration?: number;
      easing?: keyof typeof easingFunctions;
    }
  ) => void;
};

export function useWaveformZoom({
  audioDuration,
  maxZoom = 50, // Default max zoom is 50x
  animationDuration = 200,
  easingFunction = "easeInOutQuad",
}: UseWaveformZoomProps): UseWaveformZoomResult {
  // Initialize viewport to show the entire audio
  const [viewPort, setViewPort] = useState<ViewPort>({
    from: 0,
    to: audioDuration,
  });

  // Zoom level from 1 (full view) to maxZoom
  const [zoomLevel, setZoomLevel] = useState(1);

  // Reference to the current animation cancellation function
  const currentAnimation = useRef<{ cancel: () => void } | null>(null);

  // Update viewport when audio duration changes
  useEffect(() => {
    setViewPort({
      from: 0,
      to: audioDuration,
    });
    setZoomLevel(1);
  }, [audioDuration]);

  // Calculate the current visible duration
  const visibleDuration = viewPort.to - viewPort.from;

  // Function to zoom to a specific range with animation
  const zoomToRange = useCallback(
    (
      start: number,
      end: number,
      options?: {
        duration?: number;
        easing?: keyof typeof easingFunctions;
      }
    ) => {
      // Cancel any existing animation
      if (currentAnimation.current) {
        currentAnimation.current.cancel();
        currentAnimation.current = null;
      }

      // Ensure the range is valid
      const validStart = Math.max(0, Math.min(start, audioDuration));
      const validEnd = Math.max(validStart, Math.min(end, audioDuration));

      // Calculate the range duration
      // const rangeDuration = validEnd - validStart;

      // Start the animation
      currentAnimation.current = animateViewport({
        startViewPort: viewPort,
        targetViewPort: {
          from: validStart,
          to: validEnd,
        },
        duration: options?.duration ?? animationDuration,
        easing: easingFunctions[options?.easing ?? easingFunction],
        onUpdate: (newViewPort) => {
          setViewPort(newViewPort);

          // Update zoom level based on the current viewport width
          const currentWidth = newViewPort.to - newViewPort.from;
          setZoomLevel(audioDuration / currentWidth);
        },
        onComplete: () => {
          currentAnimation.current = null;
        },
      });
    },
    [viewPort, audioDuration, animationDuration, easingFunction]
  );

  // Handle mouse wheel for zooming
  const handleWheel = useCallback(
    (e: React.WheelEvent, mouseX: number) => {
      // Note: We don't call preventDefault() here because it causes warnings in passive event listeners
      // Instead, we'll handle this at the component level by stopping propagation

      // Cancel any existing animation
      if (currentAnimation.current) {
        currentAnimation.current.cancel();
        currentAnimation.current = null;
      }

      // Get the relative position of the mouse in the viewport (0 to 1)
      const viewPortWidth = viewPort.to - viewPort.from;
      const mouseTimePosition = viewPort.from + mouseX * viewPortWidth;
      const mouseRelativePosition =
        (mouseTimePosition - viewPort.from) / viewPortWidth;

      // Calculate new zoom level
      const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1; // Zoom out or in
      const newZoomLevel = Math.min(
        maxZoom,
        Math.max(1, zoomLevel * zoomDelta)
      );

      // Calculate new viewport duration
      const newDuration = audioDuration / newZoomLevel;

      // Calculate new viewport boundaries, keeping the mouse position as the zoom center
      let newFrom = mouseTimePosition - mouseRelativePosition * newDuration;
      let newTo = newFrom + newDuration;

      // Ensure viewport stays within audio boundaries
      if (newFrom < 0) {
        newFrom = 0;
        newTo = newDuration;
      }

      if (newTo > audioDuration) {
        newTo = audioDuration;
        newFrom = Math.max(0, newTo - newDuration);
      }

      setViewPort({
        from: newFrom,
        to: newTo,
      });

      setZoomLevel(newZoomLevel);

      return true; // Signal that we handled the event
    },
    [viewPort, zoomLevel, audioDuration, maxZoom]
  );

  // Handle dragging for panning
  const handleDrag = useCallback(
    (deltaX: number, containerWidth: number) => {
      // Cancel any existing animation
      if (currentAnimation.current) {
        currentAnimation.current.cancel();
        currentAnimation.current = null;
      }

      // Convert pixel delta to time delta based on current zoom and container width
      // This makes the drag 1:1 with mouse movement
      const viewPortWidth = viewPort.to - viewPort.from;
      const timePerPixel = viewPortWidth / containerWidth;
      const timeDelta = deltaX * timePerPixel;

      // Calculate new viewport boundaries
      let newFrom = viewPort.from - timeDelta;
      let newTo = viewPort.to - timeDelta;

      // Ensure viewport stays within audio boundaries
      if (newFrom < 0) {
        newFrom = 0;
        newTo = visibleDuration;
      }

      if (newTo > audioDuration) {
        newTo = audioDuration;
        newFrom = Math.max(0, newTo - visibleDuration);
      }

      setViewPort({
        from: newFrom,
        to: newTo,
      });
    },
    [viewPort, visibleDuration, audioDuration]
  );

  // Set zoom level directly (for slider)
  const setZoomLevelDirectly = useCallback(
    (level: number) => {
      // Cancel any existing animation
      if (currentAnimation.current) {
        currentAnimation.current.cancel();
        currentAnimation.current = null;
      }

      // Calculate the center of the current viewport
      const center = viewPort.from + (viewPort.to - viewPort.from) / 2;

      // Calculate new duration
      const newDuration = audioDuration / level;

      // Calculate new viewport boundaries, keeping the center point
      let newFrom = center - newDuration / 2;
      let newTo = center + newDuration / 2;

      // Ensure viewport stays within audio boundaries
      if (newFrom < 0) {
        newFrom = 0;
        newTo = newDuration;
      }

      if (newTo > audioDuration) {
        newTo = audioDuration;
        newFrom = Math.max(0, newTo - newDuration);
      }

      setViewPort({
        from: newFrom,
        to: newTo,
      });

      setZoomLevel(level);
    },
    [viewPort, audioDuration]
  );

  return {
    viewPort,
    zoomLevel,
    handleWheel,
    handleDrag,
    setZoomLevel: setZoomLevelDirectly,
    zoomToRange,
  };
}
