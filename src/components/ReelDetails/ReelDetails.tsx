import { useCallback, useState, type ReactElement } from "react";
import styles from "./ReelDetails.module.css";
import { PiFilmReel } from "react-icons/pi";
import { WaveformView } from "../WaveformView/WaveformView";
import { PlayControls } from "../PlayControls/PlayControls";
import type { Splice } from "../../utils/getSplices";
import { SplicesList } from "../SplicesList/SplicesList";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";
import { WavHeaderTable } from "../WavHeaderTable/WavHeaderTable";
import type { Reel } from "../../types/types";

type Props = {
  reel: Reel;
  audioBuffer: AudioBuffer;
  splices: Array<Splice>; // rename initial splices
};

export function ReelDetails({
  reel,
  audioBuffer,
  splices,
}: Props): ReactElement {
  const audioPlayer = useAudioPlayer();

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
      <div className={styles.reelContentLayout}>
        <div className={styles.reelMainContent}>
          {splices && (
            <SplicesList
              splices={splices}
              onSpliceClick={onSpliceClick}
              onSpliceMouseEnter={onSpliceMouseEnter}
              onSpliceMouseLeave={onSpliceMouseLeave}
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
