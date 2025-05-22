import { useSplices } from "./useSplices";
import type { Reel, Splice } from "../../types/types";
import { getSplicePath } from "../../routes/utils/getSplicePath";
import { useParamsSpliceIndex } from "./useParamsSpliceIndex";

export type UseSpliceNavigationResult = {
  hasPreviousSplice: boolean;
  hasNextSplice: boolean;
  previousSplicePath: string | undefined;
  nextSplicePath: string | undefined;
};

export function useSpliceNavigation({
  reel,
}: {
  reel: Reel;
  activeSplice: Splice;
}): UseSpliceNavigationResult {
  const { splices } = useSplices({ reel });
  const activeSpliceIndex = useParamsSpliceIndex();

  const nextSplicePath =
    activeSpliceIndex > -1 && activeSpliceIndex < splices.length - 1
      ? getSplicePath({
          reelId: reel.id,
          spliceId: String(activeSpliceIndex + 2),
        })
      : undefined;

  const previousSplicePath =
    activeSpliceIndex > 0
      ? getSplicePath({
          reelId: reel.id,
          spliceId: String(activeSpliceIndex),
        })
      : undefined;

  return {
    nextSplicePath,
    previousSplicePath,
    hasNextSplice: Boolean(nextSplicePath),
    hasPreviousSplice: Boolean(previousSplicePath),
  };
}
