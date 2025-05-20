import { create } from "zustand";
import type { CuePoint, Reel } from "../types/types";

export type OptionsFile = {
  file: File;
  fileHandle: FileSystemFileHandle;
  content: string | null;
};

export type FolderContent = {
  directoryHandle: FileSystemDirectoryHandle;
  reels: Array<Reel>;
  options: OptionsFile | null;
};

type FolderContentStore = {
  folderContent: FolderContent | null;
  updateReelCuePoints: (reelId: string, cuePoints: Array<CuePoint>) => void;
  updateOptionsContent: (content: string) => Promise<boolean>;
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
  },
  updateOptionsContent: async (content: string) => {
    const { folderContent } = get();
    if (!folderContent || !folderContent.options) return false;
    
    try {
      // Get a writable file handle
      const fileHandle = folderContent.options.fileHandle;
      const writable = await fileHandle.createWritable();
      
      // Write the updated content to the file
      await writable.write(content);
      await writable.close();
      
      // Update the store with the new options content
      set({
        folderContent: {
          ...folderContent,
          options: {
            ...folderContent.options,
            content
          }
        }
      });
      
      return true;
    } catch (error) {
      console.error("Error updating options file:", error);
      return false;
    }
  }
}));

export const setFolderContent = (folderContent: FolderContent | null) =>
  useFolderContentStore.setState({ folderContent });

export function useFolderContent(): FolderContent | null {
  return useFolderContentStore((state) => state.folderContent);
}
