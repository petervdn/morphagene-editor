import type { ReactElement } from "react";
import type { Range, Size, Splice } from "../../../../types/types";
import { getXPositionForTime } from "../../../../utils/getXPositionForTime";
import styles from "./SplicesViewItem.module.css";

type Props = {
  splice: Splice;
  index: number;
  viewPort: Range;
  size: Size;
};

export function SplicesViewItem({
  index,
  splice,
  viewPort,
  size,
}: Props): ReactElement {
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
  return (
    <div
      className={styles.wrapper}
      style={{
        left: startX,
        width,
        height: size.height,
        borderLeft: index > 0 ? "1px solid black" : undefined,
      }}
    >
      {index + 1}
    </div>
  );
}
