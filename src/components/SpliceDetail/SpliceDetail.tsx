import { useCallback, type ReactElement } from "react";
import { RiScissorsCutLine } from "react-icons/ri";
import styles from "./SpliceDetail.module.css";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import { SpliceActions } from "../SpliceActions/SpliceActions";
import { usePathParams } from "../../hooks/usePathParams";
import { deleteSplice } from "../../stores/cuePointTimes/utils/deleteSplice";
import { SpliceOperations } from "../SpliceOperations/SpliceOperations";

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

  const onDeleteClick = useCallback(() => {
    deleteSplice(splice);
  }, [splice]);

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

      <SpliceOperations splice={splice} reel={reel} />
    </div>
  );
}
