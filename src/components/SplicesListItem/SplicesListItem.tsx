import { useCallback, type ReactElement } from "react";
import { BsPlayCircleFill, BsTrash } from "react-icons/bs";
import styles from "../SplicesList/SplicesList.module.css";
import type { Splice } from "../../types/types";

type Props = {
  splice: Splice;
  index: number;
  onClick?: (spliceIndex: number) => void;
  onMouseEnter?: (spliceIndex: number) => void;
  onMouseLeave?: () => void;
  onDelete?: (spliceIndex: number) => void;
};

export function SplicesListItem({
  splice,
  onClick: onClickFromProps,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  onDelete: onDeleteFromProps,
  index,
}: Props): ReactElement {
  const onPlay = useCallback(() => {
    onClickFromProps?.(index);
  }, [onClickFromProps, index]);

  const onDelete = useCallback(() => {
    onDeleteFromProps?.(index);
  }, [onDeleteFromProps, index]);

  const onMouseEnter = useCallback(() => {
    onMouseEnterProp?.(index);
  }, [onMouseEnterProp, index]);

  const onMouseLeave = useCallback(() => {
    onMouseLeaveProp?.();
  }, [onMouseLeaveProp]);

  return (
    <li 
      className={styles.spliceListItem}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.spliceContent}>
        <div className={styles.spliceInfo}>
          <span className={styles.spliceName}>
            Splice {index + 1}
          </span>
          <span className={styles.spliceMeta}>
            {(splice.end - splice.start).toFixed(2)}s <span className={styles.secondaryTime}>({splice.start.toFixed(2)}s - {splice.end.toFixed(2)}s)</span>
          </span>
        </div>
        <div className={styles.spliceActions}>
          {index > 0 && (
            <button
              className={styles.actionButton}
              onClick={onDelete}
              type="button"
              title="Delete splice"
            >
              <BsTrash />
            </button>
          )}
          <button
            className={styles.actionButton}
            onClick={onPlay}
            type="button"
            title="Play splice"
          >
            <BsPlayCircleFill />
          </button>
        </div>
      </div>
    </li>
  );
}
