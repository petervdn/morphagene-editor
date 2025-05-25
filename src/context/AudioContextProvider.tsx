import { useEffect, useState, type PropsWithChildren } from "react";
import { audioContextContext } from "../utils/audio/audioContextContext";

export function AudioContextProvider({ children }: PropsWithChildren) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 48000,
    });

    setAudioContext(context);
  }, []);

  return (
    <audioContextContext.Provider value={audioContext}>
      {children}
    </audioContextContext.Provider>
  );
}
