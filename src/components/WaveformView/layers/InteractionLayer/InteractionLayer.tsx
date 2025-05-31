import {
  useCallback,
  type MouseEvent,
  type ReactElement,
  useRef,
  useMemo,
} from "react";
import { type Range, type Size } from "../../../../types/types";
import { useWheelEvent } from "./useWheelEvent";
import { getTimeForMouseEvent } from "../../../../utils/waveview/getTimeForMouseEvent";
import { useDragWave, type DragWaveHandler } from "./hooks/useDragWave";
import { useModifierKeys } from "./hooks/useModifierKeys";

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

  const viewPortDuration = viewPort.end - viewPort.start;
  const timePerPixel = viewPortDuration / size.width;

  const { isDragging, onMouseDown } = useDragWave({ timePerPixel, onDragWave });
  const { isShiftPressed } = useModifierKeys();

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
