import { useCallback, type ReactElement } from "react";
import { RiScissorsCutLine } from "react-icons/ri";
import styles from "./SpliceDetail.module.css";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import { WaveformView } from "../WaveformView/layers/WaveformView";
import { useWaveformView } from "../WaveformView/hooks/useWaveformView";
import { SpliceActions } from "../SpliceActions/SpliceActions";
import { usePathParams } from "../../hooks/usePathParams";
import { deleteSplice } from "../../stores/cuePointTimes/utils/deleteSplice";
import { SpliceOperations } from "../SpliceOperations/SpliceOperations";
import { useCuePointTimesStore } from "../../stores/cuePointTimes/cuePointTimesStore";
import { useShallow } from "zustand/shallow";

type Props = {
  splice: Splice;
  totalAmountOfSplices: number;
  reel: ReelWithAudioBuffer;
};

export function SpliceDetail({
  splice,
  totalAmountOfSplices,
  reel,
}: Props): ReactElement {
  const { spliceId } = usePathParams();
  const waveformViewProps = useWaveformView({ reel });

  const onDeleteClick = useCallback(() => {
    deleteSplice(splice);
  }, [splice]);

  const autoSliceCuePointTimes = useCuePointTimesStore(
    useShallow((state) => state.autoSliceCuePointTimes)
  );

  return (
    <div className={styles.spliceDetail}>
      <div className={styles.spliceHeader}>
        <h3 className={styles.spliceTitle}>
          <span className={styles.iconWrapper}>
            <RiScissorsCutLine />
          </span>
          <span className={styles.titleText}>Splice {spliceId} </span>
          <span className={styles.spliceCount}>of {totalAmountOfSplices}</span>
        </h3>
        <div className={styles.navigationContainer}>
          <SpliceActions
            reel={reel}
            activeSplice={splice}
            onDeleteClick={onDeleteClick}
          />
        </div>
      </div>

      <div className={styles.spliceInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Start Time</span>
          <span className={styles.infoValue}>{splice.start.toFixed(2)}s</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>End Time</span>
          <span className={styles.infoValue}>{splice.end.toFixed(2)}s</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Duration</span>
          <span className={styles.infoValue}>{2}s</span>
        </div>
      </div>

      <WaveformView
        splices={[]}
        {...waveformViewProps}
        viewPort={splice}
        height={100}
        autoSliceTimes={autoSliceCuePointTimes ?? undefined}
      />
      <SpliceOperations splice={splice} />
    </div>
  );
}
