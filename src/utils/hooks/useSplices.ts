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
  // Convert initial markers to the internal format and manage state
  const [markers, setMarkers] = useState<Array<Marker>>(() =>
    cuePoints.map(({ timeInSeconds }) => ({
      time: timeInSeconds,
    }))
  );
  const audioPlayer = useAudioPlayer();
  const [highlightedSpliceIndex, setHighlightedSpliceIndex] =
    useState<number>(-1);

  // Create splices from markers
  const splices = useMemo(() => {
    return createSplicesFromMarkers(markers);
  }, [markers]);

  // Handle splice playback
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

  // Handle splice highlighting on hover
  const onSpliceMouseEnter = useCallback((index: number) => {
    setHighlightedSpliceIndex(index);
  }, []);

  const onSpliceMouseLeave = useCallback(() => {
    setHighlightedSpliceIndex(-1);
  }, []);

  // Handle splice deletion
  const onSpliceDelete = useCallback(
    (index: number) => {
      // Don't allow deleting the first splice
      if (index === 0) {
        return;
      }

      // When deleting splice at index N, we need to remove marker at index N-1
      // This is because each splice is defined by the current marker and the previous marker
      const markerIndexToRemove = index - 1;

      // Create a new array without the deleted marker
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
