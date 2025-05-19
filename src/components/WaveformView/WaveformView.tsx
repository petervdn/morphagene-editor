import { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import type { Splice, ViewPort } from "../../types/types";
import { useElementSize } from "../../utils/hooks/useElementSize";
import { WaveformCanvas } from "./layers/WaveformCanvas";
import { SplicesCanvas } from "./layers/SplicesCanvas";
import { PlayheadCanvas } from "./layers/PlayheadCanvas";
import { InteractionLayer } from "./layers/InteractionLayer";

type Props = {
  audioBuffer: AudioBuffer;
  splices: Array<Splice>;
  highlightSpliceIndex?: number;
  onAddMarker?: (timeInSeconds: number) => void;
};

export function WaveformView({
  audioBuffer,
  splices,
  highlightSpliceIndex = -1,
  onAddMarker,
}: Props): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });
  const [viewPort, setViewport] = useState<ViewPort | null>(null);

  useEffect(() => {
    setViewport({
      from: 0,
      to: audioBuffer.duration,
    });
  }, [audioBuffer]);

  return (
    <div className={styles.waveformContainer}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {viewPort && wrapperSize && (
          <>
            <WaveformCanvas
              audioBuffer={audioBuffer}
              viewPort={viewPort}
              size={wrapperSize}
            />
            <SplicesCanvas
              splices={splices}
              viewPort={viewPort}
              size={wrapperSize}
              highlightIndex={highlightSpliceIndex}
            />
            <PlayheadCanvas viewPort={viewPort} size={wrapperSize} />
            {onAddMarker && (
              <InteractionLayer
                viewPort={viewPort}
                size={wrapperSize}
                onShiftClick={onAddMarker}
              />
            )}
          </>
        )}
      </div>
      <div className={styles.helpText}>Shift+Click to add marker</div>
    </div>
  );
}
