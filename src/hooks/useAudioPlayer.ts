import { useContext } from "react";
import type { AudioPlayerProps } from "../context/AudioPlayerProvider";
import { audioPlayerContext } from "../utils/audio/audioPlayerContext";

export function useAudioPlayer(): AudioPlayerProps | null {
  const context = useContext(audioPlayerContext);

  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }

  return context;
}
