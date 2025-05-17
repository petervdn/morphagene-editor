import { type ReactElement } from "react";
import type { ReelFile } from "../../types/types";
import { Link } from "react-router-dom";
import { useWavHeaderData } from "../../utils/hooks/useWavHeaderData";
import styles from "./ReelListItem.module.css";
import { getReelNumber } from "../../utils/getReelNumber";
import { getReelPath } from "../../routes/routes";
import { PiFilmReel } from "react-icons/pi";

type Props = {
  reel: ReelFile;
};

export function ReelListItem({ reel }: Props): ReactElement {
  const headerData = useWavHeaderData(reel.name ?? "");

  return (
    <li className={styles.reelListItem}>
      <Link to={getReelPath(reel.name)} className={styles.link}>
        <span className={styles.reelName}>
          <PiFilmReel className={styles.reelNameSvg} />
          Reel #{getReelNumber(reel.name)}
        </span>
        <span className={styles.reelMeta}>
          {headerData && (
            <>
              {reel.name} • {headerData.duration.toFixed(1)}s •{" "}
              {headerData.cuePoints.length} splices
            </>
          )}
        </span>
      </Link>
    </li>
  );
}
