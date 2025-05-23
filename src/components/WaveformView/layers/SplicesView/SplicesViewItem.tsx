import type { ReactElement } from "react";
import type {
  Range,
  ReelWithAudioBuffer,
  Size,
  Splice,
} from "../../../../types/types";
import { getXPositionForTime } from "../../../../utils/getXPositionForTime";
import styles from "./SplicesViewItem.module.css";
import { Link } from "react-router-dom";
import { getSplicePath } from "../../../../routes/utils/getSplicePath";
import { getSpliceIdByIndex } from "../../../../utils/splices/getSpliceId";
import { usePathParams } from "../../../../utils/hooks/usePathParams";

type Props = {
  splice: Splice;
  spliceIndex: number;
  viewPort: Range;
  size: Size;
  reel: ReelWithAudioBuffer;
};

export function SplicesViewItem({
  spliceIndex,
  splice,
  viewPort,
  size,
  reel,
}: Props): ReactElement | null {
  const { spliceId: activeSpliceId } = usePathParams();

  const startX = getXPositionForTime({
    time: splice.start,
    viewPort,
    viewWidth: size.width,
  });

  const width =
    getXPositionForTime({
      time: splice.end,
      viewPort,
      viewWidth: size.width,
    }) - startX;

  const spliceId = getSpliceIdByIndex(spliceIndex);
  const isActive = spliceId === activeSpliceId;
  const color = isActive ? "#B71C1C" : "#2c5dd8";

  return spliceId ? (
    <div
      className={styles.wrapper}
      style={{
        left: startX,
        width,
        height: size.height,
        borderLeft: spliceIndex >= 0 ? `1px solid ${color}` : undefined,
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <Link
        to={getSplicePath({
          reelId: reel.id,
          spliceId,
        })}
        style={{
          width: "100%",
          backgroundColor: color,
          color: "white",
          paddingLeft: 2,
        }}
      >
        {spliceIndex + 1}
      </Link>
    </div>
  ) : null;
}
