export async function getReelFile(
  fileName: string,
  directoryHandle: FileSystemDirectoryHandle
): Promise<File> {
  const fileHandle = await directoryHandle.getFileHandle(fileName);
  const file = await fileHandle.getFile();
  return file;
}
