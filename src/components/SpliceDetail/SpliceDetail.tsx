import { useCallback, type ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsTrash, BsPlayCircle, BsStopCircle, BsZoomIn } from "react-icons/bs";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { RiScissorsCutLine } from "react-icons/ri";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";
import styles from "./SpliceDetail.module.css";
import type { Splice } from "../../types/types";
import { getSplicePath } from "../../routes/routes";

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
  const { spliceIndex: spliceIndexParam } = useParams();
  const navigate = useNavigate();
  const audioPlayerProps = useAudioPlayer();
  
  // Parse the splice index from the URL parameter
  const spliceIndex = parseInt(spliceIndexParam || "0", 10);
  
  // Get the current splice
  const splice = splices[spliceIndex];
  
  // Check if this is the first or last splice
  const isFirstSplice = spliceIndex === 0;
  const isLastSplice = spliceIndex === splices.length - 1;
  
  // Calculate splice duration
  const spliceDuration = splice ? (splice.end - splice.start).toFixed(2) : "0";
  
  // Check if the splice is currently playing
  const isPlaying = audioPlayerProps?.playingSound?.splice === splice;
  
  // Handle play/stop
  const handlePlayToggle = useCallback(() => {
    if (isPlaying) {
      audioPlayerProps.playingSound?.stop();
    } else if (splice && audioBuffer) {
      audioPlayerProps.playSound({ audioBuffer, splice });
    }
  }, [isPlaying, audioPlayerProps, splice, audioBuffer]);
  
  // Handle delete
  const handleDelete = useCallback(() => {
    if (onDeleteSplice && !isFirstSplice) {
      onDeleteSplice(spliceIndex);
      
      // Navigate to the previous splice if available, otherwise to the next one
      if (spliceIndex > 0) {
        navigate(getSplicePath(reelId, spliceIndex - 1), { replace: true });
      } else if (splices.length > 1) {
        navigate(getSplicePath(reelId, 0), { replace: true });
      }
    }
  }, [onDeleteSplice, isFirstSplice, spliceIndex, navigate, reelId, splices.length]);
  
  // Handle zoom
  const handleZoom = useCallback(() => {
    if (onZoomToSplice && splice) {
      onZoomToSplice(splice.start, splice.end);
    }
  }, [onZoomToSplice, splice]);
  
  // Handle navigation to previous splice
  const handlePrevSplice = useCallback(() => {
    if (spliceIndex > 0) {
      navigate(getSplicePath(reelId, spliceIndex - 1));
    }
  }, [navigate, reelId, spliceIndex]);
  
  // Handle navigation to next splice
  const handleNextSplice = useCallback(() => {
    if (spliceIndex < splices.length - 1) {
      navigate(getSplicePath(reelId, spliceIndex + 1));
    }
  }, [navigate, reelId, spliceIndex, splices.length]);
  
  if (!splice) {
    return <div>Splice not found</div>;
  }
  
  return (
    <div className={styles.spliceDetail}>
      <div className={styles.spliceHeader}>
        <h3 className={styles.spliceTitle}>
          <RiScissorsCutLine /> Splice {spliceIndex + 1}
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
        <button
          className={styles.navButton}
          onClick={handlePrevSplice}
          disabled={isFirstSplice}
          type="button"
          title="Go to previous splice"
        >
          <MdSkipPrevious /> Previous Splice
        </button>
        
        <button
          className={styles.navButton}
          onClick={handleNextSplice}
          disabled={isLastSplice}
          type="button"
          title="Go to next splice"
        >
          Next Splice <MdSkipNext />
        </button>
      </div>
    </div>
  );
}
