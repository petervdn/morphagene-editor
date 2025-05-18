import { useContext } from "react";
import { audioPlayerContext } from "../audio/audioPlayerContext";
import type { AudioPlayerProps } from "../../context/AudioPlayerProvider";

export function useAudioPlayer(): AudioPlayerProps | null {
  const context = useContext(audioPlayerContext);

  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }

  return context;
}
