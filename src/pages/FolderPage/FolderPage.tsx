import type { ReactElement } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./FolderPage.module.css";
import { NoFolder } from "../../components/NoFolder";
import { useFolderContent } from "../../stores/folderContentStore";
import { ReelsList } from "../../components/ReelsList/ReelsList";

export function FolderPage(): ReactElement {
  const folderContent = useFolderContent();

  return (
    <div className={styles.folderPage}>
      <Breadcrumbs />
      {!folderContent && <NoFolder />}
      {folderContent && (
        <>
          <h2>
            Showing reels in folder "{folderContent.directoryHandle.name}"
          </h2>
          <ReelsList reels={folderContent.reels} />
        </>
      )}
    </div>
  );
}
