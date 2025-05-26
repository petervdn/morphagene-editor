import { useCallback, useState } from "react";
import type { Range, ReelWithAudioBuffer } from "../../../types/types";

type UseWaveformViewProps = {
  reel: ReelWithAudioBuffer;
};

const zoomSpeed = 1.4;

export type UseWaveformViewResult = {
  viewPort: Range;
  reel: ReelWithAudioBuffer;
  setViewPort: (viewPort: Range) => void;
  onZoom: (params: { amount: number; atTime: number }) => void;
};

export function useWaveformView({
  reel,
}: UseWaveformViewProps): UseWaveformViewResult {
  const [viewPort, setViewPort] = useState<Range>({
    start: 0,
    end: reel.audioBuffer.duration,
  });

  const duration = viewPort.end - viewPort.start;

  const onZoom = useCallback(
    ({ amount, atTime }: { amount: number; atTime: number }) => {
      const zoomFactor = Math.pow(zoomSpeed, amount / 100);

      const relativePos = (atTime - viewPort.start) / duration;

      const newDuration = Math.max(
        0.05,
        Math.min(reel.audioBuffer.duration, duration * zoomFactor)
      );
      const newStart = Math.max(0, atTime - relativePos * newDuration);
      const newEnd = Math.min(
        reel.audioBuffer.duration,
        newStart + newDuration
      );

      setViewPort({ start: newStart, end: newEnd });
    },
    [duration, reel.audioBuffer.duration, viewPort.start]
  );

  return {
    viewPort,
    setViewPort,
    reel,
    onZoom,
  };
}
