import { useEffect, useState } from "react";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import { useAudioContext } from "./useAudioContext";
import { getReelFile } from "../getReelFile";
import { decodeAudioFile } from "../audio/decodeAudioFile";

export function useAudioBufferFromFile(fileName: string) {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const directoryHandle = useDirectoryHandle();
  const audioContext = useAudioContext();
  useEffect(() => {
    async function getAudioBuffer() {
      if (!audioContext || !directoryHandle || !fileName) {
        return;
      }
      const file = await getReelFile(fileName, directoryHandle);
      const buffer = await decodeAudioFile(file, audioContext);

      setAudioBuffer(buffer);
    }

    getAudioBuffer();
  }, [audioContext, directoryHandle, fileName]);

  return audioBuffer;
}
