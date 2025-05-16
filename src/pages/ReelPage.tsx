import { useParams } from "react-router-dom";

export function ReelPage() {
  const { reelName } = useParams();
  return <h2>Reel {reelName}</h2>;
}
