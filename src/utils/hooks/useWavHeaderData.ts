import { useEffect, useState } from "react";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import { parseWavFileHeader, type WavHeaderData } from "../parseWavFileHeader";

export function useWavHeaderData(fileName: string): WavHeaderData | null {
  const directoryHandle = useDirectoryHandle();
  const [wavheaderData, setWavHeaderData] = useState<WavHeaderData | null>(
    null
  );

  useEffect(() => {
    async function parseWavFile() {
      if (!directoryHandle) {
        return;
      }
      const fileHandle = await directoryHandle.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      const result = await parseWavFileHeader(file);
      setWavHeaderData(result);
    }

    parseWavFile();
  }, [directoryHandle, fileName]);

  return wavheaderData;
}
