import type { ReactElement } from "react";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";
import styles from "./PlayControls.module.css";

export function PlayControls(): ReactElement | null {
  const audioPlayerProps = useAudioPlayer();

  const onStopClick = () => {
    audioPlayerProps?.playingSound?.stop();
  };

  const onStartClick = () => {};

  if (!audioPlayerProps) {
    return null;
  }

  return (
    <div className={styles.playControls}>
      {audioPlayerProps.playingSound ? (
        <button className={styles.controlButton} onClick={onStopClick}>Stop</button>
      ) : (
        <button className={styles.controlButton} onClick={onStartClick}>Start</button>
      )}
    </div>
  );
}
