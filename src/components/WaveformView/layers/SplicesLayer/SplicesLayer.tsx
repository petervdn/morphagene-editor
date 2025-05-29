import { useMemo, type ReactElement } from "react";
import type { Range, Size, Splice } from "../../../../types/types";
import { TimedLines } from "../TimedLinesLayer/TimedLinesLayer";

type Props = {
  size: Size;
  splices: Array<Splice>;
  viewPort: Range;
};

export function SplicesView({ size, splices, viewPort }: Props): ReactElement {
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
    />
  );
}
