import { useNavigate } from "react-router-dom";
import { useSpliceNavigation } from "./useSpliceNavigation";
import { useCallback, useMemo } from "react";
import type { ReelWithAudioBuffer } from "../types/types";
import { useKeys } from "./useKeys";

export function useKeyboardSpliceNavigation({
  reel,
}: {
  reel: ReelWithAudioBuffer;
}) {
  const navigate = useNavigate();

  const { nextSplicePath, previousSplicePath } = useSpliceNavigation({ reel });

  const gotoNext = useCallback(() => {
    if (!nextSplicePath) {
      return;
    }

    navigate(nextSplicePath);
  }, [navigate, nextSplicePath]);

  const gotoPrevious = useCallback(() => {
    if (!previousSplicePath) {
      return;
    }

    navigate(previousSplicePath);
  }, [navigate, previousSplicePath]);

  const keysConfig = useMemo(
    () => ({
      ArrowLeft: gotoPrevious,
      ArrowRight: gotoNext,
    }),
    [gotoNext, gotoPrevious]
  );

  useKeys(keysConfig);
}
