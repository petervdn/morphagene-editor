import { type ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import styles from "./Breadcrumbs.module.css";
import { getReelPath, routes } from "../../routes/routes";
import { getReelNumber } from "../../utils/getReelNumber";

export function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const { reelName } = useParams();
  const directoryHandle = useDirectoryHandle();

  const isFolder = location.pathname.startsWith("/folder");
  const isReel = location.pathname.includes("/reel/");

  return (
    <nav className={styles.breadcrumbs}>
      <Link to={routes.home}>Home</Link>

      {isFolder && (
        <>
          <span className={styles.separator}>/</span>
          <Link to={routes.folder}>
            Folder: {directoryHandle?.name ?? "NO-FOLDER"}
          </Link>
        </>
      )}

      {isReel && reelName && (
        <>
          <span className={styles.separator}>/</span>
          <Link to={getReelPath(reelName)}>
            Reel #{getReelNumber(reelName)}
          </Link>
        </>
      )}
    </nav>
  );
}
