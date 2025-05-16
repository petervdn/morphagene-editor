import { useParams } from "react-router-dom";
import { useReadWavFile } from "../utils/hooks/useReadReelFile";

export function ReelPage() {
  const { reelName } = useParams();
  const parsed = useReadWavFile(reelName ?? "");

  if (!parsed) {
    return null;
  }

  console.log(parsed);

  return (
    <h2>
      Reel {reelName} ({parsed.audioBuffer.duration.toFixed(1)} seconds)
    </h2>
  );
}
