import type { ReactElement } from "react";
import type {
  Range,
  ReelWithAudioBuffer,
  Size,
  Splice,
} from "../../../../types/types";
import styles from "./SplicesView.module.css";
import { SplicesViewItem } from "./SplicesViewItem";

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
      style={{ width: size.width, height: size.height }}
    >
      {splices.map((splice, index) => (
        <SplicesViewItem
          reel={reel}
          key={reel.id}
          spliceIndex={index}
          splice={splice}
          size={size}
          viewPort={viewPort}
        />
      ))}
    </div>
  );
}
