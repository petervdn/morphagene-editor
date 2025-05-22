import { useEffect } from "react";
import { setAudioBufferForReel } from "../../stores/folderContentStore";
import type { ReelWithAudioBuffer } from "../../types/types";
import { decodeAudioFile } from "../audio/decodeAudioFile";
import { useAudioContext } from "./useAudioContext";
import { useGetReelById } from "./useGetReelById";
import { reelIsReelWithAudioBuffer } from "../reels/reelIsReelWithAudioBuffer";

/**
 * Will get the reel with the given id from the store, checks if
 * it has an audiobuffer and loads it if it hasn't. So the returned
 * item will always have an audioBuffer set.
 *
 * @param reelId
 * @returns
 */
export function useGetReelWithAudioBuffer(
  reelId: string
): ReelWithAudioBuffer | null {
  const reel = useGetReelById(reelId);
  const audioContext = useAudioContext();

  useEffect(() => {
    async function load() {
      if (reel && !reel.audioBuffer) {
        if (!audioContext || !reelId) {
          return;
        }
        const file = await reel.fileHandle.getFile();
        const audioBuffer = await decodeAudioFile(file, audioContext);
        setAudioBufferForReel({ audioBuffer, reelId });
      }
    }
    load();
  }, [audioContext, reel, reelId]);

  return reel && reelIsReelWithAudioBuffer(reel) ? reel : null;
}
