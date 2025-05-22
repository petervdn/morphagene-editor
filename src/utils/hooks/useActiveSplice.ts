import { useMemo } from "react";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import { useSplices } from "./useSplices";
import { useParamsSpliceIndex } from "./useParamsSpliceIndex";

export function useActiveSplice({
  reel,
}: {
  reel: ReelWithAudioBuffer;
}): Splice | undefined {
  const { splices } = useSplices({ reel });
  const index = useParamsSpliceIndex();

  return useMemo(() => {
    return splices[index];
  }, [index, splices]);
}
