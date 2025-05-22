import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import styles from "./OptionsListItem.module.css";
import { routes } from "../../routes/routes";

export function OptionsListItem(): ReactElement {
  return (
    <Link to={routes.options} className={styles.optionsItem}>
      <FiSettings className={styles.optionsIcon} />
      <div className={styles.optionsDetails}>
        <div className={styles.optionsName}>options.txt</div>
        <div className={styles.optionsInfo}>
          <span>Configuration file</span>
        </div>
      </div>
    </Link>
  );
}
