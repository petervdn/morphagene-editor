import { useCallback, useEffect, type ReactElement } from "react";
import { PiFilmReel } from "react-icons/pi";
import styles from "./ReelDetails.module.css";
import type { ReelWithAudioBuffer } from "../../types/types";
import { SpliceDetail } from "../SpliceDetail/SpliceDetail";
import { useSplices } from "../../utils/hooks/useSplices";
import { WaveformView } from "../WaveformView/layers/WaveformView";
import { useWaveformView } from "../WaveformView/hooks/useWaveformView";
import { UnsavedChangesActions } from "../UnsavedChangesActions/UnsavedChangesActions";
import {
  addCuePointTime,
  setCuePointsFromWavHeaderData,
} from "../../stores/cuePointTimesStore";
import { useActiveSplice } from "../../stores/useActiveSplice";
import { useHasUnsavedCuePointsChanges } from "../../hooks/useHasUnsavedCuePointsChanges";

type Props = {
  reel: ReelWithAudioBuffer;
};

export function ReelDetails({ reel }: Props): ReactElement | null {
  const splices = useSplices();
  const activeSplice = useActiveSplice();
  const hasUnsavedChanges = useHasUnsavedCuePointsChanges();

  const waveformViewProps = useWaveformView({
    reel,
  });

  const onWaveformViewShiftClick = useCallback((time: number) => {
    addCuePointTime(time);
  }, []);

  useEffect(() => {
    setCuePointsFromWavHeaderData(reel.wavHeaderData);
  }, [reel.wavHeaderData]);

  return splices ? (
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
        {hasUnsavedChanges && <UnsavedChangesActions reel={reel} />}
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
  ) : null;
}
