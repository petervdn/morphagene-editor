import { type ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { routes } from "../../routes/routes";
import { useGetReelById } from "../../hooks/useGetReelById";

export function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const { reelId } = useParams();

  // Match with route patterns
  const isFolder = location.pathname.startsWith("/folder");
  const isReel = location.pathname.includes("/reel/");
  const isOptions = location.pathname.includes("/options");

  const reel = useGetReelById(reelId ?? "");

  return (
    <nav className={styles.breadcrumbs}>
      {location.pathname === routes.home ? (
        <span className={styles.currentPage}>Home</span>
      ) : (
        <Link to={routes.home}>Home</Link>
      )}

      {(isFolder || isReel || isOptions) && (
        <>
          <span className={styles.separator}>/</span>
          {isFolder && !isReel && !isOptions ? (
            <span className={styles.currentPage}>Folder</span>
          ) : (
            <Link to={routes.folder}>Folder</Link>
          )}
        </>
      )}

      {isReel && reel && (
        <>
          <span className={styles.separator}>/</span>
          <span className={styles.currentPage}>{reel.name}</span>
        </>
      )}

      {isOptions && (
        <>
          <span className={styles.separator}>/</span>
          <span className={styles.currentPage}>Options</span>
        </>
      )}
    </nav>
  );
}
