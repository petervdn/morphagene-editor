import { reelFileNames } from "./reelFileNames";

export function getReelNumber(fileName: string): number | undefined {
  return reelFileNames.indexOf(fileName) !== -1
    ? reelFileNames.indexOf(fileName) + 1
    : undefined;
}
