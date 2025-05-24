import { useCallback, type ReactElement } from "react";
import { MdRestartAlt } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import styles from "./UnsavedChangesActions.module.css";
import type { ReelWithAudioBuffer } from "../../types/types";
import { reloadReelWavHeaderData } from "../../utils/reels/reloadReelWavHeaderData";

type UnsavedChangesActionsProps = {
  reel: ReelWithAudioBuffer;
};

export function UnsavedChangesActions({
  reel,
}: UnsavedChangesActionsProps): ReactElement {
  const onRevertClick = useCallback(() => {
    reloadReelWavHeaderData(reel);
  }, [reel]);

  const onSaveClick = useCallback(() => {
    console.log("save");
  }, []);

  return (
    <div className={styles.saveContainer}>
      {/* <div className={styles.unsavedIndicator}>
        <BiSolidErrorCircle className={styles.warningIcon} />
        <span>Unsaved changes</span>
      </div> */}
      <div className={styles.buttonGroup}>
        <button
          className={styles.resetButton}
          onClick={onRevertClick}
          title="Reset to original state"
        >
          <MdRestartAlt /> Revert
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
