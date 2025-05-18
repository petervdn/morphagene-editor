import type { ReactElement } from "react";
import styles from "./ReelsList.module.css";
import { ReelListItem } from "../ReelsListItem/ReelsListItem";
import type { Reel } from "../../types/types";

type Props = {
  reels: Array<Reel>;
};

export function ReelsList({ reels }: Props): ReactElement {
  return reels.length > 0 ? (
    <ul className={styles.reelsList}>
      {reels.map((reel) => (
        <ReelListItem reel={reel} key={reel.name} />
      ))}
    </ul>
  ) : (
    <div className={styles.emptyState}>No reels found</div>
  );
}
