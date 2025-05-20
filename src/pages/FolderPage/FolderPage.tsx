import type { ReactElement } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./FolderPage.module.css";
import { NoFolder } from "../../components/NoFolder";
import { useFolderContent } from "../../stores/folderContentStore";
import { ReelsList } from "../../components/ReelsList/ReelsList";
import { OptionsListItem } from "../../components/OptionsListItem/OptionsListItem";

export function FolderPage(): ReactElement {
  const folderContent = useFolderContent();

  return (
    <div className={styles.folderPage}>
      <Breadcrumbs />
      {!folderContent && <NoFolder />}
      {folderContent && (
        <>
          <h2>
            Showing files in folder "{folderContent.directoryHandle.name}"
          </h2>
          {folderContent.options && (
            <div className={styles.optionsContainer}>
              <OptionsListItem options={folderContent.options} />
            </div>
          )}
          <ReelsList reels={folderContent.reels} />
        </>
      )}
    </div>
  );
}
