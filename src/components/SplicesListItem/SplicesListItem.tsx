import { useCallback, type ReactElement } from "react";
import type { Splice } from "../../utils/getSplices";
import { BsPlayCircleFill } from "react-icons/bs";

type Props = {
  splice: Splice;
  onClick?: (spliceIndex: number) => void;
};

export function SplicesListItem({
  splice,
  onClick: onClickFromProps,
}: Props): ReactElement {
  const onClick = useCallback(() => {
    onClickFromProps?.(splice.index);
  }, [onClickFromProps, splice.index]);

  return (
    <li className="splice-list-item">
      <button className="splice-content" onClick={onClick} type="button">
        <span className="splice-name">
          <BsPlayCircleFill />
          Splice {splice.index + 1}
        </span>
        <span className="splice-meta">
          {splice.start.toFixed(2)} - {splice.end.toFixed(2)}
        </span>
      </button>
    </li>
  );
}
