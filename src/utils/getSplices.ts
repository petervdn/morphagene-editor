import type { CuePoint } from "./parseWavFileHeader";

export type Splice = {
  start: number;
  end: number;
};

export function getSplices(cuePoints: Array<CuePoint>): Array<Splice> {
  if (cuePoints.length === 0) {
    throw new Error("File should always have at least one cuepoint");
  }

  return cuePoints.reduce<Array<Splice>>((accumulator, current, index) => {
    if (index === 0) {
      accumulator.push({
        start: 0,
        end: current.timeInSeconds,
      });
    } else {
      const prevItem = cuePoints.at(index - 1);
      if (!prevItem) {
        throw new Error("Missing item");
      }
      accumulator.push({
        start: prevItem.timeInSeconds,
        end: current.timeInSeconds,
      });
    }
    return accumulator;
  }, []);
}
