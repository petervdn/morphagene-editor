import { create } from "zustand";
import type { Reel, MorphageneOptions } from "../types/types";
import type { WaveFile } from "wavefile";

export type FolderContent = {
  directoryHandle: FileSystemDirectoryHandle; // move outside of this obj
  reels: Array<Reel>;
  options: MorphageneOptions | null;
};

type FolderContentStore = {
  folderContent: FolderContent | null;
};

export const useFolderContentStore = create<FolderContentStore>(() => ({
  folderContent: null,
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

export function setWaveFileForReel({
  waveFile,
  reelId,
}: {
  waveFile: WaveFile;
  reelId: string;
}) {
  useFolderContentStore.setState((state) => ({
    folderContent: state.folderContent
      ? {
          ...state.folderContent,
          reels: state.folderContent.reels.map((reel) => {
            return reel.id !== reelId ? reel : { ...reel, waveFile };
          }),
        }
      : null,
  }));
}
