import type { WavHeaderData } from "../../types/types";
import { createWavWithCuePoints } from "./saveWavWithCuePoints";

export async function saveCuePointsToFile({
  audioBuffer,
  cuePointTimes,
  fileHandle,
  originalHeaderData,
}: {
  fileHandle: FileSystemFileHandle;
  audioBuffer: AudioBuffer;
  cuePointTimes: Array<number>;
  originalHeaderData: WavHeaderData;
}): Promise<void> {
  // Create the WAV Blob with updated cue points
  const wavBlob = await createWavWithCuePoints(
    audioBuffer,
    cuePointTimes,
    originalHeaderData
  );

  // Write the Blob to the file system
  const writable = await fileHandle.createWritable();
  await writable.write(wavBlob);
  await writable.close();
}
