import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from "react";
import { ReelDetails } from "../../components/ReelDetails/ReelDetails";
import { useGetReelById } from "../../utils/hooks/useGetReelById";
import { decodeAudioFile } from "../../utils/audio/decodeAudioFile";
import { useAudioContext } from "../../utils/hooks/useAudioContext";
import { useFolderContent } from "../../stores/folderContentStore";
import { routes } from "../../routes/routes";

export function ReelPage() {
  const { reelId } = useParams();
  const navigate = useNavigate();
  const folderContent = useFolderContent();
  
  const reel = useGetReelById(reelId ?? "");
  const audioContext = useAudioContext();

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  
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
        <ReelDetails reel={reel} audioBuffer={audioBuffer} />
      )}
    </>
  );
}
