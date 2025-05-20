import type { ReactElement } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./OptionsPage.module.css";
import { useFolderContent } from "../../stores/folderContentStore";

export function OptionsPage(): ReactElement {
  const folderContent = useFolderContent();
  const optionsFile = folderContent?.options;

  return (
    <div className={styles.optionsPage}>
      <Breadcrumbs />
      <h2>Options File</h2>
      
      {!folderContent && (
        <div className={styles.noOptions}>
          No folder selected. Please select a folder first.
        </div>
      )}
      
      {folderContent && !optionsFile && (
        <div className={styles.noOptions}>
          No options.txt file found in the selected folder.
        </div>
      )}
      
      {optionsFile && (
        <div className={styles.optionsContent}>
          {optionsFile.content || "Unable to read options file content."}
        </div>
      )}
    </div>
  );
}
