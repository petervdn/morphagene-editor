import type { Splice } from "../getSplices";

export function playSplice(
  audioBuffer: AudioBuffer,
  splice: Splice,
  audioContext: AudioContext
): void {
  const bufferSource = audioContext.createBufferSource();
  bufferSource.connect(audioContext.destination);
  bufferSource.buffer = audioBuffer;

  bufferSource.start(0, splice.start, splice.end - splice.start);
}
