import {
  useCallback,
  useState,
  type MouseEvent,
  type ReactElement,
  useEffect,
} from "react";
import type { Size, ViewPort } from "../../../types/types";

type Props = {
  viewPort: ViewPort;
  size: Size;
  onShiftClick: (timeInSeconds: number) => void;
};

export function InteractionLayer({
  viewPort,
  size,
  onShiftClick,
}: Props): ReactElement {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  // Handle keyboard events for the entire document
  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Shift") {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = ({ key }: KeyboardEvent) => {
      if (key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // Only handle shift+click
      if (!e.shiftKey) return;

      // todo move to function
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
    [viewPort, size, onShiftClick]
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: isShiftPressed ? "crosshair" : "default",
      }}
      onClick={handleClick}
    />
  );
}
