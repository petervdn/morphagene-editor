import type { Splice } from "../../types/types";

export function createSplicesFromCuePointTimes(
  times: Array<number>
): Array<Splice> {
  if (times.length === 0) {
    throw new Error("There should always be at least one marker");
  }

  return times.reduce<Array<Splice>>((accumulator, current, index) => {
    if (index === 0) {
      accumulator.push({
        start: 0,
        end: current,
      });
    } else {
      const prevItem = times.at(index - 1);
      if (!prevItem) {
        throw new Error("Missing item");
      }
      accumulator.push({
        start: prevItem,
        end: current,
      });
    }
    return accumulator;
  }, []);
}
