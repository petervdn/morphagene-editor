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
  hasUnsavedChanges: boolean;
  onSpliceClick: (index: number) => void;
  onSpliceMouseEnter: (index: number) => void;
  onSpliceMouseLeave: () => void;
  onSpliceDelete: (index: number) => void;
  saveChanges: () => void;
  resetChanges: () => void;
};

export function useSplices({
  cuePoints,
  audioBuffer,
}: UseSplicesProps): UseSplicesResult {
  // Store the original cue points for comparison
  const [originalCuePoints] = useState<Array<CuePoint>>(cuePoints);
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

  // Check if current markers are different from original cue points
  const hasUnsavedChanges = useMemo(() => {
    if (markers.length !== originalCuePoints.length) {
      return true;
    }
    
    // Compare each marker with original cue point
    return markers.some((marker, index) => {
      const originalTime = originalCuePoints[index]?.timeInSeconds;
      return marker.time !== originalTime;
    });
  }, [markers, originalCuePoints]);
  
  // Function to save changes (placeholder for now)
  const saveChanges = useCallback(() => {
    // This would be implemented to actually save the changes
    console.log('Saving changes:', markers);
    // In a real implementation, this would update the original cue points
  }, [markers]);
  
  // Function to reset changes back to original cue points
  const resetChanges = useCallback(() => {
    // Reset markers to their original state
    setMarkers(originalCuePoints.map(({ timeInSeconds }) => ({
      time: timeInSeconds,
    })));
    
    // Reset highlighted splice index
    setHighlightedSpliceIndex(-1);
    
    console.log('Changes reset to original state');
  }, [originalCuePoints]);

  return {
    markers,
    splices,
    highlightedSpliceIndex,
    hasUnsavedChanges,
    onSpliceClick,
    onSpliceMouseEnter,
    onSpliceMouseLeave,
    onSpliceDelete,
    saveChanges,
    resetChanges,
  };
}
