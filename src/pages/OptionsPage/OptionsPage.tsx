import { type ReactElement } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./OptionsPage.module.css";
import {
  useFolderContent,
  useFolderContentStore,
} from "../../stores/folderContentStore";
import { OptionsEditor } from "../../components/OptionsEditor/OptionsEditor";

export function OptionsPage(): ReactElement {
  const folderContent = useFolderContent();
  const updateOptionsContent = useFolderContentStore(
    (state) => state.folderContent?.options
  );
  const optionsFile = folderContent?.options;

  return (
    <div className={styles.optionsPage}>
      <Breadcrumbs />
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Morphagene Options</h2>
        <div className={styles.autoSaveInfo}>
          Changes are saved automatically
        </div>
      </div>

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

      {optionsFile && optionsFile.content && (
        <div className={styles.optionsEditorContainer}>
          <OptionsEditor
            content={optionsFile.content}
            onSave={updateOptionsContent}
          />
        </div>
      )}
    </div>
  );
}
