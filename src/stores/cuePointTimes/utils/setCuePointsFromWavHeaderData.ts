import type { WavHeaderData } from "../../../types/types";
import { getCuePointTimesFromWavHeader } from "../../../utils/splices/getCuePointTimesFromWavHeader";
import { useCuePointTimesStore } from "../cuePointTimesStore";

export function setCuePointsFromWavHeaderData(wavHeaderData: WavHeaderData) {
  const cuePointTimes = getCuePointTimesFromWavHeader(wavHeaderData);
  useCuePointTimesStore.setState({
    cuePointTimes,
    originalCuePointTimes: cuePointTimes,
  });
}
