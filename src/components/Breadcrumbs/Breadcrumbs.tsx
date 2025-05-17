import { type ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import "./Breadcrumbs.css";
import { getReelPath, routes } from "../../routes/routes";

export function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const { reelName } = useParams();
  const directoryHandle = useDirectoryHandle();

  const isFolder = location.pathname.startsWith("/folder");
  const isReel = location.pathname.includes("/reel/");

  return (
    <nav className="breadcrumbs">
      <Link to={routes.home}>Home</Link>

      {isFolder && (
        <>
          <span className="separator">/</span>
          <Link to={routes.folder}>
            Folder: {directoryHandle?.name ?? "NO-FOLDER"}
          </Link>
        </>
      )}

      {isReel && reelName && (
        <>
          <span className="separator">/</span>
          <Link to={getReelPath(reelName)}>{reelName}</Link>
        </>
      )}
    </nav>
  );
}
