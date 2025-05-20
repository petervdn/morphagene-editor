import { type ReactElement } from "react";
import styles from "./PlaceholderPanel.module.css";

export function PlaceholderPanel(): ReactElement {
  return (
    <div className={styles.placeholderPanel}>
      {/* This is an empty placeholder component that maintains the layout */}
    </div>
  );
}
