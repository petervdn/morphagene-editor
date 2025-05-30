import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import type { Range, ReelWithAudioBuffer, Size } from "../../../../types/types";
import { useAudioPlayer } from "../../../../hooks/useAudioPlayer";
import { TimedLines } from "../TimedLinesLayer/TimedLinesLayer";

type Props = {
  size: Size;
  viewPort: Range;
  reel: ReelWithAudioBuffer;
  audioDuration: number;
};

export function PlayheadLayer({
  size,
  viewPort,
  audioDuration,
}: Props): ReactElement {
  const audioPlayer = useAudioPlayer();
  const animationFrameRef = useRef<number | null>(null);
  const [playheadTime, setPlayheadTime] = useState<number | null>(null);

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

      setPlayheadTime(time);

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }

    if (isPlaying) {
      animate();
    } else {
      setPlayheadTime(null);
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

  const timedLines = useMemo(() => {
    return playheadTime ? [{ time: playheadTime }] : [];
  }, [playheadTime]);

  return (
    <TimedLines
      size={size}
      viewPort={viewPort}
      timedLines={timedLines}
      defaultColor="red"
      maxTime={audioDuration}
    />
  );
}
