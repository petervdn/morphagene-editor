import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type Ref,
} from "react";
import {
  type Range,
  type ReelWithAudioBuffer,
  type Splice,
} from "../../../types/types";
import type {
  DragWaveHandler,
  ZoomWaveHandler,
} from "../layers/InteractionLayer/InteractionLayer";
import { constrainViewPort } from "../../../utils/waveview/constrainViewPort";

type UseWaveformViewProps = {
  reel: ReelWithAudioBuffer;
};

const zoomSpeed = 1.4;

export type UseWaveformViewResult = {
  viewPort: Range;
  reel: ReelWithAudioBuffer;
  setViewPort: (viewPort: Range) => void;
  zoomToSplice: (splice: Splice) => void;
  zoomOutToReel: () => void;
  onZoomWave: ZoomWaveHandler;
  onDragWave: DragWaveHandler;
  getIsFocusedOnSplice(): boolean;
};

export function useWaveformView({
  reel,
}: UseWaveformViewProps): UseWaveformViewResult {
  const isFocusedOnSpliceRef = useRef(false);
  const zoomedOutRange = useMemo(() => {
    return {
      start: 0,
      end: reel.audioBuffer.duration,
    };
  }, [reel.audioBuffer.duration]);

  const [viewPort, setViewPort] = useState<Range>(zoomedOutRange);
  const startDragViewPortRef = useRef<Range | null>(null);
  const viewPortDuration = viewPort.end - viewPort.start;
  const audioDuration = reel.audioBuffer.duration;

  const onZoomWave: ZoomWaveHandler = useCallback(
    ({ amount, atTime }: { amount: number; atTime: number }) => {
      isFocusedOnSpliceRef.current = false;

      const zoomFactor = Math.pow(zoomSpeed, amount / 100);

      const relativePos = (atTime - viewPort.start) / viewPortDuration;

      const newDuration = Math.max(
        0.05,
        Math.min(reel.audioBuffer.duration, viewPortDuration * zoomFactor)
      );
      const newStart = Math.max(0, atTime - relativePos * newDuration);
      const newEnd = Math.min(
        reel.audioBuffer.duration,
        newStart + newDuration
      );

      setViewPort({ start: newStart, end: newEnd });
    },
    [viewPortDuration, reel.audioBuffer.duration, viewPort.start]
  );

  const onDragWave: DragWaveHandler = useCallback(
    ({ isFirst, isLast, timeDelta }) => {
      isFocusedOnSpliceRef.current = false;

      if (isFirst) {
        startDragViewPortRef.current = { ...viewPort };
      } else if (isLast) {
        startDragViewPortRef.current = null;
      } else if (startDragViewPortRef.current) {
        setViewPort(
          constrainViewPort(
            {
              start: startDragViewPortRef.current.start - timeDelta,
              end: startDragViewPortRef.current.end - timeDelta,
            },
            audioDuration
          )
        );
      }
    },
    [audioDuration, viewPort]
  );

  const zoomToSplice = useCallback((splice: Splice) => {
    isFocusedOnSpliceRef.current = true;

    setViewPort(splice);
  }, []);

  const zoomOutToReel = useCallback(() => {
    isFocusedOnSpliceRef.current = false;

    setViewPort(zoomedOutRange);
  }, [zoomedOutRange]);

  const getIsFocusedOnSplice = useCallback(() => {
    return isFocusedOnSpliceRef.current;
  }, []);

  return {
    viewPort,
    setViewPort,
    reel,
    onZoomWave,
    onDragWave,
    zoomToSplice,
    zoomOutToReel,
    getIsFocusedOnSplice,
  };
}
