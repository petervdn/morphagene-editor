import { create } from "zustand";
import type { CuePoint, Reel } from "../types/types";

export type FolderContent = {
  directoryHandle: FileSystemDirectoryHandle;
  reels: Array<Reel>;
};

type FolderContentStore = {
  folderContent: FolderContent | null;
  updateReelCuePoints: (reelId: string, cuePoints: Array<CuePoint>) => void;
};

export const useFolderContentStore = create<FolderContentStore>((set, get) => ({
  folderContent: null,
  updateReelCuePoints: (reelId: string, cuePoints: Array<CuePoint>) => {
    const { folderContent } = get();
    if (!folderContent) return;
    
    // Create a new reels array with the updated reel
    const updatedReels = folderContent.reels.map(reel => {
      if (reel.id === reelId) {
        // Create a new reel object with updated cue points
        return {
          ...reel,
          wavHeaderData: {
            ...reel.wavHeaderData,
            cuePoints
          }
        };
      }
      return reel;
    });
    
    // Update the store with the new reels array
    set({
      folderContent: {
        ...folderContent,
        reels: updatedReels
      }
    });
  }
}));

export const setFolderContent = (folderContent: FolderContent | null) =>
  useFolderContentStore.setState({ folderContent });

export function useFolderContent(): FolderContent | null {
  return useFolderContentStore((state) => state.folderContent);
}
