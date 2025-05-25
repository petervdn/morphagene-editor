import { useEffect } from "react";
import type { Reel } from "../types/types";
import { setCuePointsFromWaveFile } from "../stores/cuePointTimes/utils/setCuePointsFromWaveFile";
import { clearCuePointTimes } from "../stores/cuePointTimes/utils/clearCuePointTimes";

type Props = {
  reel: Reel;
};

export function useSyncCuePointsToStore({ reel }: Props): void {
  useEffect(() => {
    setCuePointsFromWaveFile(reel.waveFile);

    return () => {
      clearCuePointTimes();
    };
  }, [reel.waveFile]);
}
