import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./ReelsListItem.module.css";
import { PiFilmReel } from "react-icons/pi";
import type { Reel } from "../../types/types";
import { getReelPath } from "../../routes/utils/getReelPath";

type Props = {
  reel: Reel;
};

export function ReelListItem({
  reel: { fileName, id, name, wavHeaderData },
}: Props): ReactElement {
  return (
    <li className={styles.reelListItem}>
      <Link to={getReelPath(id)} className={styles.link}>
        <span className={styles.reelName}>
          <PiFilmReel className={styles.reelNameSvg} />
          {name}
        </span>
        <span className={styles.reelMeta}>
          <>
            {fileName} • {wavHeaderData.duration.toFixed(1)}s •{" "}
            {wavHeaderData.cuePoints.length} splices
          </>
        </span>
      </Link>
    </li>
  );
}
