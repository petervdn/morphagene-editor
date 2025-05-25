import { useEffect } from "react";
import type { Reel } from "../types/types";
import { setCuePointsFromWavHeaderData } from "../stores/cuePointTimes/utils/setCuePointsFromWavHeaderData";
import { clearCuePointTimes } from "../stores/cuePointTimes/utils/clearCuePointTimes";

type Props = {
  reel: Reel;
};

export function useSyncCuePointsToStore({ reel }: Props): void {
  useEffect(() => {
    setCuePointsFromWavHeaderData(reel.wavHeaderData);

    return () => {
      clearCuePointTimes();
    };
  }, [reel.wavHeaderData]);
}
