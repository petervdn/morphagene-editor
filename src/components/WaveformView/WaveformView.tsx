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
  const waveformContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const splicesContextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setViewport({
      from: 0,
      to: audioBuffer.duration,
    });
  }, [audioBuffer]);

  useEffect(() => {
    if (!waveformContextRef.current || !viewPort || !wrapperSize) {
      return;
    }

    drawWaveform({
      audioBuffer,
      context: waveformContextRef.current,
      viewPort,
      numberOfChannels: audioBuffer.numberOfChannels,
    });
  }, [audioBuffer, viewPort, wrapperSize]);

  useEffect(() => {
    if (!splicesContextRef.current || !viewPort || !wrapperSize) {
      return;
    }

    drawSplices({
      context: splicesContextRef.current,
      splices,
      viewPort,
    });
  }, [splices, viewPort, wrapperSize]);

  const onWaveformCanvasRef = useCallback(
    (canvasElement: HTMLCanvasElement | null) => {
      waveformContextRef.current = canvasElement?.getContext("2d") ?? null;
    },
    []
  );

  const onSplicesCanvasRef = useCallback(
    (canvasElement: HTMLCanvasElement | null) => {
      splicesContextRef.current = canvasElement?.getContext("2d") ?? null;
    },
    []
  );

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <SizedCanvas size={wrapperSize} onCanvasRef={onWaveformCanvasRef} />
      <SizedCanvas size={wrapperSize} onCanvasRef={onSplicesCanvasRef} />
    </div>
  );
}
