import {
  useCallback,
  useState,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
} from "react";
import type { Range, Size } from "../../../../types/types";
import { useWheelEvent } from "./useWheelEvent";

type Props = {
  viewPort: Range;
  size: Size;
  onShiftClick?: (timeInSeconds: number) => void;
  onDrag?: (deltaX: number, containerWidth: number) => void;
  onZoom?: (params: { amount: number; atTime: number }) => void;
};

export function InteractionLayer({
  viewPort,
  size,
  onShiftClick,
  onZoom,
}: Props): ReactElement {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAltPressed, setIsAltPressed] = useState(false);

  const viewPortDuration = viewPort.end - viewPort.start;

  const onWheel = useCallback(
    (event: globalThis.WheelEvent) => {
      const rect = elementRef.current?.getBoundingClientRect();
      if (rect) {
        const x = event.clientX - rect.left;
        const atTime = viewPort.start + (x / rect.width) * viewPortDuration;

        onZoom?.({ amount: event.deltaY, atTime });
      }
    },
    [onZoom, viewPort.start, viewPortDuration]
  );

  useWheelEvent({ elementRef, onWheel });

  useEffect(() => {
    function onKeyDown({ key }: KeyboardEvent) {
      if (key === "Shift") {
        setIsShiftPressed(true);
      } else if (key === "Alt") {
        setIsAltPressed(true);
      }
    }

    function onKeyUp({ key }: KeyboardEvent) {
      if (key === "Shift") {
        setIsShiftPressed(false);
      } else if (key === "Alt") {
        setIsAltPressed(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const onClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!event.shiftKey) return;

      // Calculate the time based on the click position
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const xRatio = x / size.width;

      // Calculate the time in seconds based on the viewport
      const timeRange = viewPort.end - viewPort.start;
      const timeInSeconds = viewPort.start + timeRange * xRatio;

      onShiftClick?.(timeInSeconds);
    },
    [viewPort, size, onShiftClick]
  );

  const onMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (event.shiftKey) {
      // Prevent text selection when shift is pressed
      event.preventDefault();
    }
  }, []);

  return (
    <div
      style={{
        ...size,
        cursor: isShiftPressed && onShiftClick ? "copy" : "default",
      }}
      ref={elementRef}
      onClick={onClick}
      onMouseDown={onMouseDown}
    />
  );
}
