import { useCallback, type ReactElement } from "react";
import { BsTrash } from "react-icons/bs";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { BsZoomIn } from 'react-icons/bs';
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";
import styles from "../SplicesList/SplicesList.module.css";
import type { Splice } from "../../types/types";

type Props = {
  splice: Splice;
  index: number;
  onClick?: (spliceIndex: number) => void;
  onMouseEnter?: (spliceIndex: number) => void;
  onMouseLeave?: () => void;
  onDelete?: (spliceIndex: number) => void;
  onZoomToSplice?: (start: number, end: number) => void;
};

export function SplicesListItem({
  splice,
  onClick: onClickFromProps,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  onDelete: onDeleteFromProps,
  index,
  onZoomToSplice,
}: Props): ReactElement {
  const audioPlayerProps = useAudioPlayer();
  // Use the onClick prop to play the splice
  const onPlay = useCallback(() => {
    // This will call the onSpliceClick function from useSplices
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

  // todo: maybe give splices ids so we can compare those (instead of compare objects)
  const isItemPlaying = audioPlayerProps?.playingSound?.splice === splice;

  return (
    <li
      className={`${styles.spliceListItem} ${
        isItemPlaying ? styles.playingItem : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.spliceContent}>
        <div className={styles.playButtonContainer}>
          {isItemPlaying ? (
            <button
              className={`${styles.actionButton} ${styles.playButton}`}
              onClick={() => audioPlayerProps.playingSound?.stop()}
              type="button"
              title="Stop playback"
            >
              <BsStopCircle />
            </button>
          ) : (
            <button
              className={`${styles.actionButton} ${styles.playButton}`}
              onClick={onPlay}
              type="button"
              title="Play splice"
            >
              <BsPlayCircle />
            </button>
          )}
        </div>
        <div className={styles.spliceInfo}>
          <div className={styles.spliceMainInfo}>
            <span className={styles.spliceName}>Splice {index + 1}</span>
            <span className={styles.secondaryTime}>
              {(splice.end - splice.start).toFixed(2)}s
            </span>
          </div>
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
            onClick={() => onZoomToSplice?.(splice.start, splice.end)}
            title="Zoom to splice"
          >
            <BsZoomIn />
          </button>
        </div>
      </div>
    </li>
  );
}
