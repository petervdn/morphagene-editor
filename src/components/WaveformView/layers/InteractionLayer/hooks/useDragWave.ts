import { useCallback, useRef, useState, type MouseEvent } from "react";
import type { Position, Vector2 } from "../../../../../types/types";

export type DragWaveHandler = (params: {
  pixelDelta: Vector2;
  timeDelta: number;
  isFirst: boolean;
  isLast: boolean;
}) => void;

type Props = {
  timePerPixel: number;
  onDragWave?: DragWaveHandler;
};

export function useDragWave({ timePerPixel, onDragWave }: Props) {
  const mouseDownPositionRef = useRef<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  return {
    isDragging,
    onMouseDown,
  };
}
