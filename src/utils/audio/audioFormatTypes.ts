/**
 * Audio format types according to the WAV specification
 * Maps format codes to human-readable descriptions
 */
export const audioFormatTypes: Record<number, string> = {
  1: "PCM (uncompressed)",
  2: "Microsoft ADPCM",
  3: "IEEE Float",
  6: "G.711 A-law",
  7: "G.711 μ-law",
  17: "IMA ADPCM",
  20: "ITU G.723 ADPCM (Yamaha)",
  49: "GSM 6.10",
  64: "ITU G.721 ADPCM",
  80: "MPEG",
  65536: "Experimental"
};
