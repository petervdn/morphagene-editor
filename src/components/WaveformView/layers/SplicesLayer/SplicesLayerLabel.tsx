import type { ReactElement } from "react";
import type { TimedLinesItemRendererProps } from "../TimedLinesLayer/TimedLinesLayer";
import { Link, useParams } from "react-router-dom";
import { getSpliceIdByIndex } from "../../../../utils/splices/getSpliceId";
import { getSplicePath } from "../../../../routes/utils/getSplicePath";

export function SplicesLayerLabel({
  index: spliceIndex,
}: TimedLinesItemRendererProps): ReactElement | null {
  const { reelId, spliceId: activeSpliceId } = useParams();
  const label = spliceIndex + 1;
  const spliceId = getSpliceIdByIndex(spliceIndex);
  const path = reelId ? getSplicePath({ reelId, spliceId }) : undefined;

  const isActive = spliceId === activeSpliceId;

  return path ? (
    <Link
      to={path}
      style={{
        width: "100%",
        overflow: "hidden",
        fontSize: "14px",
        display: "block",
        boxSizing: "border-box",
        userSelect: "none",
        paddingLeft: "4px",
        pointerEvents: "auto",
        color: isActive ? "white" : "black",
        backgroundColor: isActive ? "black" : "rgba(0,0,0,0.1)",
      }}
    >
      {label}
    </Link>
  ) : null;
}
