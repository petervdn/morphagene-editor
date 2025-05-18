import type { ViewPort } from "../../types/types";
import type { Size } from "../../types/types";
import type { PlayingSound } from "../audio/playSplice";

type DrawPlayheadProps = {
  context: CanvasRenderingContext2D;
  viewPort: ViewPort;
  size: Size;
  playingSound: PlayingSound;
  currentTime: number;
};

export function drawPlayhead({
  context,
  viewPort,
  size,
  playingSound,
  currentTime,
}: DrawPlayheadProps): void {
  // Clear the canvas first
  const dpr = window.devicePixelRatio;
  context.clearRect(0, 0, size.width * dpr, size.height * dpr);
  const { splice, contextStartTime } = playingSound;
  
  // Calculate current position in seconds
  const elapsedTime = currentTime - contextStartTime;
  
  // Calculate absolute position in the full audio buffer
  // The position is splice.start (offset in the buffer) + elapsed time since playback started
  const currentPosition = splice.start + elapsedTime;
  
  // Don't draw if we're outside the splice range
  if (currentPosition > splice.end) {
    return;
  }
  
  // Calculate x position based on viewport
  const viewportDuration = viewPort.to - viewPort.from;
  const positionRatio = (currentPosition - viewPort.from) / viewportDuration;
  const xPosition = Math.floor(positionRatio * size.width);
  
  // Don't draw if outside visible area
  if (xPosition < 0 || xPosition > size.width) {
    return;
  }
  
  // Draw the playhead line
  const scaledXPosition = xPosition * dpr;
  
  context.beginPath();
  context.moveTo(scaledXPosition, 0);
  context.lineTo(scaledXPosition, size.height * dpr);
  context.strokeStyle = '#ff0000'; // Red playhead
  context.lineWidth = 2 * dpr; // Scale line width by device pixel ratio
  context.stroke();
}
