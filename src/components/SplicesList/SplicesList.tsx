import { type ReactElement } from "react";
import type { Splice } from "../../utils/getSplices";
import { BsPlayCircleFill } from "react-icons/bs";

import "./SplicesList.css";

type Props = {
  splices: Array<Splice>;
};

export function SplicesList({ splices }: Props): ReactElement {
  const formatTime = (seconds: number): string => {
    return `${seconds.toFixed(2)}s`;
  };

  return (
    <div>
      <h3>splices ({splices.length})</h3>

      {splices.length === 0 ? (
        <div className="no-splices">No splices found in this reel</div>
      ) : (
        <ul className="splices-list">
          {splices.map((splice, index) => (
            <li key={index} className="splice-list-item">
              <div className="splice-content">
                <span className="splice-name">
                  <BsPlayCircleFill />
                  Splice {index + 1}
                </span>
                <span className="splice-meta">
                  {formatTime(splice.start)} - {formatTime(splice.end)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
