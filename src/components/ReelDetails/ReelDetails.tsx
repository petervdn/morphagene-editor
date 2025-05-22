import { type ReactElement } from "react";
import { PiFilmReel } from "react-icons/pi";
import styles from "./ReelDetails.module.css";
import type { ReelWithAudioBuffer } from "../../types/types";
import { SpliceDetail } from "../SpliceDetail/SpliceDetail";
import { useActiveSplice } from "../../utils/hooks/useActiveSplice";

type Props = {
  reel: ReelWithAudioBuffer;
  // zoomToRangeRef?: React.MutableRefObject<
  //   ((start: number, end: number, options?: any) => void) | null
  // >;
  // setZoomLevelRef?: React.MutableRefObject<((level: number) => void) | null>;
};

export function ReelDetails({ reel }: Props): ReactElement {
  // const location = useLocation();
  // // Create a ref to hold the zoomToRange function from WaveformView
  // const internalZoomToRangeRef = useRef<
  //   | ((
  //       start: number,
  //       end: number,
  //       options?: {
  //         duration?: number;
  //         easing?: string;
  //       }
  //     ) => void)
  //   | null
  // >(null);

  // // Function to zoom to a specific splice range
  // const handleZoomToSplice = useCallback((start: number, end: number) => {
  //   if (internalZoomToRangeRef.current) {
  //     internalZoomToRangeRef.current(start, end, {
  //       duration: 700, // 700ms animation
  //       easing: "easeOutCubic", // only ease-out, no ease-in
  //     });
  //   }
  // }, []);
  // const updateReelCuePoints = useFolderContentStore(
  //   (state) => state.updateReelCuePoints
  // );

  // const handleReelUpdated = useCallback(
  //   (reelId: string, cuePoints: Array<CuePoint>) => {
  //     updateReelCuePoints(reelId, cuePoints);
  //   },
  //   [updateReelCuePoints]
  // );
  // const {
  //   splices,
  //   hasUnsavedChanges,
  //   onSpliceDelete,
  //   addMarker,
  //   saveChanges,
  //   resetChanges,
  // } = useSplices({
  //   reel,
  //   audioBuffer,
  //   onReelUpdated: handleReelUpdated,
  // });

  const splice = useActiveSplice({ reel });

  return (
    <>
      <div className={styles.reelHeader}>
        <div className={styles.reelTitleContainer}>
          <h2 className={styles.reelTitle}>
            <PiFilmReel /> {reel.name}
          </h2>
          <div className={styles.reelMetadata}>
            <span>{reel.fileName}</span>
            <span>
              {(reel.wavHeaderData.fileSize / 1024 / 1024).toFixed(2)} MB
            </span>
            <span>{reel.wavHeaderData.duration.toFixed(2)} seconds</span>
          </div>
        </div>
        {/* {hasUnsavedChanges && (
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
        )} */}
      </div>
      {/* <WaveformView
        audioBuffer={audioBuffer}
        splices={splices}
        onAddMarker={addMarker}
        zoomToRangeRef={zoomToRangeRef || internalZoomToRangeRef}
        onZoomLevelChange={(setZoomLevel) => {
          if (setZoomLevelRef) {
            setZoomLevelRef.current = setZoomLevel;
          }
        }}
      /> */}

      <div className={styles.spliceDetailContainer}>
        {splice && (
          <SpliceDetail
            splice={splice}
            reel={reel}
            // onDeleteSplice={onSpliceDelete}
            // onZoomToSplice={handleZoomToSplice}
          />
        )}
      </div>
    </>
  );
}
