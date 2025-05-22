import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { usePathParams } from "../../utils/hooks/usePathParams";
import { useGetReelWithAudioBuffer } from "../../utils/hooks/useGetReeWithAudioBuffer";
import { ReelDetails } from "../../components/ReelDetails/ReelDetails";

export function ReelPage() {
  const { reelId } = usePathParams();
  const reel = useGetReelWithAudioBuffer(reelId ?? "");

  // const navigate = useNavigate();
  // const folderContent = useFolderContent();

  // const reel = useGetReelById(reelId ?? "");

  // // Create a ref to hold the zoomToRange function from WaveformView
  // const zoomToRangeRef = useRef<
  //   | ((start: number, end: number, options?: any) => void)
  //   | null
  // >(null);

  // // Create a ref to hold the setZoomLevel function
  // const setZoomLevelRef = useRef<((level: number) => void) | null>(null);

  // // Always call useSplices, but with safe fallbacks for undefined values
  // const { splices = [] } = useSplices({
  //   reel,
  //   audioBuffer,
  //   onReelUpdated: () => {}, // No need to handle updates here
  // });

  // // Use the enhanced keyboard navigation hook with zoom functionality
  // useKeyboardNavigation({
  //   splices,
  //   zoomToRangeRef,
  //   setZoomLevel: setZoomLevelRef.current,
  //   audioBuffer,
  // });

  return (
    <>
      <Breadcrumbs />
      {reel && <ReelDetails reel={reel} />}
    </>
  );
}
