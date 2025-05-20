import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { useEffect, useState, useRef } from "react";
import { ReelDetails } from "../../components/ReelDetails/ReelDetails";
import { useGetReelById } from "../../utils/hooks/useGetReelById";
import { decodeAudioFile } from "../../utils/audio/decodeAudioFile";
import { useAudioContext } from "../../utils/hooks/useAudioContext";
import { useFolderContent } from "../../stores/folderContentStore";
import { routes } from "../../routes/routes";
import { useKeyboardNavigation } from "../../utils/hooks/useKeyboardNavigation";
import { useSplices } from "../../utils/hooks/useSplices";

export function ReelPage() {
  const { reelId, spliceId } = useParams();
  const navigate = useNavigate();
  const folderContent = useFolderContent();
  
  const reel = useGetReelById(reelId ?? "");
  const audioContext = useAudioContext();

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  
  // Create a ref to hold the zoomToRange function from WaveformView
  const zoomToRangeRef = useRef<
    | ((start: number, end: number, options?: any) => void)
    | null
  >(null);
  
  // Create a ref to hold the setZoomLevel function
  const setZoomLevelRef = useRef<((level: number) => void) | null>(null);
  
  // Always call useSplices, but with safe fallbacks for undefined values
  const { splices = [] } = useSplices({
    reel,
    audioBuffer,
    onReelUpdated: () => {}, // No need to handle updates here
  });
  
  // Use the enhanced keyboard navigation hook with zoom functionality
  useKeyboardNavigation({
    splices,
    zoomToRangeRef,
    setZoomLevel: setZoomLevelRef.current,
    audioBuffer,
  });
  
  // Redirect to folder page if no folder is selected
  useEffect(() => {
    if (!folderContent) {
      // Use replace instead of push to avoid creating a history entry
      navigate(routes.folder, { replace: true });
    }
  }, [folderContent, navigate]);

  useEffect(() => {
    async function getData() {
      if (!reel || !audioContext) {
        return;
      }
      const audioBufferFromFile = await decodeAudioFile(
        reel.file,
        audioContext
      );

      setAudioBuffer(audioBufferFromFile);
    }
    getData();
  }, [audioContext, reel]);

  return (
    <>
      <Breadcrumbs />
      {audioBuffer && reel && (
        <ReelDetails 
          reel={reel} 
          audioBuffer={audioBuffer}
          zoomToRangeRef={zoomToRangeRef}
          setZoomLevelRef={setZoomLevelRef}
        />
      )}
    </>
  );
}
