import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactElement,
} from "react";
import styles from "./WaveformView.module.css";
import { drawWaveform } from "../../utils/canvas/drawWaveform";
import type { ViewPort } from "../../types/types";
import type { Splice } from "../../utils/getSplices";
import { drawSplices } from "../../utils/canvas/drawSplices";
import { useElementSize } from "../../utils/hooks/useElementSize";
import { SizedCanvas } from "../SizedCanvas/SizedCanvas";

type Props = {
  audioBuffer: AudioBuffer;
  splices: Array<Splice>;
};

export function WaveformView({ audioBuffer, splices }: Props): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });
  const [viewPort, setViewport] = useState<ViewPort | null>(null);
  const waveCanvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setViewport({
      from: 0,
      to: audioBuffer.duration,
    });
  }, [audioBuffer]);

  useEffect(() => {
    if (!waveCanvasContextRef.current || !viewPort || !wrapperSize) {
      return;
    }

    drawWaveform({
      audioBuffer,
      context: waveCanvasContextRef.current,
      viewPort,
      numberOfChannels: audioBuffer.numberOfChannels,
    });

    drawSplices({ context: waveCanvasContextRef.current, splices, viewPort });
  }, [audioBuffer, splices, viewPort, wrapperSize]);

  const onCanvasRef = useCallback((canvasElement: HTMLCanvasElement | null) => {
    waveCanvasContextRef.current = canvasElement?.getContext("2d") ?? null;
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <SizedCanvas size={wrapperSize} onCanvasRef={onCanvasRef} />
    </div>
  );
}
