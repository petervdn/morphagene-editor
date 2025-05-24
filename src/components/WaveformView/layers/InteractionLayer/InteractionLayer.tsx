import {
  useCallback,
  useState,
  type MouseEvent,
  type ReactElement,
  useEffect,
} from "react";
import type { Range, Size } from "../../../../types/types";

type Props = {
  viewPort: Range;
  size: Size;
  onShiftClick?: (timeInSeconds: number) => void;
  onDrag?: (deltaX: number, containerWidth: number) => void;
};

export function InteractionLayer({
  viewPort,
  size,
  onShiftClick,
}: Props): ReactElement {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAltPressed, setIsAltPressed] = useState(false);

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
        cursor: isShiftPressed ? "copy" : "default",
        zIndex: 999,
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
    />
  );
}
