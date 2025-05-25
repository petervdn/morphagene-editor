import { useMemo } from "react";
import type { Splice } from "../types/types";
import { useParamsSpliceIndex } from "../hooks/useParamsSpliceIndex";
import { useSplices } from "../hooks/useSplices";

export function useActiveSplice(): Splice | null {
  const index = useParamsSpliceIndex();
  const splices = useSplices();

  return useMemo(() => {
    return splices?.at(index) ?? null;
  }, [index, splices]);
}
