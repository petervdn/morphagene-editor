import { useEffect, useState } from "react";
import { useAudioContext } from "./useAudioContext";
import { decodeAudioFile } from "../utils/audio/decodeAudioFile";
import type { Reel } from "../types/types";

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
