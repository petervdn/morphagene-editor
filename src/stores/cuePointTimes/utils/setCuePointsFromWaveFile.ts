import type { WaveFile } from "wavefile";
import { useCuePointTimesStore } from "../cuePointTimesStore";

export function setCuePointsFromWaveFile(waveFile: WaveFile) {
  const cuePointTimes = waveFile
    .listCuePoints()
    .map((cuePoint) => (cuePoint as { position: number }).position / 1000)
    .toSorted((a, b) => a - b);

  useCuePointTimesStore.setState({
    cuePointTimes,
    originalCuePointTimes: cuePointTimes,
  });
}
