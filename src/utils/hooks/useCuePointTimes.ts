import { useEffect, useMemo, useRef, useState } from "react";
import type { Reel, WavHeaderData } from "../../types/types";

type Props = {
  reel: Reel;
};

function getCuePointTimesFromWavHeader(
  wavHeaderData: WavHeaderData
): Array<number> {
  return wavHeaderData.cuePoints
    .map(({ timeInSeconds }) => timeInSeconds)
    .toSorted((a, b) => a - b);
}

function stringifyCuePointTimes(cuePointTimes: Array<number>): string {
  return JSON.stringify(cuePointTimes);
}

/**
 * CuePointTimes are the times of the cuepoints that are retrieved
 * from the wav header data. These times serve as origin for our Splices
 * (which are computed directly from this list of cuePointTimes).
 *
 * @param param0
 * @returns
 */
export function useCuePointTimes({ reel }: Props) {
  // we store this only to use it to set the initial values for both
  // originalCuePointTimes & cuePointTimes from this same source
  // (after that, this value is no longer relevant or used)
  const initialTimes = useRef(
    getCuePointTimesFromWavHeader(reel.wavHeaderData)
  );

  // used to compare current cuePoints against, to see if there
  // are unsaved changes
  const originalCuePointTimesAsString = useRef<string | undefined>(
    stringifyCuePointTimes(initialTimes.current)
  );

  // the current cuePointsTimes. are initialized from values from the
  // wav header, but can be altered by the user (resulting in unsaved
  // changes)
  const [cuePointTimes, setCuePointTimes] = useState<Array<number>>(
    initialTimes.current
  );

  useEffect(() => {
    const times = getCuePointTimesFromWavHeader(reel.wavHeaderData);
    originalCuePointTimesAsString.current = stringifyCuePointTimes(times);

    setCuePointTimes(times);
  }, [reel.wavHeaderData]);

  const hasUnsavedChanges = useMemo(() => {
    return (
      stringifyCuePointTimes(cuePointTimes) !==
      originalCuePointTimesAsString.current
    );
  }, [cuePointTimes]);

  return {
    cuePointTimes,
    setCuePointTimes,
    hasUnsavedChanges,
  };
}
