import { useCuePointTimesStore } from "../stores/cuePointTimes/cuePointTimesStore";

export function useHasUnsavedCuePointsChanges(): boolean {
  const cuePointTimes = useCuePointTimesStore((state) => state.cuePointTimes);
  const originalCuePointTimes = useCuePointTimesStore(
    (state) => state.originalCuePointTimes
  );

  return (
    JSON.stringify(cuePointTimes) !== JSON.stringify(originalCuePointTimes)
  );
}
