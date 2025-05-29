import type { ReactElement } from "react";
import type { Range, Size } from "../../../../types/types";
import { getXPositionForTime } from "../../../../utils/waveview/getXPositionForTime";

type TimedLine = {
  time: number;
  color?: string;
  lineWidth?: number;
};

type Props = {
  size: Size;
  timedLines: Array<TimedLine>;
  viewPort: Range;
  defaultColor?: string;
  defaultLineWidth?: number;
};

export function TimedLines({
  size,
  timedLines,
  viewPort,
  defaultColor = "black",
  defaultLineWidth = 1,
}: Props): ReactElement {
  return (
    <div
      style={{
        ...size,
        pointerEvents: "none",
      }}
    >
      {timedLines.map(({ time, color, lineWidth }) => {
        const left = getXPositionForTime({
          time,
          viewPort,
          viewWidth: size.width,
        });

        return (
          <div
            style={{
              left,
              top: 0,
              position: "absolute",
              width: lineWidth ?? defaultLineWidth,
              height: size.height,
              borderLeft: `1px solid ${color ?? defaultColor}`,
            }}
          />
        );
      })}
    </div>
  );
}
