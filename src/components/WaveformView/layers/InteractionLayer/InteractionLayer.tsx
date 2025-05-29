import {
  useCallback,
  useState,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
} from "react";
import {
  type Position,
  type Range,
  type Size,
  type Vector2,
} from "../../../../types/types";
import { useWheelEvent } from "./useWheelEvent";

type Props = {
  viewPort: Range;
  size: Size;
  onShiftClick?: (timeInSeconds: number) => void;
  onDrag?: (delta: Vector2) => void;
  onZoom?: (params: { amount: number; atTime: number }) => void;
};

function getTimeForMouseEvent(
  event: {
    clientX: number;
  },
  element: HTMLElement,
  viewPort: Range
): number {
  const rect = element.getBoundingClientRect();

  const x = event.clientX - rect.left;
  return viewPort.start + (x / rect.width) * (viewPort.end - viewPort.start);
}

export function InteractionLayer({
  viewPort,
  size,
  onShiftClick,
  onZoom,
  onDrag,
}: Props): ReactElement {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAltPressed, setIsAltPressed] = useState(false);
  const mouseDownPositionRef = useRef<Position | null>(null);

  const onWheel = useCallback(
    (event: globalThis.WheelEvent) => {
      if (elementRef.current) {
        onZoom?.({
          amount: event.deltaY,
          atTime: getTimeForMouseEvent(event, elementRef.current, viewPort),
        });
      }
    },
    [onZoom, viewPort]
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

      if (elementRef.current) {
        onShiftClick?.(
          getTimeForMouseEvent(event, elementRef.current, viewPort)
        );
      }
    },
    [viewPort, onShiftClick]
  );

  const onMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      function onMouseUp() {
        mouseDownPositionRef.current = null;
      }

      function onMouseMove(event: globalThis.MouseEvent) {
        if (!mouseDownPositionRef.current) {
          return;
        }

        onDrag?.({
          x: event.clientX - mouseDownPositionRef.current.x,
          y: event.clientY - mouseDownPositionRef.current.y,
        });
      }

      if (event.shiftKey) {
        // Prevent text selection when shift is pressed
        event.preventDefault();
      }

      mouseDownPositionRef.current = { x: event.clientX, y: event.clientY };
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mousemove", onMouseMove);
      };
    },
    [onDrag]
  );

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
