import type { FolderContent } from "../../stores/folderContentStore";
import type { MorphageneOptions, Reel } from "../../types/types";
import { reelFileNames } from "../../constants/reelFileNames";
import { createWaveFileFromFile } from "../reels/reloadReelWavHeaderData";

// todo: prevent gaps?
export async function getFolderContent(
  directoryHandle: FileSystemDirectoryHandle
): Promise<FolderContent> {
  const reels: Array<Reel> = [];
  let options: MorphageneOptions | null = null;

  for await (const entry of directoryHandle.values()) {
    if (entry.kind === "file") {
      const index = reelFileNames.indexOf(entry.name);

      if (index > -1) {
        // reel files (wav)
        const id = (index + 1).toString();
        const file = await entry.getFile();
        const waveFile = await createWaveFileFromFile(file);

        reels.push({
          id,
          fileName: file.name,
          fileHandle: entry,
          name: `Reel #${id}`,
          // wavHeaderData,
          audioBuffer: null,
          waveFile,
        });
      } else if (entry.name === "options.txt") {
        // options.txt file
        const file = await entry.getFile();
        let content: string | null = null;

        try {
          content = await file.text();
        } catch (error) {
          console.error("Error reading options.txt file:", error);
        }

        if (content) {
          options = {
            // file,
            fileHandle: entry,
            content,
          };
        }
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
