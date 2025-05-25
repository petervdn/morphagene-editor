import type { WaveFile } from "wavefile";

export type Reel = {
  id: string;
  name: string;
  fileName: string;
  fileHandle: FileSystemFileHandle;
  // wavHeaderData: WavHeaderData;
  audioBuffer: AudioBuffer | null;
  waveFile: WaveFile;
};

export type ReelWithAudioBuffer = Omit<Reel, "audioBuffer"> & {
  audioBuffer: AudioBuffer;
};

export type MorphageneOptions = {
  fileHandle: FileSystemFileHandle;
  content: string;
};

export type Size = {
  width: number;
  height: number;
};

export type Range = {
  start: number;
  end: number;
};

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

export type Splice = Range;
