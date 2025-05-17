import { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./WaveformView.module.css";

type Props = {
  audioBuffer: AudioBuffer;
};

type Size = {
  width: number;
  height: number;
};

export function WaveformView({ audioBuffer }: Props): ReactElement {
  const [canvasSize, setCanvasSize] = useState<Size | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use ResizeObserver to track the wrapper's size
  useEffect(() => {
    if (!wrapperRef.current) return;

    const updateSize = () => {
      if (wrapperRef.current) {
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        setCanvasSize({ width, height });
        console.log(`Canvas size updated: ${width}x${height}`);
      }
    };

    // Call once to initialize
    updateSize();

    // Set up ResizeObserver to track size changes
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(wrapperRef.current);

    return () => {
      if (wrapperRef.current) {
        resizeObserver.unobserve(wrapperRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {canvasSize && (
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      )}
    </div>
  );
}
