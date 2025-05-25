import { useMemo } from "react";
import type { Splice } from "../../types/types";
import { createSplicesFromCuePointTimes } from "../splices/createSplicesFromCuePointTimes";
import { useCuePointTimesStore } from "../../stores/cuePointTimesStore";

export function useSplices(): Array<Splice> | null {
  const cuePointTimes = useCuePointTimesStore((state) => state.cuePointTimes);

  return useMemo(() => {
    return cuePointTimes ? createSplicesFromCuePointTimes(cuePointTimes) : null;
  }, [cuePointTimes]);
}
