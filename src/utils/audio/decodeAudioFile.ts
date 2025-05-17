export async function decodeAudioFile(
  file: File,
  audioContext: AudioContext
): Promise<AudioBuffer> {
  return new Promise<AudioBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        if (
          !event.target ||
          !event.target.result ||
          !(event.target.result instanceof ArrayBuffer)
        ) {
          throw new Error("Failed to read file");
        }

        const audioBuffer = await audioContext.decodeAudioData(
          event.target.result
        );
        resolve(audioBuffer);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}
