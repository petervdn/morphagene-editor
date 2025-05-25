import { useCallback, useMemo, type ReactElement } from "react";
import { PiFilmReel } from "react-icons/pi";
import styles from "./ReelDetails.module.css";
import type { ReelWithAudioBuffer } from "../../types/types";
import { SpliceDetail } from "../SpliceDetail/SpliceDetail";
import { WaveformView } from "../WaveformView/layers/WaveformView";
import { useWaveformView } from "../WaveformView/hooks/useWaveformView";
import { UnsavedChangesActions } from "../UnsavedChangesActions/UnsavedChangesActions";
import { useActiveSplice } from "../../stores/useActiveSplice";
import { useHasUnsavedCuePointsChanges } from "../../hooks/useHasUnsavedCuePointsChanges";
import { useSyncCuePointsToStore } from "../../hooks/useSyncCuePointsToStore";
import { useSplices } from "../../hooks/useSplices";
import { addSplice } from "../../stores/cuePointTimes/utils/addSplice";
import { useSaveSplices } from "../../hooks/useSaveSplices";
import { getWaveFileMetaData } from "../../utils/audio/getWaveFileMetaData";
import { reloadWaveFile } from "../../utils/reels/reloadReelWavHeaderData";

type Props = {
  reel: ReelWithAudioBuffer;
};

export function ReelDetails({ reel }: Props): ReactElement | null {
  const splices = useSplices();
  const activeSplice = useActiveSplice();
  const hasUnsavedChanges = useHasUnsavedCuePointsChanges();
  const saveSplices = useSaveSplices({ reel });
  const waveformViewProps = useWaveformView({
    reel,
  });

  const onWaveformViewShiftClick = useCallback((time: number) => {
    addSplice(time);
  }, []);

  const onRevertClick = useCallback(() => {
    reloadWaveFile(reel);
  }, [reel]);

  const onSaveClick = useCallback(() => {
    saveSplices();
  }, [saveSplices]);

  useSyncCuePointsToStore({ reel });

  const reelInfo = useMemo(() => {
    const waveFileMetaData = getWaveFileMetaData(reel.waveFile);
    return [
      reel.fileName,
      `${reel.audioBuffer.duration.toFixed(2)} seconds`,
      `${(reel.waveFile.toBuffer().length / 1024 / 1024).toFixed(2)} MB`,
      `${waveFileMetaData.sampleRate} Hz`,
      `${waveFileMetaData.numChannels} channels`,
      `${waveFileMetaData.bitsPerSample} bit`,
    ];
  }, [reel.audioBuffer.duration, reel.fileName, reel.waveFile]);

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
            {reelInfo.map((entry) => (
              <span key={entry}>{entry}</span>
            ))}
          </div>
        </div>
        {hasUnsavedChanges && (
          <UnsavedChangesActions
            onRevertClick={onRevertClick}
            onSaveClick={onSaveClick}
          />
        )}
      </div>
      <WaveformView
        splices={splices}
        {...waveformViewProps}
        onShiftClick={onWaveformViewShiftClick}
        height={300}
      />
      <div className={styles.helpText}>Shift+Click to create splice</div>

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
