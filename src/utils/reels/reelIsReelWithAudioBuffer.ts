import type { Reel, ReelWithAudioBuffer } from "../../types/types";

export function reelIsReelWithAudioBuffer(
  reel: Reel
): reel is ReelWithAudioBuffer {
  return reel.audioBuffer !== null;
}
