import { createWaveFile } from "./createWaveFile";

export async function writeWavFile({
  audioBuffer,
  cuePointTimes,
  fileHandle,
}: {
  fileHandle: FileSystemFileHandle;
  audioBuffer: AudioBuffer;
  cuePointTimes: Array<number>;
}): Promise<void> {
  const writable = await fileHandle.createWritable();
  const waveFile = createWaveFile(audioBuffer, cuePointTimes);
  const wavBlob = waveFile.toBuffer();

  await writable.write({ type: "write", data: wavBlob });
  await writable.close();
}
