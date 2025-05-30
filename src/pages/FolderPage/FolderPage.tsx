import { useCallback, type ReactElement } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./FolderPage.module.css";
import {
  useFolderContent,
  setFolderContent,
} from "../../stores/folderContentStore";
import { ReelsList } from "../../components/ReelsList/ReelsList";
import { OptionsListItem } from "../../components/OptionsListItem/OptionsListItem";
import { getFolderContent } from "../../utils/folder/getFolderContent";
import { FolderActions } from "../../components/FolderActions/FolderActions";
import { useSelectFileAndCreateReel } from "../../hooks/useSelectFileAndCreateReel";
import { refreshFolder } from "../../hooks/refreshFolder";

export function FolderPage(): ReactElement {
  const folderContent = useFolderContent();
  const selectFileAndCreateReel = useSelectFileAndCreateReel();

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
      refreshFolder(folderContent);
    }
  };

  const onCreateReelClick = useCallback(async () => {
    if (!folderContent) {
      return;
    }
    await selectFileAndCreateReel(folderContent);
  }, [folderContent, selectFileAndCreateReel]);

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
            <FolderActions
              onRefreshFolderClick={onRefreshFolderClick}
              onFolderSelectClick={onFolderSelectClick}
              onCreateReelClick={onCreateReelClick}
            />
          </div>

          <ReelsList reels={folderContent.reels} />
          {folderContent.options && (
            <div className={styles.optionsContainer}>
              <OptionsListItem />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
