import { useEffect, useState, type PropsWithChildren } from "react";
import { audioContextContext } from "../utils/audioContextContext";

export function AudioContextProvider({ children }: PropsWithChildren) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();

    setAudioContext(context);
  }, []);

  return (
    <audioContextContext.Provider value={audioContext}>
      {children}
    </audioContextContext.Provider>
  );
}
