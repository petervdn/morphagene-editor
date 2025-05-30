import {
  useCallback,
  useState,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  type Position,
  type Range,
  type Size,
  type Vector2,
} from "../../../../types/types";
import { useWheelEvent } from "./useWheelEvent";
import { getTimeForMouseEvent } from "../../../../utils/waveview/getTimeForMouseEvent";

export type DragWaveHandler = (params: {
  pixelDelta: Vector2;
  timeDelta: number;
  isFirst: boolean;
  isLast: boolean;
}) => void;

export type ZoomWaveHandler = (params: {
  amount: number;
  atTime: number;
}) => void;

type Props = {
  viewPort: Range;
  size: Size;
  onShiftClick?: (timeInSeconds: number) => void;
  onDragWave?: DragWaveHandler;
  onZoomWave?: ZoomWaveHandler;
};

export function InteractionLayer({
  viewPort,
  size,
  onShiftClick,
  onZoomWave,
  onDragWave,
}: Props): ReactElement {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAltPressed, setIsAltPressed] = useState(false);
  const mouseDownPositionRef = useRef<Position | null>(null);
  const viewPortDuration = viewPort.end - viewPort.start;
  const timePerPixel = viewPortDuration / size.width;
  const [isDragging, setIsDragging] = useState(false);

  const onWheel = useCallback(
    (event: globalThis.WheelEvent) => {
      if (elementRef.current) {
        onZoomWave?.({
          amount: event.deltaY,
          atTime: getTimeForMouseEvent(event, elementRef.current, viewPort),
        });
      }
    },
    [onZoomWave, viewPort]
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
      setIsDragging(true);

      function onMouseUp(event: globalThis.MouseEvent) {
        setIsDragging(false);
        if (!mouseDownPositionRef.current) {
          return;
        }
        const x = event.clientX - mouseDownPositionRef.current.x;
        const y = event.clientY - mouseDownPositionRef.current.y;

        onDragWave?.({
          pixelDelta: {
            x,
            y,
          },
          timeDelta: x * timePerPixel,
          isFirst: false,
          isLast: true,
        });

        mouseDownPositionRef.current = null;
      }

      function onMouseMove(event: globalThis.MouseEvent) {
        if (!mouseDownPositionRef.current) {
          return;
        }

        const x = event.clientX - mouseDownPositionRef.current.x;
        const y = event.clientY - mouseDownPositionRef.current.y;

        onDragWave?.({
          pixelDelta: {
            x,
            y,
          },
          timeDelta: x * timePerPixel,
          isFirst: false,
          isLast: false,
        });
      }

      if (event.shiftKey) {
        // Prevent text selection when shift is pressed
        event.preventDefault();
      }

      onDragWave?.({
        pixelDelta: { x: 0, y: 0 },
        timeDelta: 0,
        isFirst: true,
        isLast: false,
      });

      mouseDownPositionRef.current = { x: event.clientX, y: event.clientY };
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mousemove", onMouseMove);
      };
    },
    [onDragWave, timePerPixel]
  );

  const cursor = useMemo(() => {
    if (isDragging) {
      return "grab";
    }
    if (isShiftPressed && onShiftClick) {
      return "copy";
    }

    return "default";
  }, [isDragging, isShiftPressed, onShiftClick]);

  return (
    <div
      style={{
        ...size,
        cursor,
      }}
      ref={elementRef}
      onClick={onClick}
      onMouseDown={onMouseDown}
    />
  );
}
