import { useEffect, useState } from "react";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import { readWavFile, type WavHeaderProps } from "../readWavFile";

type ParsedWavFile = {
  headerProps: WavHeaderProps;
  audioBuffer: AudioBuffer;
};

export function useReadWavFile(fileName: string): ParsedWavFile | null {
  const directoryHandle = useDirectoryHandle();
  const [parsedWavFile, setParsedWavFile] = useState<ParsedWavFile | null>(
    null
  );

  useEffect(() => {
    async function parseWavFile() {
      if (!directoryHandle) {
        return;
      }
      const result = await readWavFile(fileName, directoryHandle);
      setParsedWavFile(result);
    }

    parseWavFile();
  }, [directoryHandle, fileName]);

  return parsedWavFile;
}
