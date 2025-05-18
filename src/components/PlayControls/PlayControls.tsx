import type { ReactElement } from "react";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";

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
    <div>
      {audioPlayerProps.playingSound ? (
        <button onClick={onStopClick}>stop</button>
      ) : (
        <button onClick={onStartClick}>start</button>
      )}
    </div>
  );
}
