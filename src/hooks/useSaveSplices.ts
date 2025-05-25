import { useCallback } from "react";
import type { ReelWithAudioBuffer } from "../types/types";
import { useCuePointTimesStore } from "../stores/cuePointTimes/cuePointTimesStore";
import { writeWavFile } from "../utils/audio/writeWavFile";
import { reloadWaveFile } from "../utils/reels/reloadReelWavHeaderData";

// a bit weird that we have to pass the reel but get the cuePointTimes from elsewhere
export function useSaveSplices({ reel }: { reel: ReelWithAudioBuffer }) {
  const cuePointTimes = useCuePointTimesStore((state) => state.cuePointTimes);

  return useCallback(async () => {
    if (!cuePointTimes) {
      return;
    }

    await writeWavFile({
      audioBuffer: reel.audioBuffer,
      cuePointTimes,
      fileHandle: reel.fileHandle,
    });

    // reloading will make sure ui is up to date again
    reloadWaveFile(reel);
  }, [cuePointTimes, reel]);
}
