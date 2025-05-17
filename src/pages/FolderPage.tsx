import type { ReactElement } from "react";
import { useReelsFromDirectory } from "../utils/hooks/useReelsFromDirectory";
import { ReelListItem } from "../components/ReelListItem/ReelListItem";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import "./FolderPage.css";
import { NoFolder } from "../components/NoFolder";

export function FolderPage(): ReactElement {
  const { directoryHandle, reels } = useReelsFromDirectory();

  return (
    <div className="folder-page">
      <Breadcrumbs />
      {!directoryHandle && <NoFolder />}
      {directoryHandle && (
        <>
          <h2>Showing reels in folder "{directoryHandle.name}"</h2>

          {reels && reels.length > 0 ? (
            <ul className="reels-list">
              {reels.map((reel) => (
                <ReelListItem reel={reel} key={reel.name} />
              ))}
            </ul>
          ) : (
            <div className="empty-state">No reels found in this folder</div>
          )}
        </>
      )}
    </div>
  );
}
