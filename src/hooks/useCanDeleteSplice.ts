import { useCuePointTimesStore } from "../stores/cuePointTimes/cuePointTimesStore";
import type { Splice } from "../types/types";

export function useCanDeleteSplice(splice: Splice): boolean {
  const currentCuePointTimes = useCuePointTimesStore.getState().cuePointTimes;

  return (
    currentCuePointTimes !== null &&
    currentCuePointTimes.length > 1 &&
    splice.start !== 0
  );
}
