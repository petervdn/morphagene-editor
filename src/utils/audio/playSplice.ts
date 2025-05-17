import type { Splice } from "../getSplices";

export async function playSplice(
  audioBuffer: AudioBuffer,
  splice: Splice,
  audioContext: AudioContext
): Promise<void> {
  const bufferSource = audioContext.createBufferSource();
  bufferSource.connect(audioContext.destination);
  bufferSource.buffer = audioBuffer;

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  bufferSource.start(0, splice.start, splice.end - splice.start);
}
