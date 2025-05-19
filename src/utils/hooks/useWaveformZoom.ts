import { useState, useCallback, useEffect } from "react";
import type { ViewPort } from "../../types/types";

type UseWaveformZoomProps = {
  audioDuration: number;
  maxZoom?: number;
};

type UseWaveformZoomResult = {
  viewPort: ViewPort;
  zoomLevel: number;
  handleWheel: (e: React.WheelEvent, mouseX: number) => void;
  handleDrag: (deltaX: number) => void;
  setZoomLevel: (level: number) => void;
};

export function useWaveformZoom({
  audioDuration,
  maxZoom = 50, // Default max zoom is 50x
}: UseWaveformZoomProps): UseWaveformZoomResult {
  // Initialize viewport to show the entire audio
  const [viewPort, setViewPort] = useState<ViewPort>({
    from: 0,
    to: audioDuration,
  });
  
  // Zoom level from 1 (full view) to maxZoom
  const [zoomLevel, setZoomLevel] = useState(1);
  
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
  
  // Handle mouse wheel for zooming
  const handleWheel = useCallback(
    (e: React.WheelEvent, mouseX: number) => {
      // Note: We don't call preventDefault() here because it causes warnings in passive event listeners
      // Instead, we'll handle this at the component level by stopping propagation
      
      // Get the relative position of the mouse in the viewport (0 to 1)
      const viewPortWidth = viewPort.to - viewPort.from;
      const mouseTimePosition = viewPort.from + (mouseX * viewPortWidth);
      const mouseRelativePosition = (mouseTimePosition - viewPort.from) / viewPortWidth;
      
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
  };
}
