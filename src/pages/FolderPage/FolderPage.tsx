import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./FolderPage.module.css";
import {
  useFolderContent,
  setFolderContent,
} from "../../stores/folderContentStore";
import { ReelsList } from "../../components/ReelsList/ReelsList";
import { OptionsListItem } from "../../components/OptionsListItem/OptionsListItem";
import { getFolderContent } from "../../utils/getFolderContent";

export function FolderPage(): ReactElement {
  const navigate = useNavigate();
  const folderContent = useFolderContent();

  const onFolderSelectClick = async () => {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      setFolderContent(await getFolderContent(directoryHandle));
    } catch (error) {
      // User cancelled the folder picker
      console.log("Folder selection cancelled or failed:", error);
    }
  };

  const onRefreshFolderClick = async () => {
    if (folderContent) {
      try {
        // Reload the current folder contents using the existing directoryHandle
        setFolderContent(await getFolderContent(folderContent.directoryHandle));
      } catch (error) {
        console.error("Error refreshing folder contents:", error);
      }
    }
  };

  return (
    <div className={styles.folderPage}>
      <Breadcrumbs />

      {!folderContent ? (
        <div className={styles.noFolderContainer}>
          <p>
            No folder selected. Select a folder to view and edit your Morphagene
            reels.
          </p>
          <button
            onClick={onFolderSelectClick}
            className={styles.selectFolderBtnLarge}
          >
            Select Reels Folder
          </button>
        </div>
      ) : (
        <div className={styles.folderContentContainer}>
          <div className={styles.folderHeader}>
            <h2>Folder contents for "{folderContent.directoryHandle.name}"</h2>
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
          </div>

          {folderContent.options && (
            <div className={styles.optionsContainer}>
              <OptionsListItem options={folderContent.options} />
            </div>
          )}
          <ReelsList reels={folderContent.reels} />
        </div>
      )}
    </div>
  );
}
