import type { ReactElement } from "react";
import type { Range, Size } from "../../../../types/types";
import { getXPositionForTime } from "../../../../utils/waveview/getXPositionForTime";

type LineStyle = "solid" | "dotted" | "dashed";

type TimedLine = {
  time: number;
  color?: string;
  lineWidth?: number;
  lineStyle?: LineStyle;
};

type Props = {
  size: Size;
  timedLines: Array<TimedLine>;
  viewPort: Range;
  defaultColor?: string;
  defaultLineWidth?: number;
  defaultLineStyle?: LineStyle;
};

export function TimedLines({
  size,
  timedLines,
  viewPort,
  defaultColor = "black",
  defaultLineWidth = 1,
  defaultLineStyle = "solid",
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
            key={time}
            style={{
              left,
              top: 0,
              position: "absolute",

              height: size.height,
              borderLeft: `${
                lineWidth ?? defaultLineWidth
              }px ${defaultLineStyle} ${color ?? defaultColor}`,
            }}
          />
        );
      })}
    </div>
  );
}
