import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./ReelsListItem.module.css";
import { PiFilmReel } from "react-icons/pi";
import type { Reel } from "../../types/types";
import { getReelPath } from "../../routes/utils/getReelPath";
import { getWaveFileMetaData } from "../../utils/audio/getWaveFileMetaData";

type Props = {
  reel: Reel;
};

export function ReelListItem({
  reel: { fileName, id, name, waveFile },
}: Props): ReactElement {
  const amountOfSplicesLabel = `${waveFile.listCuePoints().length} splice${
    waveFile.listCuePoints().length === 1 ? "" : "s"
  }`;

  const waveFileMetaData = getWaveFileMetaData(waveFile);

  return (
    <li className={styles.reelListItem}>
      <Link to={getReelPath(id)} className={styles.link}>
        <span className={styles.reelName}>
          <PiFilmReel className={styles.reelNameSvg} />
          {name}
        </span>
        <span className={styles.reelMeta}>
          <>
            {fileName} • {waveFileMetaData.duration.toFixed(1)}s •{" "}
            {amountOfSplicesLabel}
          </>
        </span>
      </Link>
    </li>
  );
}
