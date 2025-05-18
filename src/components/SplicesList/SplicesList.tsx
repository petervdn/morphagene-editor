import { type ReactElement } from "react";
import { SplicesListItem } from "../SplicesListItem/SplicesListItem";

import styles from "./SplicesList.module.css";
import type { Splice } from "../../types/types";

type Props = {
  splices: Array<Splice>;
  onSpliceClick?: (spliceIndex: number) => void;
  onSpliceMouseEnter?: (spliceIndex: number) => void;
  onSpliceMouseLeave?: () => void;
};

export function SplicesList({
  splices,
  onSpliceClick,
  onSpliceMouseEnter,
  onSpliceMouseLeave,
}: Props): ReactElement {
  return (
    <div>
      <h3>splices ({splices.length})</h3>

      {splices.length === 0 ? (
        <div className={styles.noSplices}>No splices found in this reel</div>
      ) : (
        <ul className={styles.splicesList}>
          {splices.map((splice, index) => (
            <SplicesListItem
              key={index}
              index={index}
              splice={splice}
              onClick={onSpliceClick}
              onMouseEnter={onSpliceMouseEnter}
              onMouseLeave={onSpliceMouseLeave}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
