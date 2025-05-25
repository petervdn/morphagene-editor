import {
  setFolderContent,
  type FolderContent,
} from "../stores/folderContentStore";
import { getFolderContent } from "../utils/folder/getFolderContent";

export async function refreshFolder(folderContent: FolderContent) {
  setFolderContent(await getFolderContent(folderContent.directoryHandle));
}
