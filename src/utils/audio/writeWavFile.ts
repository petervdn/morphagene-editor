import { createWavBlobWithCuePoints } from "./createWavBlobWithCuePoints";

export async function writeWavFile({
  audioBuffer,
  cuePointTimes,
  fileHandle,
}: {
  fileHandle: FileSystemFileHandle;
  audioBuffer: AudioBuffer;
  cuePointTimes: Array<number>;
}): Promise<void> {
  const wavBlob = await createWavBlobWithCuePoints(audioBuffer, cuePointTimes);

  const writable = await fileHandle.createWritable();
  await writable.write(wavBlob);
  await writable.close();
}
