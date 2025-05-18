import { type ReactElement } from "react";
import { SplicesListItem } from "../SplicesListItem/SplicesListItem";
import { RiScissorsCutLine } from "react-icons/ri";

import styles from "./SplicesList.module.css";
import type { Splice } from "../../types/types";

type Props = {
  splices: Array<Splice>;
  onSpliceClick?: (index: number) => void;
  onSpliceMouseEnter?: (index: number) => void;
  onSpliceMouseLeave?: () => void;
  onSpliceDelete?: (index: number) => void;
};

export function SplicesList({
  splices,
  onSpliceClick,
  onSpliceMouseEnter,
  onSpliceMouseLeave,
  onSpliceDelete,
}: Props): ReactElement {
  return (
    <div>
      <h3 className={styles.splicesHeader}><RiScissorsCutLine className={styles.headerIcon} /> Splices ({splices.length})</h3>

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
              onDelete={onSpliceDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
