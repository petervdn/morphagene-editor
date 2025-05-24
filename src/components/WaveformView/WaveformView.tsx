import { useRef, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import type { Range, ReelWithAudioBuffer, Splice } from "../../types/types";
import { useElementSize } from "../../utils/hooks/useElementSize";
import { WaveformCanvas } from "./layers/WaveformCanvas";
import { SplicesView } from "./layers/SplicesView/SplicesView";
import { PlayheadCanvas } from "./layers/PlayheadCanvas";

interface WaveformViewProps {
  splices: Splice[];
  reel: ReelWithAudioBuffer;
  viewPort: Range;
}

export function WaveformView({
  reel,
  viewPort,
  splices,
}: WaveformViewProps): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });

  return (
    <div className={styles.waveformContainer}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {wrapperSize && (
          <>
            <div className={styles.layer}>
              <WaveformCanvas
                audioBuffer={reel.audioBuffer}
                viewPort={viewPort}
                size={wrapperSize}
              />
            </div>
            <div className={styles.layer}>
              <PlayheadCanvas viewPort={viewPort} size={wrapperSize} />
            </div>

            <div className={styles.layer}>
              <SplicesView
                reel={reel}
                size={wrapperSize}
                splices={splices}
                viewPort={viewPort}
              />
            </div>

            {/* <InteractionLayer
              viewPort={viewPort}
              size={wrapperSize}
              onShiftClick={onAddMarker || (() => {})}
              onDrag={handleDrag}
            /> */}
          </>
        )}
      </div>
      {/* <div className={styles.controlsArea}>
        <div className={styles.zoomControls}>
          <ZoomSlider
            zoomLevel={zoomLevel}
            maxZoom={maxZoom}
            onChange={setZoomLevel}
          />
        </div>
        <div className={styles.helpText}>
          Shift+Click to add marker • Scroll to zoom • Alt+Drag to pan • ↑ to
          zoom out • ↓ to zoom to splice
        </div>
      </div> */}
    </div>
  );
}
