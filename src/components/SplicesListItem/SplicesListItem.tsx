import { useCallback, type ReactElement } from "react";
import type { Splice } from "../../utils/getSplices";
import { BsPlayCircleFill } from "react-icons/bs";
import styles from "../SplicesList/SplicesList.module.css";

type Props = {
  splice: Splice;
  onClick?: (spliceIndex: number) => void;
  onMouseEnter?: (spliceIndex: number) => void;
  onMouseLeave?: () => void;
};

export function SplicesListItem({
  splice,
  onClick: onClickFromProps,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
}: Props): ReactElement {
  const onClick = useCallback(() => {
    onClickFromProps?.(splice.index);
  }, [onClickFromProps, splice.index]);

  const onMouseEnter = useCallback(() => {
    onMouseEnterProp?.(splice.index);
  }, [onMouseEnterProp, splice.index]);

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
          Splice {splice.index + 1}
        </span>
        <span className={styles.spliceMeta}>
          {splice.start.toFixed(2)} - {splice.end.toFixed(2)}
        </span>
      </button>
    </li>
  );
}
