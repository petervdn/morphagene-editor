import type { WavHeaderData } from "../../types/types";

export function getCuePointTimesFromWavHeader(
  wavHeaderData: WavHeaderData
): Array<number> {
  return wavHeaderData.cuePoints
    .map(({ timeInSeconds }) => timeInSeconds)
    .toSorted((a, b) => a - b);
}
