import { useCuePointTimesStore } from "../cuePointTimesStore";

export function clearCuePointTimes() {
  useCuePointTimesStore.setState({
    cuePointTimes: null,
    originalCuePointTimes: null,
  });
}
