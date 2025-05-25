import { useParams } from "react-router-dom";

export function usePathParams(): {
  reelId: string | undefined;
  spliceId: string | undefined;
} {
  const { reelId, spliceId } = useParams();

  return {
    reelId,
    spliceId,
  };
}
