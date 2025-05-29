import { useMemo, type ReactElement } from "react";
import type { Range, ReelWithAudioBuffer, Size } from "../../../../types/types";
import { TimedLines } from "../TimedLinesLayer/TimedLinesLayer";

type Props = {
  size: Size;
  times: Array<number>;
  viewPort: Range;
  reel: ReelWithAudioBuffer;
};

export function AutoSlicesLayer({
  size,
  times,
  viewPort,
}: Props): ReactElement {
  const timedLines = useMemo(
    () =>
      times.map((time) => ({
        time,
      })),
    [times]
  );

  return <TimedLines size={size} viewPort={viewPort} timedLines={timedLines} />;
}
