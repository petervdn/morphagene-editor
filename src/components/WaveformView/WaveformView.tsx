import { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import { drawWaveform } from "../../utils/canvas/drawWaveform";
import type { ViewPort } from "../../types/types";
import type { Splice } from "../../utils/getSplices";
import { drawSplices } from "../../utils/canvas/drawSplices";
import { useElementSize } from "../../utils/hooks/useElementSize";

type Props = {
  audioBuffer: AudioBuffer;
  splices: Array<Splice>;
};

export function WaveformView({ audioBuffer, splices }: Props): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewPort, setViewport] = useState<ViewPort | null>(null);

  useEffect(() => {
    setViewport({
      from: 0,
      to: audioBuffer.duration,
    });
  }, [audioBuffer]);

  useEffect(() => {
    if (!canvasRef.current || !viewPort) {
      return;
    }
    const context = canvasRef.current.getContext("2d")!;
    drawWaveform({
      audioBuffer,
      context,
      viewPort,
      numberOfChannels: audioBuffer.numberOfChannels,
    });

    drawSplices({ context, splices, viewPort });
  }, [audioBuffer, splices, viewPort]);

  useEffect(() => {}, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {wrapperSize && (
        <canvas
          ref={canvasRef}
          width={wrapperSize.width * window.devicePixelRatio}
          height={wrapperSize.height * window.devicePixelRatio}
          style={{
            width: `${wrapperSize.width}px`,
            height: `${wrapperSize.height}px`,
          }}
        />
      )}
    </div>
  );
}
