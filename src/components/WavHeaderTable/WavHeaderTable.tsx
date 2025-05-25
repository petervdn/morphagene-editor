import { type ReactElement } from "react";
import { audioFormatTypes } from "../../utils/audio/audioFormatTypes";
import styles from "./WavHeaderTable.module.css";
import type { WavHeaderData } from "../../types/types";

type Props = {
  wavHeaderData: WavHeaderData;
  filename?: string;
};

export function WavHeaderTable({
  wavHeaderData: {
    audioFormat,
    numChannels,
    sampleRate,
    bitsPerSample,
    fileSize,
    duration,
    byteRate,
  },
  filename,
}: Props): ReactElement {
  return (
    <div className={styles.reelHeaderSection}>
      <table className={styles.reelHeaderTable}>
        <tbody>
          {filename && (
            <tr>
              <th>Filename</th>
              <td>{filename}</td>
            </tr>
          )}
          <tr>
            <th>Format</th>
            <td>
              {audioFormatTypes[audioFormat] || `Unknown (${audioFormat})`}
            </td>
          </tr>
          <tr>
            <th>Channels</th>
            <td>
              {numChannels} {numChannels === 1 ? "(mono)" : "(stereo)"}
            </td>
          </tr>
          <tr>
            <th>Sample Rate</th>
            <td>{sampleRate} Hz</td>
          </tr>
          <tr>
            <th>Bit Depth</th>
            <td>{bitsPerSample} bit</td>
          </tr>
          <tr>
            <th>File Size</th>
            <td>{(fileSize / 1024 / 1024).toFixed(2)} MB</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{duration.toFixed(2)} seconds</td>
          </tr>
          <tr>
            <th>Byte Rate</th>
            <td>{(byteRate / 1024).toFixed(2)} KB/s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
