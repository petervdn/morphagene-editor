import {
  useCallback,
  useState,
  useRef,
  type MouseEvent,
  type WheelEvent,
  type ReactElement,
  useEffect,
} from "react";
import type { Size, ViewPort } from "../../../types/types";

type Props = {
  viewPort: ViewPort;
  size: Size;
  onShiftClick: (timeInSeconds: number) => void;
  onWheel?: (e: WheelEvent<HTMLDivElement>, mouseX: number) => boolean | void;
  onDrag?: (deltaX: number, containerWidth: number) => void;
};

export function InteractionLayer({
  viewPort,
  size,
  onShiftClick,
  onWheel,
  onDrag,
}: Props): ReactElement {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const interactionRef = useRef<HTMLDivElement>(null);

  // Handle keyboard events for the entire document
  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Shift") {
        setIsShiftPressed(true);
      } else if (key === "Alt") {
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = ({ key }: KeyboardEvent) => {
      if (key === "Shift") {
        setIsShiftPressed(false);
      } else if (key === "Alt") {
        setIsAltPressed(false);
        // Stop dragging if Alt is released during a drag operation
        if (isDragging) {
          setIsDragging(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isDragging]);

  // Handle mouse events for dragging
  useEffect(() => {
    if (!interactionRef.current || !onDrag) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - lastX;
      setLastX(e.clientX);
      
      if (deltaX !== 0 && interactionRef.current) {
        const width = interactionRef.current.clientWidth;
        onDrag(deltaX, width);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, lastX, onDrag]);

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // If shift is pressed, prevent selection behavior
      if (e.shiftKey) {
        e.preventDefault();
        return;
      }
      
      // Only start dragging if Alt is pressed and onDrag is provided
      if (!onDrag || !(e.altKey || isAltPressed)) return;
      
      // Prevent default browser behavior when Alt+clicking
      e.preventDefault();
      
      setIsDragging(true);
      setLastX(e.clientX);
    },
    [onDrag, isAltPressed]
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // Only handle shift+click and prevent during dragging
      if (!e.shiftKey || isDragging) return;
      
      // Prevent the default selection behavior when shift+clicking
      e.preventDefault();
      
      // Stop propagation to prevent any parent handlers from being triggered
      e.stopPropagation();

      // Calculate the time based on the click position
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const xRatio = x / size.width;

      // Calculate the time in seconds based on the viewport
      const timeRange = viewPort.to - viewPort.from;
      const timeInSeconds = viewPort.from + timeRange * xRatio;

      // Call the callback with the calculated time
      onShiftClick(timeInSeconds);
    },
    [viewPort, size, onShiftClick, isDragging]
  );

  const handleWheelEvent = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      if (!onWheel) return;
      
      // Always stop propagation and prevent default for wheel events
      // This ensures the page doesn't scroll when zooming
      e.stopPropagation();
      
      // Try to prevent default, but this might not work in all browsers due to passive listeners
      if (e.cancelable) {
        e.preventDefault();
      }
      
      // Calculate the mouse X position relative to the container
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width;
      
      // Call the wheel handler
      onWheel(e, mouseX);
      
      // Return false to prevent default in older browsers
      return false;
    },
    [onWheel]
  );

  return (
    <div
      ref={interactionRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: isShiftPressed 
          ? "crosshair" 
          : isDragging 
            ? "grabbing" 
            : isAltPressed && onDrag
              ? "grab" 
              : "default",
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onWheel={handleWheelEvent}
    />
  );
}
