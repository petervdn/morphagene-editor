import { useEffect, useState } from "react";
import type { Reel } from "../../types/types";
import { useAudioContext } from "./useAudioContext";
import { decodeAudioFile } from "../audio/decodeAudioFile";

export function useReelAudioBuffer(reel: Reel): AudioBuffer | null {
  const audioContext = useAudioContext();

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    async function getData() {
      const file = await reel.fileHandle.getFile();
      if (!audioContext || !file) {
        return;
      }
      const audioBufferFromFile = await decodeAudioFile(file, audioContext);
      setAudioBuffer(audioBufferFromFile);
    }
    getData();
  }, [audioContext, reel]);

  return audioBuffer;
}
