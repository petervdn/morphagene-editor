import { useCallback, type ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsTrash, BsPlayCircle, BsStopCircle, BsZoomIn } from "react-icons/bs";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { RiScissorsCutLine } from "react-icons/ri";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";
import styles from "./SpliceDetail.module.css";
import type { Splice } from "../../types/types";
import { getSplicePath } from "../../routes/routes";
import { useSplice } from "../../utils/hooks/useSplice";

type Props = {
  splices: Array<Splice>;
  audioBuffer: AudioBuffer;
  reelId: string;
  onDeleteSplice: (index: number) => void;
  onZoomToSplice: (start: number, end: number) => void;
};

export function SpliceDetail({
  splices,
  audioBuffer,
  reelId,
  onDeleteSplice,
  onZoomToSplice,
}: Props): ReactElement {
  // const { spliceIndex: spliceIndexParam } = useParams();
  const navigate = useNavigate();
  const audioPlayerProps = useAudioPlayer();
  const {
    isFirstSplice,
    isLastSplice,
    splice,
    spliceDuration,
    spliceIndex,
    spliceId,
  } = useSplice(splices);

  // Check if the splice is currently playing
  const isPlaying = audioPlayerProps?.playingSound?.splice === splice;

  // Handle play/stop
  const handlePlayToggle = useCallback(() => {
    if (!audioPlayerProps) {
      return;
    }
    if (isPlaying) {
      audioPlayerProps.playingSound?.stop();
    } else if (splice && audioBuffer) {
      audioPlayerProps.playSound({ audioBuffer, splice });
    }
  }, [isPlaying, audioPlayerProps, splice, audioBuffer]);

  // Handle delete
  const handleDelete = useCallback(() => {
    if (spliceIndex === undefined || spliceId === undefined) {
      return;
    }

    if (onDeleteSplice && !isFirstSplice) {
      onDeleteSplice(spliceIndex);

      // Navigate to the previous splice if available, otherwise to the next one
      // if (spliceIndex > 0) {
      //   navigate(getSplicePath(reelId, spliceId), { replace: true });
      // } else if (splices.length > 1) {
      //   navigate(getSplicePath(reelId, 0), { replace: true });
      // }
      navigate(getSplicePath(reelId, "1"), { replace: true });
    }
  }, [spliceIndex, spliceId, onDeleteSplice, isFirstSplice, navigate, reelId]);

  // Handle zoom
  const handleZoom = useCallback(() => {
    if (onZoomToSplice && splice) {
      onZoomToSplice(splice.start, splice.end);
    }
  }, [onZoomToSplice, splice]);

  // Navigation is now handled directly by Link components

  if (!splice || typeof spliceIndex !== "number") {
    return <div>Splice not found</div>;
  }

  return (
    <div className={styles.spliceDetail}>
      <div className={styles.spliceHeader}>
        <h3 className={styles.spliceTitle}>
          <RiScissorsCutLine /> Splice {spliceId}
        </h3>
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
          <span className={styles.infoValue}>{spliceDuration}s</span>
        </div>
      </div>

      <div className={styles.spliceActions}>
        <button
          className={`${styles.actionButton} ${styles.playButton}`}
          onClick={handlePlayToggle}
          type="button"
          title={isPlaying ? "Stop playback" : "Play splice"}
        >
          {isPlaying ? (
            <>
              <BsStopCircle /> Stop
            </>
          ) : (
            <>
              <BsPlayCircle /> Play
            </>
          )}
        </button>

        <button
          className={`${styles.actionButton} ${styles.zoomButton}`}
          onClick={handleZoom}
          type="button"
          title="Zoom to splice"
        >
          <BsZoomIn /> Zoom to Splice
        </button>

        <button
          className={`${styles.actionButton} ${styles.deleteButton} ${
            isFirstSplice ? styles.disabledButton : ""
          }`}
          onClick={handleDelete}
          disabled={isFirstSplice}
          type="button"
          title={isFirstSplice ? "Cannot delete first splice" : "Delete splice"}
        >
          <BsTrash /> Delete
        </button>
      </div>

      <div className={styles.navigationButtons}>
        <Link
          to={
            spliceIndex > 0 ? getSplicePath(reelId, String(spliceIndex)) : "#"
          }
          className={`${styles.navButton} ${
            isFirstSplice ? styles.disabledLink : ""
          }`}
          onClick={(e) => isFirstSplice && e.preventDefault()}
          title="Go to previous splice"
        >
          <MdSkipPrevious /> Previous Splice
        </Link>

        <Link
          to={
            spliceIndex < splices.length - 1
              ? getSplicePath(reelId, String(spliceIndex + 2))
              : "#"
          }
          className={`${styles.navButton} ${
            isLastSplice ? styles.disabledLink : ""
          }`}
          onClick={(e) => isLastSplice && e.preventDefault()}
          title="Go to next splice"
        >
          <MdSkipNext /> Next Splice
        </Link>
      </div>
    </div>
  );
}
