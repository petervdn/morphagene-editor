import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./ReelsListItem.module.css";
import { getReelPath } from "../../routes/routes";
import { PiFilmReel } from "react-icons/pi";
import type { Reel } from "../../types/types";

type Props = {
  reel: Reel;
};

export function ReelListItem({
  reel: { file, id, name, wavHeaderData },
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
            {file.name} • {wavHeaderData.duration.toFixed(1)}s •{" "}
            {wavHeaderData.cuePoints.length} splices
          </>
        </span>
      </Link>
    </li>
  );
}
