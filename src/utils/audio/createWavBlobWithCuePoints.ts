/**
 * Creates a WAV file with cue points from an AudioBuffer
 * @param audioBuffer The AudioBuffer containing the audio data
 * @param cuePointTimes The array of time points (in seconds) to save as cue points
 * @param audioFormat The audio format (1 for PCM, 3 for IEEE Float)
 * @returns A Blob containing the WAV file with cue points
 */
export async function createWavBlobWithCuePoints(
  audioBuffer: AudioBuffer,
  cuePointTimes: Array<number>
): Promise<Blob> {
  // Convert time points to cue points format
  const cuePoints = cuePointTimes.map((time, index) => ({
    id: index + 1, // Cue point IDs typically start at 1
    position: Math.round(time * audioBuffer.sampleRate),
    dataChunkId: "data", // Standard data chunk ID
    chunkStart: 0,
    blockStart: 0,
    sampleOffset: Math.round(time * audioBuffer.sampleRate),
    timeInSeconds: time,
  }));

  // Calculate the size of the cue chunk
  const cueChunkSize = 4 + cuePoints.length * 24; // 4 bytes for numCuePoints + 24 bytes per cue point

  // Get the audio data properties directly from AudioBuffer
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const numSamples = audioBuffer.length;

  // Set bit depth based on audio format
  const bitsPerSample = 32; // IEEE Float (3) uses 32 bits
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;

  // Calculate the total file size
  const fileSize = 44 + dataSize + 8 + cueChunkSize; // 44 bytes for WAV header + data size + 8 bytes for cue chunk header + cue chunk size

  // Create a buffer for the WAV file
  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // Write the WAV header
  // RIFF chunk descriptor
  writeString(view, 0, "RIFF");
  view.setUint32(4, fileSize - 8, true); // File size - 8 bytes for RIFF header
  writeString(view, 8, "WAVE");

  // fmt sub-chunk
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // Sub-chunk size (16 for PCM and IEEE Float)
  view.setUint16(20, 3, true); // Audio format (1 for PCM, 3 for IEEE Float)
  view.setUint16(22, numChannels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, byteRate, true); // Byte rate
  view.setUint16(32, blockAlign, true); // Block align
  view.setUint16(34, bitsPerSample, true); // Bits per sample

  // data sub-chunk
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true); // Data size

  // Write the audio data based on the format
  let offset = 44;

  // IEEE Float (32-bit)
  for (let i = 0; i < numSamples; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = audioBuffer.getChannelData(channel)[i];
      view.setFloat32(offset, sample, true);
      offset += bytesPerSample;
    }
  }

  // Write the cue chunk
  writeString(view, offset, "cue ");
  view.setUint32(offset + 4, cueChunkSize, true); // Cue chunk size
  view.setUint32(offset + 8, cuePoints.length, true); // Number of cue points
  offset += 12;

  // Write each cue point
  for (let i = 0; i < cuePoints.length; i++) {
    const cue = cuePoints[i];
    view.setUint32(offset, cue.id, true); // ID
    view.setUint32(offset + 4, cue.position, true); // Position
    writeString(view, offset + 8, "data"); // Data chunk ID
    view.setUint32(offset + 12, cue.chunkStart, true); // Chunk start
    view.setUint32(offset + 16, cue.blockStart, true); // Block start
    view.setUint32(offset + 20, cue.sampleOffset, true); // Sample offset
    offset += 24;
  }

  // Create a Blob from the buffer
  return new Blob([buffer], { type: "audio/wav" });
}

/**
 * Helper function to write a string to a DataView
 */
function writeString(view: DataView, offset: number, string: string): void {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
