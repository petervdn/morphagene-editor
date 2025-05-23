import { Link } from "react-router-dom";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import { useSpliceNavigation } from "../../utils/hooks/useSpliceNavigation";
import styles from "./SpliceNavigation.module.css";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

type Props = {
  reel: ReelWithAudioBuffer;
  activeSplice: Splice;
};

export function SpliceNavigation({ reel, activeSplice }: Props) {
  const {
    hasNextSplice,
    hasPreviousSplice,
    nextSplicePath,
    previousSplicePath,
  } = useSpliceNavigation({ reel, activeSplice });

  return (
    <div className={styles.navigationButtons}>
      <Link
        to={previousSplicePath ?? ""}
        className={`${styles.navButton} ${
          !hasPreviousSplice ? styles.disabledLink : ""
        }`}
        title="Go to previous splice"
      >
        <MdSkipPrevious /> Previous Splice
      </Link>

      <Link
        to={nextSplicePath ?? ""}
        className={`${styles.navButton} ${
          !hasNextSplice ? styles.disabledLink : ""
        }`}
        title="Go to next splice"
      >
        <MdSkipNext /> Next Splice
      </Link>
    </div>
  );
}
