import { useEffect, useCallback, type ReactElement, useRef } from "react";
import { drawWaveform } from "../../utils/canvas/drawWaveform";
import type { ViewPort } from "../../types/types";
import type { Size } from "../../types/types";
import { SizedCanvas } from "../SizedCanvas/SizedCanvas";

type Props = {
  audioBuffer: AudioBuffer;
  viewPort: ViewPort;
  size: Size;
};

export function WaveformCanvas({ 
  audioBuffer, 
  viewPort, 
  size 
}: Props): ReactElement {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!contextRef.current || !viewPort || !size) {
      return;
    }

    drawWaveform({
      audioBuffer,
      context: contextRef.current,
      viewPort,
      numberOfChannels: audioBuffer.numberOfChannels,
    });
  }, [audioBuffer, viewPort, size]);

  const onCanvasRef = useCallback(
    (canvasElement: HTMLCanvasElement | null) => {
      contextRef.current = canvasElement?.getContext("2d") ?? null;
    },
    []
  );

  return <SizedCanvas size={size} onCanvasRef={onCanvasRef} />;
}
