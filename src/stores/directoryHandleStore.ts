import { create } from "zustand";

type DirectoryHandleStore = {
  directoryHandle: FileSystemDirectoryHandle | null;
};

export const useDirectoryHandleStore = create<DirectoryHandleStore>(() => ({
  directoryHandle: null,
}));

export const setDirectoryHandle = (handle: FileSystemDirectoryHandle | null) =>
  useDirectoryHandleStore.setState({ directoryHandle: handle });

export function useDirectoryHandle(): FileSystemDirectoryHandle | null {
  return useDirectoryHandleStore((state) => state.directoryHandle);
}
