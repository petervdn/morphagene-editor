import type { Splice } from "../getSplices";

export type PlayingSound = {
  audioBuffer: AudioBuffer;
  splice: Splice;
  contextStartTime: number;
  bufferSourceNode: AudioBufferSourceNode;
  stop: (preventEndedEvent?: boolean) => void;
};

export async function playSplice({
  audioBuffer,
  audioContext,
  splice,
  onEnded,
}: {
  audioBuffer: AudioBuffer;
  splice: Splice;
  audioContext: AudioContext;
  onEnded?: () => void;
}): Promise<PlayingSound> {
  const bufferSourceNode = audioContext.createBufferSource();
  bufferSourceNode.connect(audioContext.destination);
  bufferSourceNode.buffer = audioBuffer;

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  const startTime = audioContext.currentTime;
  bufferSourceNode.start(startTime, splice.start, splice.end - splice.start);

  if (onEnded) {
    bufferSourceNode.onended = onEnded;
  }

  function stop(preventEndedEvent?: boolean) {
    if (preventEndedEvent) {
      bufferSourceNode.onended = null;
    }
    bufferSourceNode.stop(0);
  }

  return {
    audioBuffer,
    splice,
    contextStartTime: startTime,
    bufferSourceNode,
    stop,
  };
}
