import type { Marker, Splice } from "../types/types";

export function createSplicesFromMarkers(
  markers: Array<Marker>
): Array<Splice> {
  if (markers.length === 0) {
    // Return an empty array instead of throwing an error
    return [];
  }

  return markers.reduce<Array<Splice>>((accumulator, current, index) => {
    if (index === 0) {
      accumulator.push({
        start: 0,
        end: current.time,
      });
    } else {
      const prevItem = markers.at(index - 1);
      if (!prevItem) {
        throw new Error("Missing item");
      }
      accumulator.push({
        start: prevItem.time,
        end: current.time,
      });
    }
    return accumulator;
  }, []);
}
