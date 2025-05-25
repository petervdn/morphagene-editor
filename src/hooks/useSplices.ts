import { useMemo } from "react";
import { useCuePointTimesStore } from "../stores/cuePointTimesStore";
import type { Splice } from "../types/types";
import { createSplicesFromCuePointTimes } from "../utils/splices/createSplicesFromCuePointTimes";

export function useSplices(): Array<Splice> | null {
  const cuePointTimes = useCuePointTimesStore((state) => state.cuePointTimes);

  return useMemo(() => {
    return cuePointTimes ? createSplicesFromCuePointTimes(cuePointTimes) : null;
  }, [cuePointTimes]);
}
