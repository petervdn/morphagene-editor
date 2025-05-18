import { type ReactElement } from "react";
import { PiFilmReel } from "react-icons/pi";
import styles from "./ReelDetails.module.css";
import { WaveformView } from "../WaveformView/WaveformView";
import { PlayControls } from "../PlayControls/PlayControls";
import { SplicesList } from "../SplicesList/SplicesList";
import { WavHeaderTable } from "../WavHeaderTable/WavHeaderTable";
import type { Reel } from "../../types/types";
import { useSplices } from "../../utils/hooks/useSplices";

type Props = {
  reel: Reel;
  audioBuffer: AudioBuffer;
};

export function ReelDetails({ reel, audioBuffer }: Props): ReactElement {
  const {
    splices,
    highlightedSpliceIndex,
    onSpliceClick,
    onSpliceMouseEnter,
    onSpliceMouseLeave,
    onSpliceDelete,
  } = useSplices({
    cuePoints: reel.wavHeaderData.cuePoints,
    audioBuffer,
  });

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
