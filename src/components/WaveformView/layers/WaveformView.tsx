import { useRef, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import type { Range, ReelWithAudioBuffer, Splice } from "../../../types/types";
import { WaveformCanvas } from "./WaveformLayer/WaveformLayer";
import { SplicesView } from "./SplicesLayer/SplicesLayer";
import { PlayheadLayer } from "./PlayheadLayer/PlayheadLayer";
import {
  InteractionLayer,
  type DragWaveHandler,
  type ZoomWaveHandler,
} from "./InteractionLayer/InteractionLayer";
import { useElementSize } from "../../../hooks/useElementSize";
import { AutoSlicesLayer } from "./AutoSlicesLayer/AutoSlicesLayer";

interface WaveformViewProps {
  splices: Array<Splice>;
  reel: ReelWithAudioBuffer;
  viewPort: Range;
  height: number;
  autoSliceTimes?: Array<number>;
  onShiftClick?(time: number): void;
  onZoomWave?: ZoomWaveHandler;
  onDragWave?: DragWaveHandler;
}

export function WaveformView({
  reel,
  viewPort,
  splices,
  height,
  autoSliceTimes,
  onShiftClick,
  onZoomWave,
  onDragWave,
}: WaveformViewProps): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });

  return (
    <div className={styles.waveformContainer}>
      <div className={styles.wrapper} ref={wrapperRef} style={{ height }}>
        {wrapperSize && (
          <>
            <div className={styles.layer} id="waveform">
              <WaveformCanvas
                audioBuffer={reel.audioBuffer}
                viewPort={viewPort}
                size={wrapperSize}
              />
            </div>

            <div className={styles.layer} id="playhead">
              <PlayheadLayer
                viewPort={viewPort}
                size={wrapperSize}
                reel={reel}
              />
            </div>

            <div className={styles.layer} id="interaction">
              <InteractionLayer
                viewPort={viewPort}
                size={wrapperSize}
                onShiftClick={onShiftClick}
                onDragWave={onDragWave}
                onZoomWave={onZoomWave}
              />
            </div>
            <div
              className={styles.layer}
              id="splices"
              style={{ pointerEvents: "none" }}
            >
              <SplicesView
                reel={reel}
                size={wrapperSize}
                splices={splices}
                viewPort={viewPort}
              />
            </div>

            {autoSliceTimes && (
              <div
                className={styles.layer}
                id="splices"
                style={{ pointerEvents: "none" }}
              >
                <AutoSlicesLayer
                  reel={reel}
                  size={wrapperSize}
                  times={autoSliceTimes}
                  viewPort={viewPort}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
