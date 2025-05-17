import type { ViewPort } from "../../types/types";

export function drawWaveform({
  audioBuffer,
  context,
  viewPort,
  numberOfChannels = 2,
}: {
  audioBuffer: AudioBuffer;
  context: CanvasRenderingContext2D;
  viewPort: ViewPort;
  numberOfChannels?: number;
}): void {
  if (!audioBuffer || !context || !viewPort) return;

  // Clear the canvas
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);

  // Calculate samples per pixel and viewport boundaries
  const actualChannels = Math.min(
    audioBuffer.numberOfChannels,
    numberOfChannels
  );
  const channelHeight = height / actualChannels;
  const sampleRate = audioBuffer.sampleRate;

  // Convert viewport time (in seconds) to sample indices
  const startSample = Math.floor(viewPort.from * sampleRate);
  const endSample = Math.ceil(viewPort.to * sampleRate);
  const totalSamples = endSample - startSample;

  // Calculate how many audio samples we need to combine for each pixel
  const samplesPerPixel = Math.max(1, Math.floor(totalSamples / width));

  // Draw each channel
  for (let channelIndex = 0; channelIndex < actualChannels; channelIndex++) {
    const channelData = audioBuffer.getChannelData(channelIndex);
    const channelTop = channelIndex * channelHeight;
    const channelMiddle = channelTop + channelHeight / 2;

    // Set drawing style
    context.strokeStyle = "#2c3e50";
    context.lineWidth = 1;
    context.beginPath();

    for (let x = 0; x < width; x++) {
      // Calculate the sample range for this pixel
      const sampleStart = startSample + Math.floor((x * totalSamples) / width);
      const sampleEnd = Math.min(endSample, sampleStart + samplesPerPixel);

      // Find min and max values in this sample range
      let min = 1.0;
      let max = -1.0;

      for (let i = sampleStart; i < sampleEnd; i++) {
        const sample = channelData[i] || 0;
        if (sample < min) min = sample;
        if (sample > max) max = sample;
      }

      // Calculate y-coordinates (flip the waveform so positive is up)
      const minY = Math.round(channelMiddle + min * (channelHeight / 2)) + 0.5;
      const maxY = Math.round(channelMiddle + max * (channelHeight / 2)) + 0.5;

      // Draw a vertical line from min to max
      if (x === 0) {
        context.moveTo(x + 0.5, minY);
        context.lineTo(x + 0.5, maxY);
      } else {
        // Connect to the previous point to create a continuous line
        context.lineTo(x + 0.5, minY);
        context.lineTo(x + 0.5, maxY);
      }
    }

    context.stroke();
  }
}
