import { type ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { routes } from "../../routes/routes";
import { useFolderContent } from "../../stores/folderContentStore";
import { useGetReelById } from "../../utils/hooks/useGetReelById";

export function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const { reelId } = useParams();
  const folderContent = useFolderContent();

  // Match with route patterns
  const isFolder = location.pathname.startsWith("/folder");
  const isReel = location.pathname.includes("/reel/");
  const isOptions = location.pathname.includes("/options");

  const reel = useGetReelById(reelId ?? "");

  const folderName = folderContent?.directoryHandle?.name ?? "NO-FOLDER";

  return (
    <nav className={styles.breadcrumbs}>
      {/* Home is always the first breadcrumb */}
      {location.pathname === routes.home ? (
        <span className={styles.currentPage}>Home</span>
      ) : (
        <Link to={routes.home}>Home</Link>
      )}

      {/* Folder breadcrumb */}
      {(isFolder || isReel || isOptions) && (
        <>
          <span className={styles.separator}>/</span>
          {isFolder && !isReel && !isOptions ? (
            <span className={styles.currentPage}>Folder: {folderName}</span>
          ) : (
            <Link to={routes.folder}>Folder: {folderName}</Link>
          )}
        </>
      )}

      {/* Reel breadcrumb */}
      {isReel && reel && (
        <>
          <span className={styles.separator}>/</span>
          <span className={styles.currentPage}>{reel.name}</span>
        </>
      )}

      {/* Options breadcrumb */}
      {isOptions && (
        <>
          <span className={styles.separator}>/</span>
          <span className={styles.currentPage}>Options</span>
        </>
      )}
    </nav>
  );
}
