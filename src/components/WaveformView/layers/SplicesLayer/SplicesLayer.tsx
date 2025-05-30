import { useMemo, type ReactElement } from "react";
import type { Range, Size, Splice } from "../../../../types/types";
import { TimedLines } from "../TimedLinesLayer/TimedLinesLayer";
import { SplicesLayerLabel } from "./SplicesLayerLabel";

type Props = {
  size: Size;
  splices: Array<Splice>;
  viewPort: Range;
  audioDuration: number;
};

export function SplicesLayer({
  size,
  splices,
  viewPort,
  audioDuration,
}: Props): ReactElement {
  const timedLines = useMemo(() => {
    return splices.map(({ start }) => ({
      time: start,
    }));
  }, [splices]);

  return (
    <TimedLines
      viewPort={viewPort}
      size={size}
      timedLines={timedLines}
      defaultLineStyle="dashed"
      defaultColor="rgba(0,0,0,0.2)"
      itemRenderer={SplicesLayerLabel}
      maxTime={audioDuration}
    />
  );
}
