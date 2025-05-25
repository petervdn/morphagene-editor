import type { ReactElement } from "react";
import type { Range, ReelWithAudioBuffer, Size } from "../../../../types/types";
import styles from "./AutoSlicesLayer.module.css";
import { AutoSlicesLayerItem } from "./AutoSlicesLayerItem";

type Props = {
  size: Size;
  times: Array<number>;
  viewPort: Range;
  reel: ReelWithAudioBuffer;
};

export function AutoSlicesLayer({
  size,
  times,
  viewPort,
  reel,
}: Props): ReactElement {
  return (
    <div
      className={styles.wrapper}
      style={{
        ...size,
        pointerEvents: "none",
      }}
    >
      {times.map((time) => (
        <AutoSlicesLayerItem
          reel={reel}
          key={time}
          time={time}
          size={size}
          viewPort={viewPort}
        />
      ))}
    </div>
  );
}
