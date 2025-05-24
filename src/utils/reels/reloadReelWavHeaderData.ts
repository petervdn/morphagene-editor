import { setWavHeaderDataForReel } from "../../stores/folderContentStore";
import type { Reel } from "../../types/types";
import { parseWavFileHeader } from "../audio/parseWavFileHeader";

export async function reloadReelWavHeaderData(reel: Reel): Promise<void> {
  const file = await reel.fileHandle.getFile();
  const wavHeaderData = await parseWavFileHeader(file);
  setWavHeaderDataForReel({ reelId: reel.id, wavHeaderData });
}
