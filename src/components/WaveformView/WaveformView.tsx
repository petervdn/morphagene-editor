import { useRef, useEffect, type ReactElement } from "react";
import styles from "./WaveformView.module.css";
import type { Splice } from "../../types/types";
import { useElementSize } from "../../utils/hooks/useElementSize";
import { useWaveformZoom } from "../../utils/hooks/useWaveformZoom";
import { WaveformCanvas } from "./layers/WaveformCanvas";
import { SplicesCanvas } from "./layers/SplicesCanvas";
import { PlayheadCanvas } from "./layers/PlayheadCanvas";
import { InteractionLayer } from "./layers/InteractionLayer";
import { ZoomSlider } from "./ZoomSlider";

type Props = {
  audioBuffer: AudioBuffer;
  splices: Array<Splice>;
  highlightSpliceIndex?: number;
  onAddMarker?: (timeInSeconds: number) => void;
  maxZoom?: number;
};

export function WaveformView({
  audioBuffer,
  splices,
  highlightSpliceIndex = -1,
  onAddMarker,
  maxZoom = 50,
}: Props): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });
  
  // Use the waveform zoom hook to manage zoom and pan
  const {
    viewPort,
    zoomLevel,
    handleWheel,
    handleDrag,
    setZoomLevel
  } = useWaveformZoom({
    audioDuration: audioBuffer.duration,
    maxZoom,
  });
  
  // Add a non-passive wheel event listener to the wrapper to prevent page scrolling
  // while still allowing our zoom functionality to work
  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    if (!wrapperElement) return;
    
    const handleWheelEvent = (e: WheelEvent) => {
      // Prevent the default scroll behavior
      e.preventDefault();
      e.stopPropagation();
      
      // Calculate the mouse X position relative to the container
      const rect = wrapperElement.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width;
      
      // Call our zoom handler
      handleWheel(e as any, mouseX);
      
      return false;
    };
    
    // Add the event listener with { passive: false } to allow preventDefault
    wrapperElement.addEventListener('wheel', handleWheelEvent, { passive: false });
    
    return () => {
      wrapperElement.removeEventListener('wheel', handleWheelEvent);
    };
  }, [handleWheel]);

  return (
    <div className={styles.waveformContainer}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {wrapperSize && (
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
            <InteractionLayer
              viewPort={viewPort}
              size={wrapperSize}
              onShiftClick={onAddMarker || (() => {})}
              onDrag={handleDrag}
            />
          </>
        )}
      </div>
      <div className={styles.controlsArea}>
        <div className={styles.zoomControls}>
          <ZoomSlider 
            zoomLevel={zoomLevel} 
            maxZoom={maxZoom} 
            onChange={setZoomLevel} 
          />
        </div>
        <div className={styles.helpText}>
          Shift+Click to add marker • Scroll to zoom • Drag to pan
        </div>
      </div>
    </div>
  );
}
