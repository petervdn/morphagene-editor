import { useFolderContent } from "../stores/folderContentStore";
import type { Reel } from "../types/types";

export function useGetReelById(reelId: string): Reel | undefined {
  const folderContent = useFolderContent();

  return folderContent?.reels.find((reel) => reel.id === reelId);
}
