import { useCuePointTimesStore } from "../../stores/cuePointTimes/cuePointTimesStore";
import type { Splice } from "../../types/types";

type Props = {
  splice: Splice;
  division: number;
};

export function autoSliceByDivision({ division, splice }: Props): void {
  const times: Array<number> = [];
  const duration = splice.end - splice.start;
  const partDuration = duration / division;

  for (let i = 1; i < division; i++) {
    times.push(splice.start + i * partDuration);
  }

  useCuePointTimesStore.setState({
    autoSliceCuePointTimes: times,
  });
}
