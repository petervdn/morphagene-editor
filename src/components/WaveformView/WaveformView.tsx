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

  useEffect(() => {
    if (!wrapperRef.current) return;

    const currentWrapper = wrapperRef.current;

    function updateSize() {
      const { width, height } = currentWrapper.getBoundingClientRect();
      setCanvasSize({ width, height });
    }

    updateSize();

    // track size changes
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(currentWrapper);

    return () => {
      resizeObserver.unobserve(currentWrapper);
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
