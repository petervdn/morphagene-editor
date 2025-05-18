import { useCallback, type ReactElement } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import styles from "../SplicesList/SplicesList.module.css";
import type { Splice } from "../../types/types";

type Props = {
  splice: Splice;
  index: number; // todo: see if we can get rid of this
  onClick?: (spliceIndex: number) => void;
  onMouseEnter?: (spliceIndex: number) => void;
  onMouseLeave?: () => void;
};

export function SplicesListItem({
  splice,
  onClick: onClickFromProps,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  index,
}: Props): ReactElement {
  const onClick = useCallback(() => {
    onClickFromProps?.(index);
  }, [onClickFromProps, index]);

  const onMouseEnter = useCallback(() => {
    onMouseEnterProp?.(index);
  }, [onMouseEnterProp, index]);

  const onMouseLeave = useCallback(() => {
    onMouseLeaveProp?.();
  }, [onMouseLeaveProp]);

  return (
    <li className={styles.spliceListItem}>
      <button
        className={styles.spliceContent}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="button"
      >
        <span className={styles.spliceName}>
          <BsPlayCircleFill className={styles.spliceNameSvg} />
          Splice {index + 1}
        </span>
        <span className={styles.spliceMeta}>
          {splice.start.toFixed(2)} - {splice.end.toFixed(2)}
        </span>
      </button>
    </li>
  );
}
