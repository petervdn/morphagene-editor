import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { audioPlayerContext } from "../utils/audio/audioPlayerContext";
import { playSplice, type PlayingSound } from "../utils/audio/playSplice";
import type { Splice } from "../types/types";
import { useAudioContext } from "../hooks/useAudioContext";

type PlaySoundProps = { audioBuffer: AudioBuffer; splice: Splice };

export type AudioPlayerProps = {
  playingSound: PlayingSound | null;
  playSound: (props: PlaySoundProps) => void;
  audioContext: AudioContext | null;
};

export function AudioPlayerProvider({ children }: PropsWithChildren) {
  const audioContext = useAudioContext();
  const [playingSound, setPlayingSound] = useState<PlayingSound | null>(null);

  const playSound = useCallback(
    ({ audioBuffer, splice }: PlaySoundProps) => {
      async function play() {
        if (!audioContext) {
          return;
        }
        if (playingSound) {
          playingSound.stop(true);
        }

        const newPlayingSound = await playSplice({
          audioBuffer,
          splice,
          audioContext,
          onEnded: () => {
            setPlayingSound(null);
          },
        });
        setPlayingSound(newPlayingSound);
      }

      play();
    },
    [audioContext, playingSound]
  );

  const contextValue: AudioPlayerProps = useMemo(() => {
    return { playSound, playingSound, audioContext };
  }, [playSound, playingSound, audioContext]);

  return (
    <audioPlayerContext.Provider value={contextValue}>
      {children}
    </audioPlayerContext.Provider>
  );
}
