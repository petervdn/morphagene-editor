export type CuePoint = {
  id: number;
  position: number;
  dataChunkId: string;
  chunkStart: number;
  blockStart: number;
  sampleOffset: number;
  timeInSeconds: number;
};

export type WavHeaderData = {
  chunkId: string;
  chunkSize: number;
  format: string;
  subchunk1Id: string;
  subchunk1Size: number;
  audioFormat: number;
  numChannels: number;
  sampleRate: number;
  byteRate: number;
  blockAlign: number;
  bitsPerSample: number;
  subchunk2Id: string;
  subchunk2Size: number;
  duration: number;
  fileSize: number;
  cuePoints: Array<CuePoint>;
};

/**
 * Reads and parses a WAV file header including cue points
 * @param file The WAV file to parse
 * @returns A promise that resolves to the parsed WAV header
 */
export const parseWavFileHeader = async (
  file: File
): Promise<WavHeaderData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        if (!buffer) {
          throw new Error("Failed to read file");
        }

        const view = new DataView(buffer);

        // Check if this is a valid WAV file
        const chunkId = String.fromCharCode(
          view.getUint8(0),
          view.getUint8(1),
          view.getUint8(2),
          view.getUint8(3)
        );

        if (chunkId !== "RIFF") {
          throw new Error("Not a valid WAV file: Missing RIFF header");
        }

        const format = String.fromCharCode(
          view.getUint8(8),
          view.getUint8(9),
          view.getUint8(10),
          view.getUint8(11)
        );

        if (format !== "WAVE") {
          throw new Error("Not a valid WAV file: Missing WAVE format");
        }

        // Parse the WAV header
        const header: WavHeaderData = {
          chunkId,
          chunkSize: view.getUint32(4, true),
          format,
          subchunk1Id: String.fromCharCode(
            view.getUint8(12),
            view.getUint8(13),
            view.getUint8(14),
            view.getUint8(15)
          ),
          subchunk1Size: view.getUint32(16, true),
          audioFormat: view.getUint16(20, true),
          numChannels: view.getUint16(22, true),
          sampleRate: view.getUint32(24, true),
          byteRate: view.getUint32(28, true),
          blockAlign: view.getUint16(32, true),
          bitsPerSample: view.getUint16(34, true),
          // The data chunk might not be at a fixed position if there are other chunks
          // So we need to find it
          subchunk2Id: "",
          subchunk2Size: 0,
          duration: 0,
          fileSize: file.size,
          cuePoints: [],
        };

        // We need to scan the entire file for chunks, not just the first 1000 bytes
        // So we'll read the whole file
        const fullReader = new FileReader();

        fullReader.onload = (fullEvent) => {
          try {
            const fullBuffer = fullEvent.target?.result as ArrayBuffer;
            if (!fullBuffer) {
              throw new Error("Failed to read full file");
            }

            const fullView = new DataView(fullBuffer);

            // Find all chunks including data and cue chunks
            let offset = 12; // Start after RIFF header and WAVE format
            let dataChunkFound = false;
            let cueChunkOffset = -1;

            while (offset < fullBuffer.byteLength) {
              // Make sure we have at least 8 bytes (4 for ID, 4 for size)
              if (offset + 8 > fullBuffer.byteLength) break;

              const chunkId = String.fromCharCode(
                fullView.getUint8(offset),
                fullView.getUint8(offset + 1),
                fullView.getUint8(offset + 2),
                fullView.getUint8(offset + 3)
              );

              const chunkSize = fullView.getUint32(offset + 4, true);

              // Check for data chunk
              if (chunkId === "data" && !dataChunkFound) {
                header.subchunk2Id = chunkId;
                header.subchunk2Size = chunkSize;
                dataChunkFound = true;
              }

              // Check for cue chunk
              if (chunkId === "cue ") {
                cueChunkOffset = offset;
              }

              // Move to the next chunk
              offset += 8 + chunkSize;

              // Ensure alignment to even byte boundary
              if (chunkSize % 2 !== 0) offset++;
            }

            // Calculate duration in seconds
            if (header.byteRate > 0) {
              header.duration = header.subchunk2Size / header.byteRate;
            }

            // Parse cue points if found
            if (cueChunkOffset > 0) {
              try {
                const cuePointsCount = fullView.getUint32(
                  cueChunkOffset + 8,
                  true
                );
                const cuePoints: CuePoint[] = [];

                // Each cue point is 24 bytes
                let cueOffset = cueChunkOffset + 12; // Start after chunk ID, size, and count

                for (let i = 0; i < cuePointsCount; i++) {
                  // Make sure we have enough bytes for a complete cue point
                  if (cueOffset + 24 > fullBuffer.byteLength) break;

                  const id = fullView.getUint32(cueOffset, true);
                  const position = fullView.getUint32(cueOffset + 4, true);
                  const dataChunkId = String.fromCharCode(
                    fullView.getUint8(cueOffset + 8),
                    fullView.getUint8(cueOffset + 9),
                    fullView.getUint8(cueOffset + 10),
                    fullView.getUint8(cueOffset + 11)
                  );
                  const chunkStart = fullView.getUint32(cueOffset + 12, true);
                  const blockStart = fullView.getUint32(cueOffset + 16, true);
                  const sampleOffset = fullView.getUint32(cueOffset + 20, true);

                  // Calculate time in seconds based on sample offset and sample rate
                  const timeInSeconds =
                    header.sampleRate > 0
                      ? sampleOffset / header.sampleRate
                      : 0;

                  cuePoints.push({
                    id,
                    position,
                    dataChunkId,
                    chunkStart,
                    blockStart,
                    sampleOffset,
                    timeInSeconds,
                  });

                  cueOffset += 24;
                }

                // Sort cue points by position
                cuePoints.sort((a, b) => a.position - b.position);

                header.cuePoints = cuePoints;
              } catch (cueError) {
                console.error("Error parsing cue points:", cueError);
                // Continue without cue points
                header.cuePoints = [];
              }
            }

            resolve(header);
          } catch (error) {
            reject(error);
          }
        };

        fullReader.onerror = (error) => {
          reject(error);
        };

        // Read the entire file to find all chunks
        fullReader.readAsArrayBuffer(file);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // First read just the beginning to validate it's a WAV file
    reader.readAsArrayBuffer(file.slice(0, 44)); // Standard WAV header size
  });
};
