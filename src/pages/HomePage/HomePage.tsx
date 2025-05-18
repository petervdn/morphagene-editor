import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import { getFolderContent } from "../../utils/getFolderContent";
import { setFolderContent } from "../../stores/folderContentStore";

export function HomePage(): ReactElement {
  const navigate = useNavigate();
  const onFolderSelectClick = async () => {
    const directoryHandle = await window.showDirectoryPicker();

    setFolderContent(await getFolderContent(directoryHandle));
    navigate("/folder");
  };

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
          src="/morphagene.jpg"
          alt="Make Noise Morphagene Eurorack Module"
          className={styles.homePageImage}
        />
      </div>
      <button onClick={onFolderSelectClick} className={styles.selectFolderBtn}>
        Select Reels Folder
      </button>
    </div>
  );
}
