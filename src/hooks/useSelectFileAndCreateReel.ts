import { useCallback } from "react";
import { useAudioContext } from "./useAudioContext";
import { selectAudioFile } from "../utils/file/selectAudioFile";
import { decodeAudioFile } from "../utils/audio/decodeAudioFile";
import type { FolderContent } from "../stores/folderContentStore";
import { reelFileNames } from "../constants/reelFileNames";
import { createWavBlobWithCuePoints } from "../utils/audio/createWavBlobWithCuePoints";
import { refreshFolder } from "./refreshFolder";

export function useSelectFileAndCreateReel() {
  const audioContext = useAudioContext();

  return useCallback(
    async (folderContent: FolderContent) => {
      if (!audioContext) {
        return;
      }
      const file = await selectAudioFile();
      const audioBuffer = ensureStereoBuffer(
        await decodeAudioFile(file, audioContext),
        audioContext
      );

      const newFileName = getFileNameForNewReel(folderContent);

      if (!newFileName) {
        throw new Error("Could not determine filename for new reel");
      }

      const existingFile = await fileExists(
        folderContent.directoryHandle,
        newFileName
      );

      if (existingFile) {
        throw new Error(
          `Intending to write to ${newFileName} but it already exists`
        );
      }
      const blob = await createWavBlobWithCuePoints(audioBuffer, [
        audioBuffer.duration,
      ]);

      const newFileHandle = await folderContent.directoryHandle.getFileHandle(
        newFileName,
        {
          create: true,
        }
      );

      const writable = await newFileHandle.createWritable();
      await writable.write(blob);
      await writable.close();

      refreshFolder(folderContent);
    },
    [audioContext]
  );
}

function getFileNameForNewReel(folderContent: FolderContent): string | null {
  const lastFileName = folderContent.reels.at(-1)?.fileName;
  if (!lastFileName) {
    return reelFileNames[0];
  }
  const index = reelFileNames.indexOf(lastFileName);
  return reelFileNames[index + 1];
}

async function fileExists(
  directoryHandle: FileSystemDirectoryHandle,
  fileName: string
): Promise<boolean> {
  try {
    await directoryHandle.getFileHandle(fileName);
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === "NotFoundError") {
      return false;
    }

    throw error;
  }
}

function ensureStereoBuffer(
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
): AudioBuffer {
  if (audioBuffer.numberOfChannels === 2) {
    return audioBuffer;
  }

  if (audioBuffer.numberOfChannels === 1) {
    const stereoBuffer = audioContext.createBuffer(
      2,
      audioBuffer.length,
      audioBuffer.sampleRate
    );

    const leftChannel = audioBuffer.getChannelData(0);
    const rightChannel = leftChannel.slice();

    stereoBuffer.getChannelData(0).set(leftChannel);
    stereoBuffer.getChannelData(1).set(rightChannel);

    return stereoBuffer;
  }

  throw new Error(
    `Unsupported amount of channels: ${audioBuffer.numberOfChannels}`
  );
}
