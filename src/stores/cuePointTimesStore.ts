import { create } from "zustand";
import type { WavHeaderData } from "../types/types";

type CuePointTimesStore = {
  // initially set by loaded wav header data, can be modified by user
  cuePointTimes: Array<number> | null;
  // only set by loaded wav header, used to check if there are unsaved changes
  originalCuePointTimes: Array<number> | null;
};

export const useCuePointTimesStore = create<CuePointTimesStore>(() => ({
  cuePointTimes: null,
  originalCuePointTimes: [],
}));

export const setCuePointsFromWavHeaderData = (wavHeaderData: WavHeaderData) => {
  const cuePointTimes = getCuePointTimesFromWavHeader(wavHeaderData);
  useCuePointTimesStore.setState({
    cuePointTimes,
    originalCuePointTimes: cuePointTimes,
  });
};

function getCuePointTimesFromWavHeader(
  wavHeaderData: WavHeaderData
): Array<number> {
  return wavHeaderData.cuePoints
    .map(({ timeInSeconds }) => timeInSeconds)
    .toSorted((a, b) => a - b);
}

export function addCuePointTime(time: number): void {
  const currentCuePointTimes = useCuePointTimesStore.getState().cuePointTimes;
  if (!currentCuePointTimes) {
    throw new Error("No cue point times set in store");
  }
  const newCuePointTimes = [...currentCuePointTimes, time].sort(
    (a, b) => a - b
  );
  useCuePointTimesStore.setState({ cuePointTimes: newCuePointTimes });
}
