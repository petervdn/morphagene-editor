import { useParams } from "react-router-dom";
import { useWavHeaderData } from "../utils/hooks/useWavHeaderData";

export function ReelPage() {
  const { reelName } = useParams();
  const headerData = useWavHeaderData(reelName ?? "");

  if (!headerData) {
    return null;
  }

  console.log(headerData);

  return (
    <h2>
      Reel {reelName} ({headerData.duration.toFixed(1)} seconds,{" "}
      {headerData.cuePoints.length} cue points)
    </h2>
  );
}
