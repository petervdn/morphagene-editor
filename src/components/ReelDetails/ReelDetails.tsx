import { type ReactElement } from "react";
import { PiFilmReel } from "react-icons/pi";
import styles from "./ReelDetails.module.css";
import type { ReelWithAudioBuffer } from "../../types/types";
import { SpliceDetail } from "../SpliceDetail/SpliceDetail";
import { useActiveSplice } from "../../utils/hooks/useActiveSplice";
import { useSplices } from "../../utils/hooks/useSplices";
import { WaveformView } from "../WaveformView/WaveformView";
import { SpliceNavigation } from "../SpliceNavigation/SpliceNavigation";
import { useWaveformView } from "../WaveformView/hooks/useWaveformView";

type Props = {
  reel: ReelWithAudioBuffer;
  // zoomToRangeRef?: React.MutableRefObject<
  //   ((start: number, end: number, options?: any) => void) | null
  // >;
  // setZoomLevelRef?: React.MutableRefObject<((level: number) => void) | null>;
};

export function ReelDetails({ reel }: Props): ReactElement {
  const splice = useActiveSplice({ reel });
  const { splices } = useSplices({ reel });

  const waveformViewProps = useWaveformView({
    reel,
  });

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
      <WaveformView splices={splices} {...waveformViewProps} />

      {splice && (
        <>
          <SpliceNavigation reel={reel} activeSplice={splice} />

          <div className={styles.spliceDetailContainer}>
            <SpliceDetail
              splice={splice}
              reel={reel}
              totalAmountOfSplices={splices?.length}
              // onDeleteSplice={onSpliceDelete}
              // onZoomToSplice={handleZoomToSplice}
            />
          </div>
        </>
      )}
    </>
  );
}
