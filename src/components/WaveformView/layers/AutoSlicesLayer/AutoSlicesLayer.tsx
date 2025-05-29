import { useMemo, type ReactElement } from "react";
import type { Range, ReelWithAudioBuffer, Size } from "../../../../types/types";
import { TimedLines } from "../TimedLinesLayer/TimedLinesLayer";

type Props = {
  size: Size;
  autoSliceTimes: Array<number> | null | undefined;
  viewPort: Range;
  reel: ReelWithAudioBuffer;
};

export function AutoSlicesLayer({
  size,
  autoSliceTimes,
  viewPort,
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
      <TimedLines size={size} viewPort={viewPort} timedLines={timedLines} />
    )
  );
}
