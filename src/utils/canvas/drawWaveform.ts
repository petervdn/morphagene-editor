import type { Range } from "../../types/types";
import { getRmsForRange } from "../audio/getRmsForRange";

export function drawWaveformChannels({
  audioBuffer,
  context,
  viewPort,
}: {
  audioBuffer: AudioBuffer;
  context: CanvasRenderingContext2D;
  viewPort: Range;
  channels: Array<number>;
}): void {
  const channelData = audioBuffer.getChannelData(0);

  drawWaveformChannel({
    context,
    viewPort,
    channelData,
  });
}

function drawWaveformChannel({
  channelData,
  context,
  viewPort,
}: {
  context: CanvasRenderingContext2D;
  viewPort: Range;
  channelData: Float32Array;
}): void {
  // Clear the canvas
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);

  const pixelsPerSample = width / channelData.length;
  const samplesPerPixel = 1 / pixelsPerSample;
  const halfY = height / 2;

  context.strokeStyle = "#777";
  context.lineWidth = 1;
  context.beginPath();

  for (let x = 0; x < width; x++) {
    const startSample = Math.floor(x * samplesPerPixel);
    const endSample = Math.floor((x + 1) * samplesPerPixel);

    const scaledRms =
      getRmsForRange({
        values: channelData,
        range: {
          start: startSample,
          end: Math.min(endSample, channelData.length),
        },
      }) * halfY;

    context.moveTo(x, halfY - scaledRms);
    context.lineTo(x, halfY + scaledRms);
  }
  context.stroke();
}
