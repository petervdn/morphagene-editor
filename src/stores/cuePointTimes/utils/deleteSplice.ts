import type { Splice } from "../../../types/types";
import { useCuePointTimesStore } from "../cuePointTimesStore";

export function deleteSplice(splice: Splice): void {
  const currentCuePointTimes = useCuePointTimesStore.getState().cuePointTimes;
  if (!currentCuePointTimes || currentCuePointTimes.length === 0) {
    return;
  }
  const newCuePointTimes = currentCuePointTimes.filter(
    (time) => time !== splice.start
  );
  useCuePointTimesStore.setState({ cuePointTimes: newCuePointTimes });
}
