import type { WavHeaderData } from "../utils/audio/parseWavFileHeader";

export type Reel = {
  id: string;
  name: string;
  file: File;
  wavHeaderData: WavHeaderData;
};

export type Size = {
  width: number;
  height: number;
};

export type ViewPort = {
  from: number;
  to: number;
};
