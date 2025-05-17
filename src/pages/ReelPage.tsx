import { useParams } from "react-router-dom";
import { useWavHeaderData } from "../utils/hooks/useWavHeaderData";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { NoFolder } from "../components/NoFolder";
import { useAudioBufferFromFile } from "../utils/hooks/useAudioBufferFromFile";
import { WavHeaderTable } from "../components/WavHeaderTable/WavHeaderTable";

import "./ReelPage.css";
import { getReelNumber } from "../utils/getReelNumber";
import { PiFilmReel } from "react-icons/pi";
import { useMemo } from "react";
import { getSplices } from "../utils/getSplices";
import { SplicesList } from "../components/SplicesList/SplicesList";

export function ReelPage() {
  const { reelName } = useParams();

  const audioBuffer = useAudioBufferFromFile(reelName ?? "");
  const headerData = useWavHeaderData(reelName ?? "");

  const splices = useMemo(() => {
    return headerData ? getSplices(headerData.cuePoints) : null;
  }, [headerData]);

  return (
    <>
      <Breadcrumbs />
      {!headerData && <NoFolder />}
      {headerData && reelName && (
        <>
          <h2 className="reel-title">
            <PiFilmReel /> Reel #{getReelNumber(reelName)}{" "}
            <small>{reelName}</small>
          </h2>

          <div className="reel-content-layout">
            <div className="reel-main-content">
              {splices && <SplicesList splices={splices} />}
            </div>
            <div className="reel-sidebar">
              <WavHeaderTable headerData={headerData} filename={reelName} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
