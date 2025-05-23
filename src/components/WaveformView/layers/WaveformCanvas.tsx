import { useEffect, useCallback, type ReactElement, useRef } from "react";
import type { Range } from "../../../types/types";
import type { Size } from "../../../types/types";
import { SizedCanvas } from "../../SizedCanvas/SizedCanvas";
import { drawWaveformChannels } from "../../../utils/canvas/drawWaveform";

type Props = {
  audioBuffer: AudioBuffer;
  viewPort: Range;
  size: Size;
  highlightRange?: Range;
};

export function WaveformCanvas({
  audioBuffer,
  viewPort,
  size,
  highlightRange,
}: Props): ReactElement {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!contextRef.current) {
      return;
    }

    drawWaveformChannels({
      audioBuffer,
      context: contextRef.current,
      viewPort,
      channels: [0, 1],
    });
  }, [audioBuffer, viewPort, size, highlightRange]);

  const onCanvasRef = useCallback((canvasElement: HTMLCanvasElement | null) => {
    contextRef.current = canvasElement?.getContext("2d") ?? null;
  }, []);

  return <SizedCanvas size={size} onCanvasRef={onCanvasRef} />;
}
