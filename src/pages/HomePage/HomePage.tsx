import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { routes } from "../../routes/routes";

export function HomePage(): ReactElement {

  return (
    <div className={styles.homePage}>
      <div className={styles.homePageContent}>
        <div className={styles.homePageText}>
          <p>
            Welcome to the Morphagene Sound Editor! This is a web tool for
            editing sound files that are used in the Eurorack Morphagene module.
            It is currently in development and should be working by the time you
            read this. If you have any feedback or feature requests please feel
            free to open an issue on GitHub.
          </p>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}morphagene.jpg`}
          alt="Make Noise Morphagene Eurorack Module"
          className={styles.homePageImage}
        />
      </div>
      <Link to={routes.folder} className={styles.getStartedBtn}>
        Get Started
      </Link>
    </div>
  );
}
