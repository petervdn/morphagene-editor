export type WavHeaderProps = {
  chunkID: string;
  chunkSize: number;
  waveID: string;
  fmtID: string;
  fmtSize: number;
  fmtCode: number;
  channels: number;
  sampleRate: number;
  avgBytesPerSec: number;
  blockAlign: number;
  bitsPerSample: number;
  dataID: string;
  dataSize: number;
};

export async function readWavFile(
  fileName: string,
  directoryHandle: FileSystemDirectoryHandle
): Promise<{ headerProps: WavHeaderProps; audioBuffer: AudioBuffer }> {
  const fileHandle = await directoryHandle.getFileHandle(fileName);
  const file = await fileHandle.getFile();
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new AudioContext();
  const wavHeader = new Uint8Array(arrayBuffer, 0, 44);
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
  const headerProps = {
    chunkID: String.fromCharCode(...wavHeader.subarray(0, 4)),
    chunkSize: wavHeader.slice(4, 8).reduce((a, b) => a * 256 + b, 0),
    waveID: String.fromCharCode(...wavHeader.subarray(8, 12)),
    fmtID: String.fromCharCode(...wavHeader.subarray(12, 16)),
    fmtSize: wavHeader.slice(16, 20).reduce((a, b) => a * 256 + b, 0),
    fmtCode: wavHeader[20],
    channels: wavHeader[22],
    sampleRate: wavHeader.slice(24, 28).reduce((a, b) => a * 256 + b, 0),
    avgBytesPerSec: wavHeader.slice(28, 32).reduce((a, b) => a * 256 + b, 0),
    blockAlign: wavHeader.slice(32, 34).reduce((a, b) => a * 256 + b, 0),
    bitsPerSample: wavHeader[34],
    dataID: String.fromCharCode(...wavHeader.subarray(36, 40)),
    dataSize: wavHeader.slice(40, 44).reduce((a, b) => a * 256 + b, 0),
  };
  return { headerProps, audioBuffer };
}
