import { WaveFile } from "wavefile";
import { setWaveFileForReel } from "../../stores/folderContentStore";
import type { Reel } from "../../types/types";

export async function reloadWaveFile(reel: Reel): Promise<void> {
  const file = await reel.fileHandle.getFile();
  const waveFile = await createWaveFileFromFile(file);
  setWaveFileForReel({ reelId: reel.id, waveFile });
}

export async function createWaveFileFromFile(file: File): Promise<WaveFile> {
  const waveFile = new WaveFile();
  const arrayBuffer = await file.arrayBuffer();
  waveFile.fromBuffer(new Uint8Array(arrayBuffer));
  return waveFile;
}
