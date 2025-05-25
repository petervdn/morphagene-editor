import { type ReactElement } from "react";
import styles from "./FolderActions.module.css";

type FolderActionsProps = {
  onRefreshFolderClick: () => void;
  onFolderSelectClick: () => void;
};

export function FolderActions({
  onRefreshFolderClick,
  onFolderSelectClick,
}: FolderActionsProps): ReactElement {
  return (
    <div className={styles.folderActions}>
      <button
        onClick={onRefreshFolderClick}
        className={styles.refreshFolderBtn}
        title="Refresh folder contents"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span className={styles.buttonText}>Refresh</span>
      </button>
      <button
        onClick={onFolderSelectClick}
        className={styles.selectFolderBtnSmall}
      >
        Choose New Folder
      </button>
    </div>
  );
}
