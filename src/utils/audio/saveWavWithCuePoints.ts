import type { WavHeaderData } from "../../types/types";

/**
 * Creates a WAV file with updated cue points from an AudioBuffer
 * @param audioBuffer The AudioBuffer containing the audio data
 * @param markers The array of markers to save as cue points
 * @param originalHeaderData The original WAV header data to preserve other metadata
 * @returns A Blob containing the WAV file with updated cue points
 */
export async function createWavWithCuePoints(
  audioBuffer: AudioBuffer,
  cuePointTimes: Array<number>,
  originalHeaderData: WavHeaderData
): Promise<Blob> {
  // Convert markers to cue points format
  const cuePoints = cuePointTimes.map((time, index) => ({
    id: index + 1, // Cue point IDs typically start at 1
    position: Math.round(time * audioBuffer.sampleRate),
    dataChunkId: originalHeaderData.cuePoints[0]?.dataChunkId || "data", // Preserve original dataChunkId or use "data"
    chunkStart: originalHeaderData.cuePoints[0]?.chunkStart || 0,
    blockStart: originalHeaderData.cuePoints[0]?.blockStart || 0,
    sampleOffset: Math.round(time * audioBuffer.sampleRate),
    timeInSeconds: time,
  }));

  // Calculate the size of the cue chunk
  const cueChunkSize = 4 + cuePoints.length * 24; // 4 bytes for numCuePoints + 24 bytes per cue point

  // Get the audio data and preserve original format
  const numChannels = originalHeaderData.numChannels;
  const sampleRate = originalHeaderData.sampleRate;
  const numSamples = audioBuffer.length;
  const bitsPerSample = originalHeaderData.bitsPerSample;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const audioFormat = originalHeaderData.audioFormat; // Preserve original format (1 for PCM, 3 for IEEE Float)
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
  view.setUint16(20, audioFormat, true); // Audio format (1 for PCM, 3 for IEEE Float)
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

  if (audioFormat === 3) {
    // IEEE Float (32-bit)
    for (let i = 0; i < numSamples; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = audioBuffer.getChannelData(channel)[i];
        view.setFloat32(offset, sample, true);
        offset += bytesPerSample;
      }
    }
  } else {
    // PCM format (default to 16-bit if not IEEE Float)
    for (let i = 0; i < numSamples; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(
          -1,
          Math.min(1, audioBuffer.getChannelData(channel)[i])
        );

        if (bitsPerSample === 32) {
          // 32-bit PCM (rare, but possible)
          const value = Math.round(sample * 0x7fffffff);
          view.setInt32(offset, value, true);
        } else if (bitsPerSample === 24) {
          // 24-bit PCM
          const value = Math.round(sample * 0x7fffff);
          view.setUint8(offset, value & 0xff);
          view.setUint8(offset + 1, (value >> 8) & 0xff);
          view.setUint8(offset + 2, (value >> 16) & 0xff);
        } else if (bitsPerSample === 8) {
          // 8-bit PCM (unsigned)
          const value = Math.round((sample + 1) * 127.5);
          view.setUint8(offset, value);
        } else {
          // Default to 16-bit PCM
          const value = Math.round(sample * 0x7fff);
          view.setInt16(offset, value, true);
        }

        offset += bytesPerSample;
      }
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

/**
 * Saves a WAV file with updated cue points
 * @param file The original file to use as a base
 * @param audioBuffer The AudioBuffer containing the audio data
 * @param markers The array of markers to save as cue points
 * @param originalHeaderData The original WAV header data to preserve other metadata
 * @returns The new File object
 */
// export async function saveWavWithCuePoints(
//   file: File,
//   audioBuffer: AudioBuffer,
//   markers: Array<number>,
//   originalHeaderData: WavHeaderData
// ): Promise<File> {
//   const wavBlob = await createWavWithCuePoints(
//     audioBuffer,
//     markers,
//     originalHeaderData
//   );

//   // Create a new file with the same name
//   return new File([wavBlob], file.name, {
//     type: "audio/wav",
//     lastModified: Date.now(),
//   });
// }

/**
 * Saves a WAV file with updated cue points and triggers a download
 * @param file The original file to use as a base
 * @param audioBuffer The AudioBuffer containing the audio data
 * @param markers The array of markers to save as cue points
 * @param originalHeaderData The original WAV header data to preserve other metadata
 */
// export async function downloadWavWithCuePoints(
//   file: File,
//   audioBuffer: AudioBuffer,
//   markers: Array<number>,
//   originalHeaderData: WavHeaderData
// ): Promise<void> {
//   const newFile = await saveWavWithCuePoints(
//     file,
//     audioBuffer,
//     markers,
//     originalHeaderData
//   );

//   // Create a download link
//   const url = URL.createObjectURL(newFile);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = newFile.name;

//   // Trigger the download
//   document.body.appendChild(a);
//   a.click();

//   // Clean up
//   setTimeout(() => {
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }, 0);
// }

// /**
//  * Saves a WAV file with updated cue points to the file system
//  * @param fileHandle The FileSystemFileHandle to write to
//  * @param audioBuffer The AudioBuffer containing the audio data
//  * @param markers The array of markers to save as cue points
//  * @param originalHeaderData The original WAV header data to preserve other metadata
//  */
// export async function saveWavToFileSystem(
//   fileHandle: FileSystemFileHandle,
//   audioBuffer: AudioBuffer,
//   markers: Array<number>,
//   originalHeaderData: WavHeaderData
// ): Promise<void> {
//   const newFile = await saveWavWithCuePoints(
//     await fileHandle.getFile(),
//     audioBuffer,
//     markers,
//     originalHeaderData
//   );

//   // Write the file to the file system
//   const writable = await fileHandle.createWritable();
//   await writable.write(newFile);
//   await writable.close();
// }
