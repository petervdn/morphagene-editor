import type { FolderContent } from "../stores/folderContentStore";
import type { Reel } from "../types/types";
import { parseWavFileHeader } from "./audio/parseWavFileHeader";
import { reelFileNames } from "./reelFileNames";

// todo: prevent gaps?
export async function getFolderContent(
  directoryHandle: FileSystemDirectoryHandle
): Promise<FolderContent> {
  const reels: Array<Reel> = [];

  for await (const entry of directoryHandle.values()) {
    const index = reelFileNames.indexOf(entry.name);
    if (entry.kind === "file" && index > -1) {
      const id = (index + 1).toString();
      const file = await entry.getFile();
      const wavHeaderData = await parseWavFileHeader(file);

      reels.push({
        id,
        file,
        fileHandle: entry,
        name: `Reel #${id}`,
        wavHeaderData,
      });
    }
  }

  reels.sort((a, b) => Number(a.id) - Number(b.id));

  return {
    directoryHandle,
    reels,
  };
}
