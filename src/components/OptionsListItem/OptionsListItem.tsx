import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import styles from "./OptionsListItem.module.css";
import { routes } from "../../routes/routes";
import type { OptionsFile } from "../../stores/folderContentStore";

type Props = {
  options: OptionsFile;
};

export function OptionsListItem({ options }: Props): ReactElement {
  return (
    <Link to={routes.options} className={styles.optionsItem}>
      <FiSettings className={styles.optionsIcon} />
      <div className={styles.optionsDetails}>
        <div className={styles.optionsName}>options.txt</div>
        <div className={styles.optionsInfo}>
          <span>{(options.file.size / 1024).toFixed(2)} KB</span>
          <span>Configuration file</span>
        </div>
      </div>
    </Link>
  );
}
