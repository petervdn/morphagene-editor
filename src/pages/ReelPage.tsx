import { useParams } from "react-router-dom";
import { useWavHeaderData } from "../utils/hooks/useWavHeaderData";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { NoFolder } from "../components/NoFolder";
import { useAudioBufferFromFile } from "../utils/hooks/useAudioBufferFromFile";
import { WavHeaderTable } from "../components/WavHeaderTable/WavHeaderTable";
import { CuePointsList } from "../components/CuePointsList/CuePointsList";
import "./ReelPage.css";

export function ReelPage() {
  const { reelName } = useParams();

  const audioBuffer = useAudioBufferFromFile(reelName ?? "");
  const headerData = useWavHeaderData(reelName ?? "");

  return (
    <>
      <Breadcrumbs />
      {!headerData && <NoFolder />}
      {headerData && (
        <>
          <h2>
            Reel {reelName} ({headerData.duration.toFixed(1)} seconds,{" "}
            {headerData.cuePoints.length} cue points)
          </h2>
          
          <div className="reel-content-layout">
            <div className="reel-main-content">
              <CuePointsList cuePoints={headerData.cuePoints} />
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
