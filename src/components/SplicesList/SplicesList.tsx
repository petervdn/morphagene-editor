import { type ReactElement } from "react";
import { SplicesListItem } from "../SplicesListItem/SplicesListItem";
import { RiScissorsCutLine } from "react-icons/ri";

import styles from "./SplicesList.module.css";
import type { Splice } from "../../types/types";

interface Props {
  splices: Array<Splice>;
  onDeleteSplice?: (index: number) => void;
  onSpliceMouseEnter?: (index: number) => void;
  onSpliceMouseLeave?: () => void;
  onZoomToSplice?: (start: number, end: number) => void;
  onSpliceClick?: (index: number) => void;
};

export function SplicesList({
  splices,
  onDeleteSplice,
  onSpliceMouseEnter,
  onSpliceMouseLeave,
  onZoomToSplice,
  onSpliceClick,
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
              onDelete={onDeleteSplice}
              onZoomToSplice={onZoomToSplice}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
