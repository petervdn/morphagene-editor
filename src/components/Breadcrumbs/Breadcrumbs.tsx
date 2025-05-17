import { type ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import { ROUTE_PATHS } from "../../routes/routes";
import "./Breadcrumbs.css";

export function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const { reelName } = useParams();
  const directoryHandle = useDirectoryHandle();

  const isFolder = location.pathname.startsWith("/folder");
  const isReel = location.pathname.includes("/reel/");

  return (
    <nav className="breadcrumbs">
      <Link to={ROUTE_PATHS.home()}>Home</Link>

      {isFolder && (
        <>
          <span className="separator">/</span>
          <Link to={ROUTE_PATHS.folder()}>
            Folder: {directoryHandle?.name ?? "NO-FOLDER"}
          </Link>
        </>
      )}

      {isReel && reelName && (
        <>
          <span className="separator">/</span>
          <Link to={ROUTE_PATHS.reel(reelName)}>{reelName}</Link>
        </>
      )}
    </nav>
  );
}
