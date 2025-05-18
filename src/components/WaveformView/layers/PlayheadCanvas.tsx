import { useEffect, useCallback, type ReactElement, useRef } from "react";
import type { ViewPort } from "../../../types/types";
import type { Size } from "../../../types/types";
import { SizedCanvas } from "../../SizedCanvas/SizedCanvas";
import { useAudioPlayer } from "../../../utils/hooks/useAudioPlayer";
import { useAudioContext } from "../../../utils/hooks/useAudioContext";
import { drawPlayhead } from "../../../utils/canvas/drawPlayhead";

type Props = {
  viewPort: ViewPort;
  size: Size;
};

export function PlayheadCanvas({ viewPort, size }: Props): ReactElement {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const audioPlayer = useAudioPlayer();
  const audioContext = useAudioContext();
  const animationFrameRef = useRef<number | null>(null);

  // Update the playhead position
  const updatePlayhead = useCallback(() => {
    if (
      !contextRef.current ||
      !viewPort ||
      !size ||
      !audioPlayer?.playingSound ||
      !audioContext
    ) {
      return;
    }

    const context = contextRef.current;
    const { playingSound } = audioPlayer;

    // Draw the playhead at the current position
    drawPlayhead({
      context,
      viewPort,
      size,
      playingSound,
      currentTime: audioContext.currentTime,
    });
  }, [audioContext, audioPlayer, size, viewPort]);

  // Animation loop for playhead
  useEffect(() => {
    if (!audioPlayer?.playingSound) {
      // Clear canvas when not playing
      if (contextRef.current && size) {
        const dpr = window.devicePixelRatio;
        contextRef.current.clearRect(0, 0, size.width * dpr, size.height * dpr);
      }
      return;
    }

    function animate() {
      updatePlayhead();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioPlayer?.playingSound, updatePlayhead, size]);

  const onCanvasRef = useCallback((canvasElement: HTMLCanvasElement | null) => {
    contextRef.current = canvasElement?.getContext("2d") ?? null;
  }, []);

  return <SizedCanvas size={size} onCanvasRef={onCanvasRef} />;
}
