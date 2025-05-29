import type { Range } from "../../types/types";

export function getXPositionForTime({
  time,
  viewPort,
  viewWidth,
}: {
  time: number;
  viewWidth: number;
  viewPort: Range;
}): number {
  return (
    ((time - viewPort.start) / (viewPort.end - viewPort.start)) * viewWidth
  );
}
