import type { FolderContent, OptionsFile } from "../stores/folderContentStore";
import type { Reel } from "../types/types";
import { parseWavFileHeader } from "./audio/parseWavFileHeader";
import { reelFileNames } from "./reelFileNames";

// todo: prevent gaps?
export async function getFolderContent(
  directoryHandle: FileSystemDirectoryHandle
): Promise<FolderContent> {
  const reels: Array<Reel> = [];
  let options: OptionsFile | null = null;

  for await (const entry of directoryHandle.values()) {
    if (entry.kind === "file") {
      const index = reelFileNames.indexOf(entry.name);
      
      if (index > -1) {
        // Handle WAV files (reels)
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
      } else if (entry.name.toLowerCase() === "options.txt") {
        // Handle options.txt file
        const file = await entry.getFile();
        let content: string | null = null;
        
        try {
          content = await file.text();
        } catch (error) {
          console.error("Error reading options.txt file:", error);
        }
        
        options = {
          file,
          fileHandle: entry,
          content,
        };
      }
    }
  }

  reels.sort((a, b) => Number(a.id) - Number(b.id));

  return {
    directoryHandle,
    reels,
    options,
  };
}
