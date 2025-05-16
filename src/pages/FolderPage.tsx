import type { ReactElement } from "react";
import { useReelsFromDirectory } from "../utils/hooks/useReelsFromDirectory";
import { Link } from "react-router-dom";

export function FolderPage(): ReactElement {
  const { directoryHandle, reels } = useReelsFromDirectory();

  if (!directoryHandle) {
    return <h2>no folder selected</h2>;
  }

  return (
    <>
      <h2>Listing folder: {directoryHandle.name}</h2>
      <ul>
        {reels?.map((reel) => (
          <li key={reel.name}>
            <Link to={`/folder/reel/${reel.name}`}>{reel.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
