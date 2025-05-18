import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from "react";
import { ReelDetails } from "../../components/ReelDetails/ReelDetails";
import { useGetReelById } from "../../utils/hooks/useGetReelById";
import { decodeAudioFile } from "../../utils/audio/decodeAudioFile";
import { useAudioContext } from "../../utils/hooks/useAudioContext";

export function ReelPage() {
  const { reelId } = useParams();

  const reel = useGetReelById(reelId ?? "");
  const audioContext = useAudioContext();

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

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
