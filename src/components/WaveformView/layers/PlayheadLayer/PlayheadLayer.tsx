import { useEffect, useRef, useState, type ReactElement } from "react";
import type { Range, ReelWithAudioBuffer, Size } from "../../../../types/types";
import styles from "./PlayheadLayer.module.css";
import { getXPositionForTime } from "../../../../utils/getXPositionForTime";
import { useAudioPlayer } from "../../../../hooks/useAudioPlayer";

type Props = {
  size: Size;
  viewPort: Range;
  reel: ReelWithAudioBuffer;
};

export function PlayheadLayer({ size, viewPort }: Props): ReactElement {
  const audioPlayer = useAudioPlayer();
  const animationFrameRef = useRef<number | null>(null);
  const [playheadPosition, setPlayheadPosition] = useState<number | null>(null);

  const isPlaying = audioPlayer?.playingSound;

  useEffect(() => {
    function animate() {
      if (!audioPlayer?.playingSound || !audioPlayer.audioContext) {
        return;
      }

      const time =
        audioPlayer.audioContext.currentTime -
        audioPlayer.playingSound.contextStartTime +
        audioPlayer.playingSound.splice.start;

      setPlayheadPosition(
        getXPositionForTime({
          time,
          viewPort,
          viewWidth: size.width,
        })
      );

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }

    if (isPlaying) {
      animate();
    } else {
      setPlayheadPosition(null);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    audioPlayer?.audioContext,
    audioPlayer?.playingSound,
    isPlaying,
    size.width,
    viewPort,
  ]);

  return (
    <div
      className={styles.wrapper}
      style={{ width: size.width, height: size.height }}
    >
      {playheadPosition !== null && (
        <div
          style={{
            left: playheadPosition,
            width: 10,
            height: size.height,
            borderLeft: "1px solid red",
            position: "absolute",
          }}
        ></div>
      )}
    </div>
  );
}
