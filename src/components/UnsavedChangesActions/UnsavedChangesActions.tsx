import { type ReactElement } from "react";
import { MdRestartAlt } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import styles from "./UnsavedChangesActions.module.css";

type UnsavedChangesActionsProps = {
  onRevertClick?: () => void;
  onSaveClick?: () => void;
};

export function UnsavedChangesActions({
  onRevertClick,
  onSaveClick,
}: UnsavedChangesActionsProps): ReactElement {
  return (
    <div className={styles.saveContainer}>
      <div className={styles.buttonGroup}>
        <button
          className={styles.resetButton}
          onClick={onRevertClick}
          title="Revert to original state"
        >
          <MdRestartAlt className={styles.revertIcon} /> Revert
        </button>
        <button
          className={styles.saveButton}
          onClick={onSaveClick}
          title="Save changes"
        >
          <FiSave /> Save
        </button>
      </div>
    </div>
  );
}
