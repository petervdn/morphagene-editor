import { type ReactElement } from "react";
import type { Splice } from "../../utils/getSplices";
import { SplicesListItem } from "../SplicesListItem/SplicesListItem";

import styles from "./SplicesList.module.css";

type Props = {
  splices: Array<Splice>;
  onSpliceClick?: (spliceIndex: number) => void;
};

export function SplicesList({ splices, onSpliceClick }: Props): ReactElement {
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
              splice={splice}
              onClick={onSpliceClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
