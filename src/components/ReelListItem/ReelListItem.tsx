import type { ReactElement } from "react";
import type { ReelFile } from "../../types/types";
import { Link } from "react-router-dom";
import { useWavHeaderData } from "../../utils/hooks/useWavHeaderData";

type Props = {
  reel: ReelFile;
};

export function ReelListItem({ reel }: Props): ReactElement {
  const headerData = useWavHeaderData(reel.name ?? "");
  return (
    <li>
      <Link to={`/folder/reel/${reel.name}`}>
        {reel.name} ({headerData?.duration.toFixed(1)}s,{" "}
        {headerData?.cuePoints.length} splices)
      </Link>
    </li>
  );
}
