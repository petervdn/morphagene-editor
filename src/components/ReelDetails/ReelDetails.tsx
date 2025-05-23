import { useCallback, type ReactElement } from "react";
import { PiFilmReel } from "react-icons/pi";
import styles from "./ReelDetails.module.css";
import type { ReelWithAudioBuffer } from "../../types/types";
import { SpliceDetail } from "../SpliceDetail/SpliceDetail";
import { useSplices } from "../../utils/hooks/useSplices";
import { WaveformView } from "../WaveformView/layers/WaveformView";
import { useWaveformView } from "../WaveformView/hooks/useWaveformView";
import { BiSolidErrorCircle } from "react-icons/bi";
import { MdRestartAlt } from "react-icons/md";
import { FiSave } from "react-icons/fi";

type Props = {
  reel: ReelWithAudioBuffer;
};

export function ReelDetails({ reel }: Props): ReactElement {
  const { splices, addSplice, activeSplice, hasUnsavedChanges } = useSplices({
    reel,
  });

  const waveformViewProps = useWaveformView({
    reel,
  });

  const onWaveformViewShiftClick = useCallback(
    (time: number) => {
      addSplice(time);
    },
    [addSplice]
  );

  return (
    <>
      <div className={styles.reelHeader}>
        <div className={styles.reelTitleContainer}>
          <h2 className={styles.reelTitle}>
            <span className={styles.iconWrapper}>
              <PiFilmReel />
            </span>
            <span className={styles.titleText}>{reel.name}</span>
          </h2>
          <div className={styles.reelMetadata}>
            <span>{reel.fileName}</span>
            <span>
              {(reel.wavHeaderData.fileSize / 1024 / 1024).toFixed(2)} MB
            </span>
            <span>{reel.wavHeaderData.duration.toFixed(2)} seconds</span>
          </div>
        </div>
        {hasUnsavedChanges && (
          <div className={styles.saveContainer}>
            <div className={styles.unsavedIndicator}>
              <BiSolidErrorCircle className={styles.warningIcon} />
              <span>Unsaved changes</span>
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.resetButton}
                //onClick={resetChanges}
                title="Reset to original state"
              >
                <MdRestartAlt /> Revert
              </button>
              <button
                className={styles.saveButton}
                // onClick={saveChanges}
                title="Save changes"
              >
                <FiSave /> Save
              </button>
            </div>
          </div>
        )}
      </div>
      <WaveformView
        splices={splices}
        {...waveformViewProps}
        onShiftClick={onWaveformViewShiftClick}
        height={200}
      />

      {activeSplice && (
        <div className={styles.spliceDetailContainer}>
          <SpliceDetail
            splice={activeSplice}
            reel={reel}
            totalAmountOfSplices={splices?.length}
          />
        </div>
      )}
    </>
  );
}
