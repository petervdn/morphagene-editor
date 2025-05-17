import type { ReactElement } from "react";
import type { ReelFile } from "../../types/types";
import { Link } from "react-router-dom";
import { useWavHeaderData } from "../../utils/hooks/useWavHeaderData";
import "./ReelListItem.css";

type Props = {
  reel: ReelFile;
};

export function ReelListItem({ reel }: Props): ReactElement {
  const headerData = useWavHeaderData(reel.name ?? "");
  
  return (
    <li className="reel-list-item">
      <Link to={`/folder/reel/${reel.name}`}>
        <span className="reel-icon">🔊</span>
        <span className="reel-name">{reel.name}</span>
        <span className="reel-meta">
          {headerData ? (
            <>
              {headerData.duration.toFixed(1)}s • {headerData.cuePoints.length} splices
            </>
          ) : (
            "Loading..."
          )}
        </span>
      </Link>
    </li>
  );
}
