import { useCallback, useEffect, useState } from "react";
import { useDirectoryHandleStore } from "../../stores/directoryHandleStore";
import { reelFileNames } from "../reelFileNames";
import type { ReelFile } from "../../types/types";

type Result = {
  directoryHandle: FileSystemDirectoryHandle | null;
  reels: Array<ReelFile> | null;
  refresh: () => void;
};

export function useReelsFromDirectory(): Result {
  const directoryHandle = useDirectoryHandleStore(
    (state) => state.directoryHandle
  );

  const [reels, setReels] = useState<Array<ReelFile>>([]);

  const getReels = useCallback(() => {
    async function readDirectory() {
      if (!directoryHandle) {
        return;
      }

      const tempReels: Array<ReelFile> = [];

      for await (const entry of directoryHandle.values()) {
        if (entry.kind === "file" && reelFileNames.includes(entry.name)) {
          tempReels.push({
            name: entry.name,
            handle: entry,
          });
        }
      }

      setReels(
        tempReels.toSorted(
          (a, b) =>
            reelFileNames.indexOf(a.name) - reelFileNames.indexOf(b.name)
        )
      );
    }

    readDirectory();
  }, [directoryHandle]);

  useEffect(() => {
    getReels();
  }, [getReels]);

  return {
    directoryHandle,
    reels,
    refresh: getReels,
  };
}
