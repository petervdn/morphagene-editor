import { useEffect, useCallback, type ReactElement, useRef } from "react";
import { drawWaveform } from "../../../utils/canvas/drawWaveform";
import type { ViewPort, Splice } from "../../../types/types";
import type { Size } from "../../../types/types";
import { SizedCanvas } from "../../SizedCanvas/SizedCanvas";
import { useSplice } from "../../../utils/hooks/useSpliceFromUrl";

type Props = {
  audioBuffer: AudioBuffer;
  viewPort: ViewPort;
  size: Size;
  splices: Array<Splice>;
};

export function WaveformCanvas({
  audioBuffer,
  viewPort,
  size,
  splices,
}: Props): ReactElement {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Get the selected splice from the URL
  const { splice } = useSplice(splices);

  useEffect(() => {
    if (!contextRef.current || !viewPort || !size) {
      return;
    }

    // Only create a highlight range if a splice is selected
    const highlightRange = splice
      ? { start: splice.start, end: splice.end }
      : undefined;

    drawWaveform({
      audioBuffer,
      context: contextRef.current,
      viewPort,
      numberOfChannels: audioBuffer.numberOfChannels,
      highlightRange,
    });
  }, [audioBuffer, viewPort, size, splice]);

  const onCanvasRef = useCallback((canvasElement: HTMLCanvasElement | null) => {
    contextRef.current = canvasElement?.getContext("2d") ?? null;
  }, []);

  return <SizedCanvas size={size} onCanvasRef={onCanvasRef} />;
}
