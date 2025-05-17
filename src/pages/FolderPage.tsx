import type { ReactElement } from "react";
import { useReelsFromDirectory } from "../utils/hooks/useReelsFromDirectory";
import { ReelListItem } from "../components/ReelListItem/ReelListItem";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";

export function FolderPage(): ReactElement {
  const { directoryHandle, reels } = useReelsFromDirectory();

  if (!directoryHandle) {
    return <h2>no folder selected</h2>;
  }

  return (
    <>
      <Breadcrumbs />
      <h2>Listing folder: {directoryHandle.name}</h2>
      <ul>
        {reels?.map((reel) => (
          <ReelListItem reel={reel} key={reel.name} />
        ))}
      </ul>
    </>
  );
}
