import { useMemo, useState } from "react";
import type { Reel } from "../../types/types";

type Props = {
  reel: Reel;
};

/**
 * CuePointTimes are the times of the cuepoints that are retrieved
 * from the wav header data. These times serve as origin for our Splices
 * (which are computed directly from this list of cuePointTimes).
 *
 * @param param0
 * @returns
 */

export function useCuePointTimes({ reel }: Props) {
  const [cuePointTimes, setCuePointTimes] = useState<Array<number>>(() =>
    (reel?.wavHeaderData?.cuePoints || []).map(
      ({ timeInSeconds }) => timeInSeconds
    )
  );

  const orderedCuePointTimes = useMemo(() => {
    return cuePointTimes.toSorted((a, b) => a - b);
  }, [cuePointTimes]);

  return { cuePointTimes: orderedCuePointTimes, setCuePointTimes };
}
