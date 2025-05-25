import { useEffect } from "react";
import {
  clearCuePointTimes,
  setCuePointsFromWavHeaderData,
} from "../stores/cuePointTimesStore";
import type { Reel } from "../types/types";

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
