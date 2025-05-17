import { useContext } from "react";
import { audioContextContext } from "../audio/audioContextContext";

export function useAudioContext(): AudioContext | null {
  const context = useContext(audioContextContext);

  if (context === undefined) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider"
    );
  }

  return context;
}
