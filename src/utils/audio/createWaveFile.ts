import { WaveFile } from "wavefile";

export function createWaveFile(
  buffer: AudioBuffer,
  cuePointTimes: Array<number>
): WaveFile {
  if (buffer.numberOfChannels !== 2) {
    throw new Error("AudioBuffer does not have 2 channels");
  }

  const channels = [];
  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  const waveFile = new WaveFile();

  waveFile.fromScratch(
    buffer.numberOfChannels,
    buffer.sampleRate,
    "32f",
    channels
  );

  for (const time of cuePointTimes) {
    waveFile.setCuePoint({
      position: time * 1000,
    });
  }

  const cue = waveFile.cue as {
    points: Array<{ dwPosition: number; dwSampleOffset: number }>;
  };
  // not sure what this does or if it's necessary
  for (let i = 0; i < cue.points.length; i++) {
    cue.points[i].dwPosition = cue.points[i].dwSampleOffset;
  }

  return waveFile;
}
