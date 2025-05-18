import { useCallback, useMemo, useState, type ReactElement } from "react";
import styles from "./ReelDetails.module.css";
import { PiFilmReel } from "react-icons/pi";
import { WaveformView } from "../WaveformView/WaveformView";
import { PlayControls } from "../PlayControls/PlayControls";

import { SplicesList } from "../SplicesList/SplicesList";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";
import { WavHeaderTable } from "../WavHeaderTable/WavHeaderTable";
import type { Marker, Reel } from "../../types/types";
import { createSplicesFromMarkers } from "../../utils/createSplicesFromMarkers";

type Props = {
  reel: Reel;
  audioBuffer: AudioBuffer;
};

export function ReelDetails({ reel, audioBuffer }: Props): ReactElement {
  const audioPlayer = useAudioPlayer();

  const [markers, setMarkers] = useState<Array<Marker>>(() =>
    reel.wavHeaderData.cuePoints.map(({ timeInSeconds }) => ({
      time: timeInSeconds,
    }))
  );

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

  const [highlightedSpliceIndex, setHighlightedSpliceIndex] =
    useState<number>(-1);
  const onSpliceMouseEnter = useCallback((index: number) => {
    setHighlightedSpliceIndex(index);
  }, []);

  const onSpliceMouseLeave = useCallback(() => {
    setHighlightedSpliceIndex(-1);
  }, []);

  const onSpliceDelete = useCallback(
    (index: number) => {
      console.log("splice index to delete:", index);

      // Don't allow deleting the first splice
      if (index === 0) return;

      // When deleting splice at index N, we need to remove marker at index N-1
      // This is because each splice is defined by the current marker and the previous marker
      const markerIndexToRemove = index - 1;
      console.log("removing marker at index:", markerIndexToRemove);
      
      // Create a new array without the deleted marker
      const newMarkers = [...markers];
      newMarkers.splice(markerIndexToRemove, 1);
      setMarkers(newMarkers);

      // Reset highlighted splice if it was the deleted one
      if (highlightedSpliceIndex === index) {
        setHighlightedSpliceIndex(-1);
      }
    },
    [markers, highlightedSpliceIndex]
  );

  return (
    <>
      <h2 className={styles.reelTitle}>
        <PiFilmReel /> {reel.name}
      </h2>
      <WaveformView
        audioBuffer={audioBuffer}
        splices={splices}
        highlightSpliceIndex={highlightedSpliceIndex}
      />
      <PlayControls />
      <ul>
        {markers.map((marker) => (
          <li>{marker.time}</li>
        ))}
      </ul>
      <div className={styles.reelContentLayout}>
        <div className={styles.reelMainContent}>
          {splices && (
            <SplicesList
              splices={splices}
              onSpliceClick={onSpliceClick}
              onSpliceMouseEnter={onSpliceMouseEnter}
              onSpliceMouseLeave={onSpliceMouseLeave}
              onSpliceDelete={onSpliceDelete}
            />
          )}
        </div>
        <div className={styles.reelSidebar}>
          <WavHeaderTable
            wavHeaderData={reel.wavHeaderData}
            filename={reel.file.name}
          />
        </div>
      </div>
    </>
  );
}
