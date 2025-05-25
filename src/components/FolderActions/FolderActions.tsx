import { type ReactElement } from "react";
import styles from "./FolderActions.module.css";
import { TbRefresh } from "react-icons/tb";
import { IoFolderOpenOutline } from "react-icons/io5";
import { PiMusicNotesPlusFill } from "react-icons/pi";

type FolderActionsProps = {
  onRefreshFolderClick: () => void;
  onFolderSelectClick: () => void;
  onCreateReelClick?: () => void;
};

export function FolderActions({
  onRefreshFolderClick,
  onFolderSelectClick,
  onCreateReelClick,
}: FolderActionsProps): ReactElement {
  return (
    <div className={styles.folderActions}>
      <button
        onClick={onCreateReelClick}
        className={styles.createReelBtn}
        title="Create a new reel"
      >
        <PiMusicNotesPlusFill />
        <span className={styles.buttonText}>New reel</span>
      </button>
      <button
        onClick={onRefreshFolderClick}
        className={styles.refreshFolderBtn}
        title="Refresh folder contents"
      >
        <TbRefresh />
        <span className={styles.buttonText}>Refresh</span>
      </button>
      <button
        onClick={onFolderSelectClick}
        className={styles.selectFolderBtnSmall}
      >
        <IoFolderOpenOutline />
        <span className={styles.buttonText}>Select folder</span>
      </button>
    </div>
  );
}
