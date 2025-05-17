import { useCallback, type ReactElement } from "react";
import type { Splice } from "../../utils/getSplices";
import { BsPlayCircleFill } from "react-icons/bs";

type Props = {
  splice: Splice;
};

export function SplicesListItem({ splice }: Props): ReactElement {
  const onClick = useCallback(() => {
    console.log(splice);
  }, [splice]);

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
