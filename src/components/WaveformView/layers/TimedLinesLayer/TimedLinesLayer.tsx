import { useMemo, type ComponentType, type ReactElement } from "react";
import type { Range, Size } from "../../../../types/types";
import { getXPositionForTime } from "../../../../utils/waveview/getXPositionForTime";

type LineStyle = "solid" | "dotted" | "dashed";

type TimedLine = {
  time: number;
  color?: string;
  lineWidth?: number;
  lineStyle?: LineStyle;
};

export type TimedLinesItemRendererProps = {
  time: number;
  index: number;
  width: number | undefined;
  height: number;
};

type Props = {
  size: Size;
  timedLines: Array<TimedLine>;
  viewPort: Range;
  defaultColor?: string;
  defaultLineWidth?: number;
  defaultLineStyle?: LineStyle;
  itemRenderer?: ComponentType<TimedLinesItemRendererProps>;
  // maxTime is necessary to calculate the width of the last line
  maxTime: number;
};

export function TimedLines({
  size,
  timedLines,
  viewPort,
  defaultColor = "black",
  defaultLineWidth = 1,
  defaultLineStyle = "solid",
  itemRenderer: ItemRenderer,
  maxTime,
}: Props): ReactElement {
  const orderedTimedLines = useMemo(() => {
    return timedLines.toSorted((a, b) => a.time - b.time);
  }, [timedLines]);

  return (
    <div
      style={{
        ...size,
        pointerEvents: "none",
      }}
    >
      {orderedTimedLines.map(({ time, color, lineWidth }, index) => {
        const left = getXPositionForTime({
          time,
          viewPort,
          viewWidth: size.width,
        });
        const nextTime = orderedTimedLines.at(index + 1)?.time ?? maxTime;
        const right = getXPositionForTime({
          time: nextTime,
          viewPort,
          viewWidth: size.width,
        });

        const width = right - left;

        return (
          <div
            key={time}
            style={{
              left,
              top: 0,
              width: right ? `${right - left}px` : undefined,
              position: "absolute",
              height: size.height,
              borderLeft: `${
                lineWidth ?? defaultLineWidth
              }px ${defaultLineStyle} ${color ?? defaultColor}`,
            }}
          >
            {ItemRenderer && (
              <ItemRenderer
                time={time}
                index={index}
                width={width}
                height={size.height}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
