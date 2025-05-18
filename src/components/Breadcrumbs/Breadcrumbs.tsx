import { type ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { getReelPath, routes } from "../../routes/routes";
import { useFolderContent } from "../../stores/folderContentStore";
import { useGetReelById } from "../../utils/hooks/useGetReelById";

export function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const { reelId } = useParams();
  const folderContent = useFolderContent();

  // todo match with constants in routes.ts
  const isFolder = location.pathname.startsWith("/folder");
  const isReel = location.pathname.includes("/reel/");

  const reel = useGetReelById(reelId ?? "");

  return (
    <nav className={styles.breadcrumbs}>
      <Link to={routes.home}>Home</Link>

      {isFolder && (
        <>
          <span className={styles.separator}>/</span>
          <Link to={routes.folder}>
            Folder: {folderContent?.directoryHandle?.name ?? "NO-FOLDER"}
          </Link>
        </>
      )}

      {isReel && reel && (
        <>
          <span className={styles.separator}>/</span>
          <Link to={getReelPath(reel.id)}>{reel.name}</Link>
        </>
      )}
    </nav>
  );
}
