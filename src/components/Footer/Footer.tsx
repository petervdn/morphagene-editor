import { type ReactElement } from "react";
import styles from "./Footer.module.css";
import { BsGithub, BsQuestionCircle, BsInfoCircle } from "react-icons/bs";

export function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <div
        className={styles.footerContent}
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}
      >
        <div className={styles.footerLinks}>
          <a
            href="https://github.com/petervdn/morphagene-editor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub /> GitHub
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <BsQuestionCircle /> Help
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <BsInfoCircle /> About
          </a>
        </div>
        <div className={styles.footerCopyright}>
          This site is just a personal hobby project and not officially related
          to Make Noise or the Morphagene module. Make sure to always make a
          backup of your card and reels before granting this site read and write
          access.
        </div>
        <div className={styles.footerVersion}>Version 0.1.0</div>
      </div>
    </footer>
  );
}
