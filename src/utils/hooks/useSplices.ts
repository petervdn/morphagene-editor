import { useCallback, useMemo, useState } from "react";
import type { CuePoint, Marker, Splice } from "../../types/types";
import { createSplicesFromMarkers } from "../createSplicesFromMarkers";
import { useAudioPlayer } from "./useAudioPlayer";

type UseSplicesProps = {
  cuePoints: Array<CuePoint>;
  audioBuffer: AudioBuffer;
};

type UseSplicesResult = {
  markers: Array<Marker>;
  splices: Array<Splice>;
  highlightedSpliceIndex: number;
  onSpliceClick: (index: number) => void;
  onSpliceMouseEnter: (index: number) => void;
  onSpliceMouseLeave: () => void;
  onSpliceDelete: (index: number) => void;
};

export function useSplices({
  cuePoints,
  audioBuffer,
}: UseSplicesProps): UseSplicesResult {
  const [markers, setMarkers] = useState<Array<Marker>>(() =>
    cuePoints.map(({ timeInSeconds }) => ({
      time: timeInSeconds,
    }))
  );
  const audioPlayer = useAudioPlayer();
  const [highlightedSpliceIndex, setHighlightedSpliceIndex] =
    useState<number>(-1);

  const splices = useMemo(() => {
    return createSplicesFromMarkers(markers);
  }, [markers]);

  const onSpliceClick = useCallback(
    (index: number) => {
      async function play() {
        if (!audioPlayer) {
          return;
        }

        const splice = splices?.at(index);
        if (!splice || !audioBuffer) {
          return;
        }
        audioPlayer.playSound({ audioBuffer, splice });
      }
      play();
    },
    [audioBuffer, audioPlayer, splices]
  );

  const onSpliceMouseEnter = useCallback((index: number) => {
    setHighlightedSpliceIndex(index);
  }, []);

  const onSpliceMouseLeave = useCallback(() => {
    setHighlightedSpliceIndex(-1);
  }, []);

  const onSpliceDelete = useCallback(
    (index: number) => {
      // first splice cannot be deleted
      if (index === 0) {
        return;
      }

      // when deleting splice at index N, we need to remove marker at index N-1,
      // because each splice is defined by the current marker and the previous marker
      const markerIndexToRemove = index - 1;

      const newMarkers = [...markers];
      newMarkers.splice(markerIndexToRemove, 1);
      setMarkers(newMarkers);

      // Reset highlighted splice if it was the deleted one
      if (highlightedSpliceIndex === index) {
        setHighlightedSpliceIndex(-1);
      }
    },
    [markers, highlightedSpliceIndex, setMarkers]
  );

  return {
    markers,
    splices,
    highlightedSpliceIndex,
    onSpliceClick,
    onSpliceMouseEnter,
    onSpliceMouseLeave,
    onSpliceDelete,
  };
}
