import { useState } from "react";
import type { Range, ReelWithAudioBuffer } from "../../../types/types";

type UseWaveformViewProps = {
  reel: ReelWithAudioBuffer;
};

export type UseWaveformViewResult = {
  viewPort: Range;
  reel: ReelWithAudioBuffer;
  setViewPort: (viewPort: Range) => void;
};

export function useWaveformView({
  reel,
}: UseWaveformViewProps): UseWaveformViewResult {
  const [viewPort, setViewPort] = useState<Range>({
    start: 0,
    end: reel.audioBuffer.duration,
  });

  return {
    viewPort,
    setViewPort,
    reel,
  };
}
