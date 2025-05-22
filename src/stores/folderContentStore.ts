import { create } from "zustand";
import type { Reel, MorphageneOptions } from "../types/types";

export type FolderContent = {
  directoryHandle: FileSystemDirectoryHandle; // move outside of this obj
  reels: Array<Reel>;
  options: MorphageneOptions | null;
};

type FolderContentStore = {
  folderContent: FolderContent | null;
  // updateReelCuePoints: (reelId: string, cuePoints: Array<CuePoint>) => void;
  // updateOptionsContent: (content: string) => Promise<boolean>;
};

export const useFolderContentStore = create<FolderContentStore>(() => ({
  folderContent: null,
  // updateReelCuePoints: (reelId: string, cuePoints: Array<CuePoint>) => {
  //   const { folderContent } = get();
  //   if (!folderContent) return;

  //   // Create a new reels array with the updated reel
  //   const updatedReels = folderContent.reels.map(reel => {
  //     if (reel.id === reelId) {
  //       // Create a new reel object with updated cue points
  //       return {
  //         ...reel,
  //         wavHeaderData: {
  //           ...reel.wavHeaderData,
  //           cuePoints
  //         }
  //       };
  //     }
  //     return reel;
  //   });

  //   // Update the store with the new reels array
  //   set({
  //     folderContent: {
  //       ...folderContent,
  //       reels: updatedReels
  //     }
  //   });
  // },
  // updateOptionsContent: async (content: string) => {
  //   const { folderContent } = get();
  //   if (!folderContent || !folderContent.options) return false;

  //   try {
  //     // Get a writable file handle
  //     const fileHandle = folderContent.options.fileHandle;
  //     const writable = await fileHandle.createWritable();

  //     // Write the updated content to the file
  //     await writable.write(content);
  //     await writable.close();

  //     // Update the store with the new options content
  //     set({
  //       folderContent: {
  //         ...folderContent,
  //         options: {
  //           ...folderContent.options,
  //           content
  //         }
  //       }
  //     });

  //     return true;
  //   } catch (error) {
  //     console.error("Error updating options file:", error);
  //     return false;
  //   }
  // }
}));

export const setFolderContent = (folderContent: FolderContent | null) =>
  useFolderContentStore.setState({ folderContent });

export function useFolderContent(): FolderContent | null {
  return useFolderContentStore((state) => state.folderContent);
}

export function setAudioBufferForReel({
  audioBuffer,
  reelId,
}: {
  audioBuffer: AudioBuffer;
  reelId: string;
}) {
  useFolderContentStore.setState((state) => ({
    folderContent: state.folderContent
      ? {
          ...state.folderContent,
          reels: state.folderContent.reels.map((reel) => {
            return reel.id !== reelId ? reel : { ...reel, audioBuffer };
          }),
        }
      : null,
  }));
}
