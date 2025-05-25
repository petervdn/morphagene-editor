import type { WaveFile } from "wavefile";

export function getWaveFileMetaData(waveFile: WaveFile) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fmt: any = waveFile.fmt;
  const fmtValues = {
    sampleRate: fmt.sampleRate,
    numChannels: fmt.numChannels,
    bitsPerSample: fmt.bitsPerSample,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chunkSize: (waveFile.data as any).chunkSize,
  };

  const totalSamples =
    fmtValues.chunkSize /
    ((fmtValues.bitsPerSample / 8) * fmtValues.numChannels);

  const duration = totalSamples / fmtValues.sampleRate;

  return {
    ...fmtValues,
    duration,
  };
}
