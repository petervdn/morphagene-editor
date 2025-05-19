import { useCallback, useRef, type ReactElement } from "react";
import { PiFilmReel } from "react-icons/pi";
import { FiSave } from "react-icons/fi";
import { BiSolidErrorCircle } from "react-icons/bi";
import { MdRestartAlt } from "react-icons/md";
import styles from "./ReelDetails.module.css";
import { WaveformView } from "../WaveformView/WaveformView";
import { SplicesList } from "../SplicesList/SplicesList";
import { WavHeaderTable } from "../WavHeaderTable/WavHeaderTable";
import type { CuePoint, Reel } from "../../types/types";
import { useSplices } from "../../utils/hooks/useSplices";
import { useFolderContentStore } from "../../stores/folderContentStore";

type Props = {
  reel: Reel;
  audioBuffer: AudioBuffer;
};

export function ReelDetails({ reel, audioBuffer }: Props): ReactElement {
  // Create a ref to hold the zoomToRange function from WaveformView
  const zoomToRangeRef = useRef<((start: number, end: number, options?: {
    duration?: number;
    easing?: string;
  }) => void) | null>(null);
  
  // Function to zoom to a specific splice range
  const handleZoomToSplice = useCallback((start: number, end: number) => {
    if (zoomToRangeRef.current) {
      zoomToRangeRef.current(start, end, {
        duration: 700, // 700ms animation
        easing: 'easeOutCubic' // only ease-out, no ease-in
      });
    }
  }, []);
  const updateReelCuePoints = useFolderContentStore(
    (state) => state.updateReelCuePoints
  );

  const handleReelUpdated = useCallback(
    (reelId: string, cuePoints: Array<CuePoint>) => {
      updateReelCuePoints(reelId, cuePoints);
    },
    [updateReelCuePoints]
  );
  const {
    splices,
    highlightedSpliceIndex,
    hasUnsavedChanges,
    onSpliceClick,
    onSpliceMouseEnter,
    onSpliceMouseLeave,
    onSpliceDelete,
    addMarker,
    saveChanges,
    resetChanges,
  } = useSplices({
    reel,
    audioBuffer,
    onReelUpdated: handleReelUpdated,
  });

  return (
    <>
      <div className={styles.reelHeader}>
        <h2 className={styles.reelTitle}>
          <PiFilmReel /> {reel.name}
        </h2>
        {hasUnsavedChanges && (
          <div className={styles.saveContainer}>
            <div className={styles.unsavedIndicator}>
              <BiSolidErrorCircle className={styles.warningIcon} />
              <span>Unsaved changes</span>
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.resetButton}
                onClick={resetChanges}
                title="Reset to original state"
              >
                <MdRestartAlt /> Reset
              </button>
              <button
                className={styles.saveButton}
                onClick={saveChanges}
                title="Save changes"
              >
                <FiSave /> Save
              </button>
            </div>
          </div>
        )}
      </div>
      <WaveformView
        audioBuffer={audioBuffer}
        splices={splices}
        highlightSpliceIndex={highlightedSpliceIndex}
        onAddMarker={addMarker}
        zoomToRangeRef={zoomToRangeRef}
      />
      <div className={styles.reelContentLayout}>
        <div className={styles.reelMainContent}>
          {splices && (
            <SplicesList
              splices={splices}
              onDeleteSplice={onSpliceDelete}
              onSpliceMouseEnter={onSpliceMouseEnter}
              onSpliceMouseLeave={onSpliceMouseLeave}
              onZoomToSplice={handleZoomToSplice}
              onSpliceClick={onSpliceClick}
            />
          )}
        </div>
        <div className={styles.reelSidebar}>
          <WavHeaderTable
            wavHeaderData={reel.wavHeaderData}
            filename={reel.file.name}
          />
        </div>
      </div>
    </>
  );
}
