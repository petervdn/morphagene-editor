import { useRef, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import type { Range, ReelWithAudioBuffer, Splice } from "../../../types/types";
import { WaveformCanvas } from "./WaveformLayer/WaveformLayer";
import { SplicesView } from "./SplicesLayer/SplicesLayer";
import { PlayheadLayer } from "./PlayheadLayer/PlayheadLayer";
import { InteractionLayer } from "./InteractionLayer/InteractionLayer";
import { useElementSize } from "../../../hooks/useElementSize";

interface WaveformViewProps {
  splices: Array<Splice>;
  reel: ReelWithAudioBuffer;
  viewPort: Range;
  onShiftClick?(time: number): void;
  height: number;
}

export function WaveformView({
  reel,
  viewPort,
  splices,
  onShiftClick,
  height,
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
          </>
        )}
      </div>
      <div className={styles.controlsArea}>
        {/* <div className={styles.zoomControls}>
          <ZoomSlider
            zoomLevel={zoomLevel}
            maxZoom={maxZoom}
            onChange={setZoomLevel}
          />
        </div> */}
        <div className={styles.helpText}>Shift+Click to create splice</div>
      </div>
    </div>
  );
}
