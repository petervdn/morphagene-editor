import { useEffect, useState } from "react";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import { parseWavFileHeader, type WavHeaderData } from "../parseWavFileHeader";
import { getReelFile } from "../getReelFile";

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

      const file = await getReelFile(fileName, directoryHandle);
      const result = await parseWavFileHeader(file);
      setWavHeaderData(result);
    }

    parseWavFile();
  }, [directoryHandle, fileName]);

  return wavheaderData;
}
