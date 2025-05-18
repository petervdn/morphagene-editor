import { create } from "zustand";
import type { Reel } from "../types/types";

export type FolderContent = {
  directoryHandle: FileSystemDirectoryHandle;
  reels: Array<Reel>;
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
