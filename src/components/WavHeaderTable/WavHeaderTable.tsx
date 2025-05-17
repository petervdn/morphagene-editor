import { type ReactElement } from "react";
import type { WavHeaderData } from "../../utils/audio/parseWavFileHeader";
import { audioFormatTypes } from "../../utils/audio/audioFormatTypes";
import styles from "./WavHeaderTable.module.css";

type Props = {
  headerData: WavHeaderData;
  filename?: string;
};

export function WavHeaderTable({ headerData, filename }: Props): ReactElement {
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
              {audioFormatTypes[headerData.audioFormat] ||
                `Unknown (${headerData.audioFormat})`}
            </td>
          </tr>
          <tr>
            <th>Channels</th>
            <td>
              {headerData.numChannels}{" "}
              {headerData.numChannels === 1 ? "(mono)" : "(stereo)"}
            </td>
          </tr>
          <tr>
            <th>Sample Rate</th>
            <td>{headerData.sampleRate} Hz</td>
          </tr>
          <tr>
            <th>Bit Depth</th>
            <td>{headerData.bitsPerSample} bit</td>
          </tr>
          <tr>
            <th>File Size</th>
            <td>{(headerData.fileSize / 1024 / 1024).toFixed(2)} MB</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{headerData.duration.toFixed(2)} seconds</td>
          </tr>
          <tr>
            <th>Byte Rate</th>
            <td>{(headerData.byteRate / 1024).toFixed(2)} KB/s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
