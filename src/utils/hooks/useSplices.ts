import { useCallback, useMemo, useState } from "react";
import type { CuePoint, Marker, Reel, Splice } from "../../types/types";
import { createSplicesFromMarkers } from "../createSplicesFromMarkers";
import { useAudioPlayer } from "./useAudioPlayer";
import { saveWavToFileSystem } from "../audio/saveWavWithCuePoints";
import { parseWavFileHeader } from "../audio/parseWavFileHeader";

type UseSplicesProps = {
  reel: Reel;
  audioBuffer: AudioBuffer;
  onReelUpdated?: (reelId: string, cuePoints: Array<CuePoint>) => void;
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
  reel,
  audioBuffer,
  onReelUpdated,
}: UseSplicesProps): UseSplicesResult {
  const cuePoints = reel.wavHeaderData.cuePoints;
  // Store the original cue points for comparison
  const [originalCuePoints, setOriginalCuePoints] = useState<Array<CuePoint>>(cuePoints);
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
  
  // Function to save changes to the file
  const saveChanges = useCallback(async () => {
    try {
      // Check if the File System Access API is available
      if (!('showSaveFilePicker' in window)) {
        console.error('File System Access API not supported');
        return;
      }

      // Get permission to write to the file
      // We need to get a writable file handle
      let fileHandle: FileSystemFileHandle;
      
      try {
        // Try to get the existing file handle if we have it
        fileHandle = reel.fileHandle;
      } catch (error) {
        console.error('Error accessing file handle:', error);
        return;
      }

      // Save the file with updated cue points
      await saveWavToFileSystem(
        fileHandle,
        audioBuffer,
        markers,
        reel.wavHeaderData
      );

      console.log('File saved successfully');
      
      // Reload the file to ensure we're working with the actual saved data
      const file = await fileHandle.getFile();
      const updatedWavHeaderData = await parseWavFileHeader(file);
      
      // Update the reel with the freshly loaded data
      reel.file = file;
      reel.wavHeaderData = updatedWavHeaderData;
      
      // Update our local state with the reloaded data
      setOriginalCuePoints(updatedWavHeaderData.cuePoints);
      setMarkers(updatedWavHeaderData.cuePoints.map(({ timeInSeconds }) => ({
        time: timeInSeconds,
      })));
      
      // Notify any listeners that the reel has been updated
      if (onReelUpdated) {
        onReelUpdated(reel.id, updatedWavHeaderData.cuePoints);
      }
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }, [markers, audioBuffer, reel, onReelUpdated]);
  
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
