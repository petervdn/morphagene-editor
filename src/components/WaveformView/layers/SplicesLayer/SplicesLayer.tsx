import type { ReactElement } from "react";
import type {
  Range,
  ReelWithAudioBuffer,
  Size,
  Splice,
} from "../../../../types/types";
import styles from "./SplicesLayer.module.css";
import { SplicesViewItem } from "../SplicesLayerItem/SplicesLayerItem";

type Props = {
  size: Size;
  splices: Array<Splice>;
  viewPort: Range;
  reel: ReelWithAudioBuffer;
};

export function SplicesView({
  size,
  splices,
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
      {splices.map((splice, index) => (
        <SplicesViewItem
          reel={reel}
          key={`${splice.start}-${splice}`}
          spliceIndex={index}
          splice={splice}
          size={size}
          viewPort={viewPort}
        />
      ))}
    </div>
  );
}
