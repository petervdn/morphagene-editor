import { useCallback, type ReactElement } from "react";
import { BsTrash, BsPlayCircle, BsStopCircle, BsZoomIn } from "react-icons/bs";
import { RiScissorsCutLine } from "react-icons/ri";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";
import styles from "./SpliceDetail.module.css";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import { usePathParams } from "../../utils/hooks/usePathParams";
import { WaveformView } from "../WaveformView/layers/WaveformView";
import { useWaveformView } from "../WaveformView/hooks/useWaveformView";

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
  const audioPlayerProps = useAudioPlayer();

  const isPlaying = audioPlayerProps?.playingSound?.splice === splice;

  const waveformViewProps = useWaveformView({ reel });

  const handlePlayToggle = useCallback(() => {
    if (!audioPlayerProps) {
      return;
    }
    if (isPlaying) {
      audioPlayerProps.playingSound?.stop();
    } else {
      audioPlayerProps.playSound({ audioBuffer: reel.audioBuffer, splice });
    }
  }, [audioPlayerProps, isPlaying, reel.audioBuffer, splice]);

  return (
    <div className={styles.spliceDetail}>
      <div className={styles.spliceHeader}>
        <h3 className={styles.spliceTitle}>
          <RiScissorsCutLine /> Splice {spliceId}{" "}
          <small>of {totalAmountOfSplices}</small>
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
          <span className={styles.infoValue}>{2}s</span>
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
          type="button"
          title="Zoom to splice"
        >
          <BsZoomIn /> Zoom to Splice
        </button>

        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          type="button"
        >
          <BsTrash /> Delete
        </button>
      </div>

      <WaveformView splices={[]} {...waveformViewProps} viewPort={splice} />
    </div>
  );
}
