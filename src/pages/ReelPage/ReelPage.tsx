import { useParams } from "react-router-dom";
import { useWavHeaderData } from "../../utils/hooks/useWavHeaderData";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { NoFolder } from "../../components/NoFolder";
import { useAudioBufferFromFile } from "../../utils/hooks/useAudioBufferFromFile";
import { WavHeaderTable } from "../../components/WavHeaderTable/WavHeaderTable";

import styles from "./ReelPage.module.css";
import { getReelNumber } from "../../utils/getReelNumber";
import { PiFilmReel } from "react-icons/pi";
import { useCallback, useMemo, useState } from "react";
import { getSplices } from "../../utils/getSplices";
import { SplicesList } from "../../components/SplicesList/SplicesList";
import { useAudioContext } from "../../utils/hooks/useAudioContext";
import { WaveformView } from "../../components/WaveformView/WaveformView";
import { PlayControls } from "../../components/PlayControls/PlayControls";
import { useAudioPlayer } from "../../utils/hooks/useAudioPlayer";

export function ReelPage() {
  const { reelName } = useParams();

  const audioBuffer = useAudioBufferFromFile(reelName ?? "");
  const audioContext = useAudioContext();
  const headerData = useWavHeaderData(reelName ?? "");
  const [highlightedSpliceIndex, setHighlightedSpliceIndex] =
    useState<number>(-1);
  const audioPlayer = useAudioPlayer();

  const splices = useMemo(() => {
    return headerData ? getSplices(headerData.cuePoints) : null;
  }, [headerData]);

  const onSpliceClick = useCallback(
    (index: number) => {
      async function play() {
        if (!audioPlayer) {
          return;
        }

        const splice = splices?.at(index);
        if (!splice || !audioContext || !audioBuffer) {
          return;
        }
        audioPlayer.playSound({ audioBuffer, splice });
      }
      play();
    },
    [audioBuffer, audioContext, audioPlayer, splices]
  );

  const onSpliceMouseEnter = useCallback((index: number) => {
    setHighlightedSpliceIndex(index);
  }, []);

  const onSpliceMouseLeave = useCallback(() => {
    setHighlightedSpliceIndex(-1);
  }, []);

  return (
    <>
      <Breadcrumbs />
      {!headerData && <NoFolder />}
      {headerData && reelName && audioBuffer && splices && (
        <>
          <h2 className={styles.reelTitle}>
            <PiFilmReel /> Reel #{getReelNumber(reelName)}
          </h2>
          <PlayControls />
          <WaveformView
            audioBuffer={audioBuffer}
            splices={splices}
            highlightSpliceIndex={highlightedSpliceIndex}
          />
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
              <WavHeaderTable headerData={headerData} filename={reelName} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
