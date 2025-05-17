import { useParams } from "react-router-dom";
import { useWavHeaderData } from "../utils/hooks/useWavHeaderData";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";

export function ReelPage() {
  const { reelName } = useParams();
  const headerData = useWavHeaderData(reelName ?? "");

  if (!headerData) {
    return null;
  }

  return (
    <>
      <Breadcrumbs />
      <h2>
        Reel {reelName} ({headerData.duration.toFixed(1)} seconds,{" "}
        {headerData.cuePoints.length} cue points)
      </h2>
    </>
  );
}
