import { Link } from "react-router-dom";
import { useCallback } from "react";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import styles from "./SpliceActions.module.css";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BsTrash, BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { useSpliceNavigation } from "../../hooks/useSpliceNavigation";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

type SpliceActionsProps = {
  reel: ReelWithAudioBuffer;
  activeSplice: Splice;
  onZoomToSplice?: () => void;
  onDeleteClick?: () => void;
};

export function SpliceActions({
  reel,
  activeSplice,
  onDeleteClick,
}: SpliceActionsProps) {
  const {
    hasNextSplice,
    hasPreviousSplice,
    nextSplicePath,
    previousSplicePath,
  } = useSpliceNavigation({ reel, activeSplice });

  const audioPlayerProps = useAudioPlayer();
  const isPlaying = audioPlayerProps?.playingSound?.splice === activeSplice;

  const handlePlayToggle = useCallback(() => {
    if (!audioPlayerProps) {
      return;
    }
    if (isPlaying) {
      audioPlayerProps.playingSound?.stop();
    } else {
      audioPlayerProps.playSound({
        audioBuffer: reel.audioBuffer,
        splice: activeSplice,
      });
    }
  }, [audioPlayerProps, isPlaying, reel.audioBuffer, activeSplice]);

  return (
    <div className={styles.actionsContainer}>
      <div className={styles.buttonsGroup}>
        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButton} ${styles.playButton}`}
            onClick={handlePlayToggle}
            type="button"
            title={isPlaying ? "Stop playback" : "Play splice"}
          >
            {isPlaying ? (
              <>
                <BsStopCircle />
                Stop
              </>
            ) : (
              <>
                <BsPlayCircle />
                Play 
              </>
            )}
          </button>

          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={onDeleteClick}
            type="button"
            title="Delete splice"
          >
            <BsTrash />
            Delete
          </button>
        </div>

        <div className={styles.navigationButtons}>
          <Link
            to={previousSplicePath ?? ""}
            className={`${styles.navButton} ${
              !hasPreviousSplice ? styles.disabledLink : ""
            }`}
            title="Go to previous splice"
          >
            <MdSkipPrevious /> Prev
          </Link>

          <Link
            to={nextSplicePath ?? ""}
            className={`${styles.navButton} ${
              !hasNextSplice ? styles.disabledLink : ""
            }`}
            title="Go to next splice"
          >
            Next <MdSkipNext />
          </Link>
        </div>
      </div>
    </div>
  );
}
