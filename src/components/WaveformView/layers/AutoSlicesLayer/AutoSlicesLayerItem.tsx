import type { ReactElement } from "react";
import type { Range, ReelWithAudioBuffer, Size } from "../../../../types/types";
import { getXPositionForTime } from "../../../../utils/getXPositionForTime";
import styles from "./AutoSlicesLayerItem.module.css";

type Props = {
  time: number;
  viewPort: Range;
  size: Size;
  reel: ReelWithAudioBuffer;
};

export function AutoSlicesLayerItem({
  time,
  viewPort,
  size,
}: Props): ReactElement | null {
  const startX = getXPositionForTime({
    time,
    viewPort,
    viewWidth: size.width,
  });

  return (
    <div
      className={styles.wrapper}
      style={{
        left: startX,
        width: 2,
        height: size.height,
        borderLeft: `1px solid green`,
      }}
    ></div>
  );
}
