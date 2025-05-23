import { useRef, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import { useElementSize } from "../../utils/hooks/useElementSize";
import { useWaveformZoom } from "../../utils/hooks/useWaveformZoom";
import { WaveformCanvas } from "./layers/WaveformCanvas";
import { SplicesView } from "./layers/SplicesView/SplicesView";
import { PlayheadCanvas } from "./layers/PlayheadCanvas";

interface WaveformViewProps {
  // audioBuffer: AudioBuffer;
  splices: Splice[];
  reel: ReelWithAudioBuffer;

  // onAddMarker?: (time: number) => void;
  // zoomToRangeRef?: React.MutableRefObject<
  //   | ((
  //       start: number,
  //       end: number,
  //       options?: {
  //         duration?: number;
  //         easing?:
  //           | "linear"
  //           | "easeInQuad"
  //           | "easeOutQuad"
  //           | "easeInOutQuad"
  //           | "easeInCubic"
  //           | "easeOutCubic"
  //           | "easeInOutCubic"
  //           | "easeOutElastic";
  //       }
  //     ) => void)
  //   | null
  // >;
  // maxZoom?: number;
  // onZoomLevelChange?: (setZoomLevel: (level: number) => void) => void;
}

export function WaveformView({
  reel,
  splices,
}: // onAddMarker,
// zoomToRangeRef,
// maxZoom = 50,
// onZoomLevelChange,
WaveformViewProps): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });

  const {
    viewPort,
    // zoomLevel,
    // handleWheel,
    // handleDrag,
    // setZoomLevel,
    // zoomToRange,
  } = useWaveformZoom({
    audioDuration: reel.audioBuffer.duration,
    // maxZoom,
  });

  // // Expose the zoomToRange function via ref if provided
  // useEffect(() => {
  //   if (zoomToRangeRef) {
  //     zoomToRangeRef.current = zoomToRange;
  //   }

  //   return () => {
  //     if (zoomToRangeRef) {
  //       zoomToRangeRef.current = null;
  //     }
  //   };
  // }, [zoomToRange, zoomToRangeRef]);

  // // Expose the setZoomLevel function via callback if provided
  // useEffect(() => {
  //   if (onZoomLevelChange) {
  //     onZoomLevelChange(setZoomLevel);
  //   }
  // }, [onZoomLevelChange, setZoomLevel]);

  // // Add a non-passive wheel event listener to the wrapper to prevent page scrolling
  // // while still allowing our zoom functionality to work
  // useEffect(() => {
  //   const wrapperElement = wrapperRef.current;
  //   if (!wrapperElement) return;

  //   const handleWheelEvent = (e: WheelEvent) => {
  //     // Prevent the default scroll behavior
  //     e.preventDefault();
  //     e.stopPropagation();

  //     // Calculate the mouse X position relative to the container
  //     const rect = wrapperElement.getBoundingClientRect();
  //     const mouseX = (e.clientX - rect.left) / rect.width;

  //     // Call our zoom handler
  //     handleWheel(e as any, mouseX);

  //     return false;
  //   };

  //   // Add the event listener with { passive: false } to allow preventDefault
  //   wrapperElement.addEventListener("wheel", handleWheelEvent, {
  //     passive: false,
  //   });

  //   return () => {
  //     wrapperElement.removeEventListener("wheel", handleWheelEvent);
  //   };
  // }, [handleWheel]);

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
