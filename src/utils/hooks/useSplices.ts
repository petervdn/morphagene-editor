import { useCallback, useMemo } from "react";
import type { Reel, Splice } from "../../types/types";
import { useParamsSpliceIndex } from "./useParamsSpliceIndex";
import { useCuePointTimes } from "./useCuePointTimes";
import { createSplicesFromCuePointTimes } from "../splices/createSplicesFromCuePointTimes";

type UseSplicesProps = {
  reel: Reel;
};

type UseSplicesResult = {
  splices: Array<Splice>;
  addSplice(time: number): void;
  activeSplice: Splice;
};

export function useSplices({ reel }: UseSplicesProps): UseSplicesResult {
  const index = useParamsSpliceIndex();

  const { cuePointTimes, setCuePointTimes } = useCuePointTimes({ reel });

  const addSplice = useCallback(
    (time: number) => {
      setCuePointTimes((current) => [...current, time]);
    },
    [setCuePointTimes]
  );

  const splices = useMemo(() => {
    return createSplicesFromCuePointTimes(cuePointTimes);
  }, [cuePointTimes]);

  const activeSplice = useMemo(() => {
    return splices[index];
  }, [index, splices]);

  // // Check if current markers are different from original cue points
  // const hasUnsavedChanges = useMemo(() => {
  //   if (markers.length !== originalCuePoints.length) {
  //     return true;
  //   }

  //   // Compare each marker with original cue point
  //   return markers.some((marker, index) => {
  //     const originalTime = originalCuePoints[index]?.timeInSeconds;
  //     return marker.time !== originalTime;
  //   });
  // }, [markers, originalCuePoints]);

  // // Function to save changes to the file
  // const saveChanges = useCallback(async () => {
  //   // Early return if reel or audioBuffer is undefined
  //   if (!reel || !audioBuffer) {
  //     console.error("Cannot save changes: reel or audioBuffer is undefined");
  //     return;
  //   }

  //   try {
  //     // Check if the File System Access API is available
  //     if (!("showSaveFilePicker" in window)) {
  //       console.error("File System Access API not supported");
  //       return;
  //     }

  //     // Get permission to write to the file
  //     // We need to get a writable file handle
  //     let fileHandle: FileSystemFileHandle;

  //     try {
  //       // Try to get the existing file handle if we have it
  //       fileHandle = reel.fileHandle;
  //     } catch (error) {
  //       console.error("Error accessing file handle:", error);
  //       return;
  //     }

  //     // Save the file with updated cue points
  //     await saveWavToFileSystem(
  //       fileHandle,
  //       audioBuffer,
  //       markers,
  //       reel.wavHeaderData
  //     );

  //     console.log("File saved successfully");

  //     // Reload the file to ensure we're working with the actual saved data
  //     const file = await fileHandle.getFile();
  //     const updatedWavHeaderData = await parseWavFileHeader(file);

  //     // Update the reel with the freshly loaded data
  //     reel.file = file;
  //     reel.wavHeaderData = updatedWavHeaderData;

  //     // Update our local state with the reloaded data
  //     setOriginalCuePoints(updatedWavHeaderData.cuePoints);
  //     setMarkers(
  //       updatedWavHeaderData.cuePoints.map(({ timeInSeconds }) => ({
  //         time: timeInSeconds,
  //       }))
  //     );

  //     // Notify any listeners that the reel has been updated
  //     if (onReelUpdated) {
  //       onReelUpdated(reel.id, updatedWavHeaderData.cuePoints);
  //     }
  //   } catch (error) {
  //     console.error("Error saving file:", error);
  //   }
  // }, [markers, audioBuffer, reel, onReelUpdated]);

  // Function to reset changes back to original cue points
  // const resetChanges = useCallback(() => {
  //   // Reset markers to their original state
  //   setMarkers(
  //     originalCuePoints.map(({ timeInSeconds }) => ({
  //       time: timeInSeconds,
  //     }))
  //   );
  // }, [originalCuePoints]);

  // // Function to add a marker at a specific time
  // const addMarker = useCallback(
  //   (timeInSeconds: number) => {
  //     // Create a new marker
  //     const newMarker: Marker = {
  //       time: timeInSeconds,
  //     };

  //     // Add the marker to the list and sort by time
  //     const newMarkers = [...markers, newMarker].sort(
  //       (a, b) => a.time - b.time
  //     );
  //     setMarkers(newMarkers);

  //     console.log(`Added marker at ${timeInSeconds} seconds`);
  //   },
  //   [markers]
  // );

  // // Return empty or default values when reel or audioBuffer is undefined
  // if (!reel || !audioBuffer) {
  //   return {
  //     markers: [],
  //     splices: [],
  //     hasUnsavedChanges: false,
  //     onSpliceClick: () => {},
  //     onSpliceDelete: () => {},
  //     addMarker: () => {},
  //     saveChanges: () => {},
  //     resetChanges: () => {},
  //   };
  // }

  return {
    splices,
    addSplice,
    activeSplice,
  };
}
