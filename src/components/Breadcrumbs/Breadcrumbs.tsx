import { type ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDirectoryHandle } from "../../stores/directoryHandleStore";
import "./Breadcrumbs.css";

export function Breadcrumbs(): ReactElement | null {
  const location = useLocation();
  const { reelName } = useParams();
  const directoryHandle = useDirectoryHandle();

  const isFolder = location.pathname.startsWith("/folder");
  const isReel = location.pathname.includes("/reel/");

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>

      {isFolder && (
        <>
          <span className="separator">/</span>
          <Link to="/folder">
            Folder: {directoryHandle?.name ?? "NO-FOLDER"}
          </Link>
        </>
      )}

      {isReel && (
        <>
          <span className="separator">/</span>
          <Link to={`/folder/reel/${reelName}`}>{reelName}</Link>
        </>
      )}
    </nav>
  );
}
