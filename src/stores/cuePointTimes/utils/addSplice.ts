import { useCuePointTimesStore } from "../cuePointTimesStore";

export function addSplice(atTime: number): void {
  const currentCuePointTimes = useCuePointTimesStore.getState().cuePointTimes;
  if (!currentCuePointTimes) {
    throw new Error("No cue point times set in store");
  }
  const newCuePointTimes = [...currentCuePointTimes, atTime].sort(
    (a, b) => a - b
  );
  useCuePointTimesStore.setState({ cuePointTimes: newCuePointTimes });
}
