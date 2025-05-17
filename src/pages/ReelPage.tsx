import { useParams } from "react-router-dom";
import { useWavHeaderData } from "../utils/hooks/useWavHeaderData";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { NoFolder } from "../components/NoFolder";
import { useAudioBufferFromFile } from "../utils/hooks/useAudioBufferFromFile";
import { WavHeaderTable } from "../components/WavHeaderTable/WavHeaderTable";

import styles from "./ReelPage.module.css";
import { getReelNumber } from "../utils/getReelNumber";
import { PiFilmReel } from "react-icons/pi";
import { useCallback, useMemo } from "react";
import { getSplices } from "../utils/getSplices";
import { SplicesList } from "../components/SplicesList/SplicesList";
import { playSplice } from "../utils/audio/playSplice";
import { useAudioContext } from "../utils/hooks/useAudioContext";

export function ReelPage() {
  const { reelName } = useParams();

  const audioBuffer = useAudioBufferFromFile(reelName ?? "");
  const audioContext = useAudioContext();
  const headerData = useWavHeaderData(reelName ?? "");

  const splices = useMemo(() => {
    return headerData ? getSplices(headerData.cuePoints) : null;
  }, [headerData]);

  const onSpliceClick = useCallback(
    (index: number) => {
      async function play() {
        console.log("play", index);
        const splice = splices?.at(index);
        if (!splice || !audioContext || !audioBuffer) {
          return;
        }
        console.log("play 1", audioContext.state);
        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }
        console.log("play 2", audioContext.state);
        playSplice(audioBuffer, splice, audioContext);
      }
      play();
    },
    [audioBuffer, audioContext, splices]
  );

  return (
    <>
      <Breadcrumbs />
      {!headerData && <NoFolder />}
      {headerData && reelName && (
        <>
          <h2 className={styles.reelTitle}>
            <PiFilmReel /> Reel #{getReelNumber(reelName)}{" "}
            <small>{reelName}</small>
          </h2>

          <div className={styles.reelContentLayout}>
            <div className={styles.reelMainContent}>
              {splices && (
                <SplicesList splices={splices} onSpliceClick={onSpliceClick} />
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
