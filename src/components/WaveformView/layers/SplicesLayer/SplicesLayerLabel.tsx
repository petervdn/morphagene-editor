import type { ReactElement } from "react";
import type { TimedLinesItemRendererProps } from "../TimedLinesLayer/TimedLinesLayer";

export function SplicesLayerLabel({
  index,
}: TimedLinesItemRendererProps): ReactElement {
  return (
    <label
      style={{
        width: "100%",
        overflow: "hidden",
        fontSize: "12px",
        display: "block",
        userSelect: "none",
        marginLeft: "2px",
      }}
    >
      {index + 1}
    </label>
  );
}
