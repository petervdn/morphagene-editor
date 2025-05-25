import { useParams } from "react-router-dom";
import type { Splice } from "../types/types";

export function useSplice(splices: Array<Splice>): {
  isFirstSplice: boolean;
  isLastSplice: boolean;
  spliceDuration: string; // should be number
  spliceId: string | undefined;
  splice: Splice | undefined;
  spliceIndex: number | undefined;
} {
  const { spliceId } = useParams();
  // const navigate = useNavigate();

  // Parse the splice index from the URL parameter
  const spliceIndex = spliceId ? parseInt(spliceId, 10) - 1 : undefined;

  // Get the current splice
  const splice =
    typeof spliceIndex === "number" ? splices[spliceIndex] : undefined;

  // Check if this is the first or last splice
  const isFirstSplice = spliceIndex === 0;
  const isLastSplice = spliceIndex === splices.length - 1;

  // Calculate splice duration
  const spliceDuration = splice ? (splice.end - splice.start).toFixed(2) : "0";

  // todo return either valid data or nothing, then clean up checks in component that uses this
  return {
    isFirstSplice,
    isLastSplice,
    spliceDuration,
    splice,
    spliceIndex,
    spliceId,
  };
}
