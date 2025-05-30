import { useMemo, type ReactElement } from "react";
import type { Range, Size } from "../../../../types/types";
import { TimedLines } from "../TimedLinesLayer/TimedLinesLayer";

type Props = {
  size: Size;
  autoSliceTimes: Array<number> | null | undefined;
  viewPort: Range;
  audioDuration: number;
};

export function AutoSlicesLayer({
  size,
  autoSliceTimes,
  viewPort,
  audioDuration,
}: Props): ReactElement | null {
  const timedLines = useMemo(
    () =>
      autoSliceTimes?.map((time) => ({
        time,
      })) ?? null,
    [autoSliceTimes]
  );

  return (
    timedLines && (
      <TimedLines
        size={size}
        viewPort={viewPort}
        timedLines={timedLines}
        maxTime={audioDuration}
      />
    )
  );
}
