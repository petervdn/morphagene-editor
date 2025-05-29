import type { Range } from "../../types/types";

export function constrainViewPort(
  viewPort: Range,
  audioDuration: number
): Range {
  if (viewPort.start < 0) {
    return {
      start: 0,
      end: viewPort.end - viewPort.start,
    };
  }
  if (viewPort.end > audioDuration) {
    return {
      start: audioDuration - (viewPort.end - viewPort.start),
      end: audioDuration,
    };
  }

  return viewPort;
}
