import { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import { drawWaveform } from "../../utils/canvas/drawWaveform";
import type { Size, ViewPort } from "../../types/types";
import type { Splice } from "../../utils/getSplices";
import { drawSplices } from "../../utils/canvas/drawSplices";

type Props = {
  audioBuffer: AudioBuffer;
  splices: Array<Splice>;
};

export function WaveformView({ audioBuffer, splices }: Props): ReactElement {
  const [canvasSize, setCanvasSize] = useState<Size | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewPort, setViewport] = useState<ViewPort | null>(null);

  useEffect(() => {
    setViewport({
      from: 0,
      to: audioBuffer.duration,
    });
  }, [audioBuffer]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const currentWrapper = wrapperRef.current;

    function updateSize() {
      const { width, height } = currentWrapper.getBoundingClientRect();
      setCanvasSize({ width, height });
    }

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(currentWrapper);

    return () => {
      resizeObserver.unobserve(currentWrapper);
      resizeObserver.disconnect();
    };
  }, []);

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
  }, [audioBuffer, canvasSize, splices, viewPort]);

  useEffect(() => {}, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {canvasSize && (
        <canvas
          ref={canvasRef}
          width={canvasSize.width * window.devicePixelRatio}
          height={canvasSize.height * window.devicePixelRatio}
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
          }}
        />
      )}
    </div>
  );
}
