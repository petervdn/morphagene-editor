import { useNavigate } from "react-router-dom";
import { useSpliceNavigation } from "./useSpliceNavigation";
import { useCallback, useMemo } from "react";
import type { ReelWithAudioBuffer } from "../types/types";
import { useKeys } from "./useKeys";
import type { UseWaveformViewResult } from "../components/WaveformView/hooks/useWaveformView";
import { useActiveSplice } from "../stores/useActiveSplice";

export function useKeyboardSpliceNavigation({
  reel,
  zoomOutToReel,
  zoomToSplice,
}: {
  reel: ReelWithAudioBuffer;
  zoomToSplice: UseWaveformViewResult["zoomToSplice"];
  zoomOutToReel: UseWaveformViewResult["zoomOutToReel"];
}) {
  const navigate = useNavigate();

  const { nextSplicePath, previousSplicePath } = useSpliceNavigation({ reel });
  const activeSplice = useActiveSplice();

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

  const zoomToActiveSplice = useCallback(() => {
    if (!activeSplice) {
      return;
    }
    zoomToSplice(activeSplice);
  }, [activeSplice, zoomToSplice]);

  const keysConfig = useMemo(
    () => ({
      ArrowLeft: gotoPrevious,
      ArrowRight: gotoNext,
      ArrowUp: zoomOutToReel,
      ArrowDown: zoomToActiveSplice,
    }),
    [gotoNext, gotoPrevious, zoomOutToReel, zoomToActiveSplice]
  );

  useKeys(keysConfig);
}
