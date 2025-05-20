import type { ViewPort } from "../../types/types";

export function drawWaveform({
  audioBuffer,
  context,
  viewPort,
  numberOfChannels = 2,
  highlightRange,
}: {
  audioBuffer: AudioBuffer;
  context: CanvasRenderingContext2D;
  viewPort: ViewPort;
  numberOfChannels?: number;
  highlightRange?: { start: number; end: number };
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

    // Draw the waveform in two passes: first the non-highlighted parts, then the highlighted parts
    // This ensures we get two separate continuous paths with different colors
    
    // First pass: Draw non-highlighted parts (slightly lighter than black)
    context.beginPath();
    context.strokeStyle = "#777777"; // Medium gray, more noticeable but not too light
    context.lineWidth = 1.5;
    
    let isFirstPoint = true;
    
    for (let x = 0; x < width; x++) {
      // Calculate the current time position for this pixel
      const currentTime = viewPort.from + (x / width) * (viewPort.to - viewPort.from);
      
      // Skip points inside the highlight range - we'll draw those in the second pass
      const isInHighlightedRange = highlightRange && 
                                currentTime >= highlightRange.start && 
                                currentTime <= highlightRange.end;
      if (isInHighlightedRange) {
        // End the current path if we're entering a highlighted region
        if (!isFirstPoint) {
          context.stroke();
          isFirstPoint = true;
        }
        continue;
      }
      
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
      if (isFirstPoint) {
        context.beginPath();
        context.moveTo(x + 0.5, minY);
        context.lineTo(x + 0.5, maxY);
        isFirstPoint = false;
      } else {
        context.lineTo(x + 0.5, minY);
        context.lineTo(x + 0.5, maxY);
      }
    }
    
    // Finish the non-highlighted path
    if (!isFirstPoint) {
      context.stroke();
    }
    
    // Second pass: Draw highlighted parts (white on blue background)
    if (highlightRange) {
      // First draw the blue background for the highlighted area
      const highlightStartX = Math.round((highlightRange.start - viewPort.from) / (viewPort.to - viewPort.from) * width);
      const highlightEndX = Math.round((highlightRange.end - viewPort.from) / (viewPort.to - viewPort.from) * width);
      const highlightWidth = Math.max(1, highlightEndX - highlightStartX);
      
      context.fillStyle = "#1E90FF"; // Fresh blue background
      context.fillRect(highlightStartX, channelTop, highlightWidth, channelHeight);
      
      // Then draw the white waveform on top
      context.beginPath();
      context.strokeStyle = "#FFFFFF"; // White
      context.lineWidth = 1.5;
      
      isFirstPoint = true;
      
      for (let x = 0; x < width; x++) {
        // Calculate the current time position for this pixel
        const currentTime = viewPort.from + (x / width) * (viewPort.to - viewPort.from);
        
        // Only draw points inside the highlight range
        const isInHighlightedRange = currentTime >= highlightRange.start && 
                                  currentTime <= highlightRange.end;
        if (!isInHighlightedRange) {
          // End the current path if we're exiting a highlighted region
          if (!isFirstPoint) {
            context.stroke();
            isFirstPoint = true;
          }
          continue;
        }
        
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
        if (isFirstPoint) {
          context.beginPath();
          context.moveTo(x + 0.5, minY);
          context.lineTo(x + 0.5, maxY);
          isFirstPoint = false;
        } else {
          context.lineTo(x + 0.5, minY);
          context.lineTo(x + 0.5, maxY);
        }
      }
      
      // Finish the highlighted path
      if (!isFirstPoint) {
        context.stroke();
      }
    }
  }
}
