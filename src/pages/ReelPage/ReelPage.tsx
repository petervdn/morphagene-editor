import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { ReelDetails } from "../../components/ReelDetails/ReelDetails";
import { useGetReelWithAudioBuffer } from "../../hooks/useGetReeWithAudioBuffer";
import { usePathParams } from "../../hooks/usePathParams";

export function ReelPage() {
  const { reelId } = usePathParams();
  const reel = useGetReelWithAudioBuffer(reelId ?? "");

  return (
    <>
      <Breadcrumbs />
      {reel && <ReelDetails reel={reel} />}
    </>
  );
}
