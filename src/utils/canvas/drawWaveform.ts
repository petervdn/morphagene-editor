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

  // Calculate total duration based on sample rate (assuming 44.1kHz if not provided)
  const totalDuration = channelData.length / 48000;

  // Calculate what portion of the audio data to display
  const viewPortDuration = viewPort.end - viewPort.start;
  const viewPortRatio = viewPortDuration / totalDuration;

  // Calculate sample indices for the viewport
  const startSampleIndex = Math.floor(
    (viewPort.start / totalDuration) * channelData.length
  );
  const endSampleIndex = Math.floor(
    (viewPort.end / totalDuration) * channelData.length
  );

  // Calculate samples per pixel based on viewport
  const samplesPerPixel = (endSampleIndex - startSampleIndex) / width;
  const halfY = height / 2;

  context.strokeStyle = "#777";
  context.lineWidth = 1;
  context.beginPath();

  for (let x = 0; x < width; x++) {
    // Calculate sample indices for this pixel within the viewport
    const pixelStartSample = Math.floor(startSampleIndex + x * samplesPerPixel);
    const pixelEndSample = Math.floor(
      startSampleIndex + (x + 1) * samplesPerPixel
    );

    // Ensure we stay within bounds of the channel data
    const safeStartSample = Math.max(0, pixelStartSample);
    const safeEndSample = Math.min(channelData.length, pixelEndSample);

    const scaledRms =
      getRmsForRange({
        values: channelData,
        range: {
          start: safeStartSample,
          end: safeEndSample,
        },
      }) * halfY;

    context.moveTo(x, halfY - scaledRms);
    context.lineTo(x, halfY + scaledRms);
  }
  context.stroke();
}
