import { type ReactElement } from "react";
import type { CuePoint } from "../../utils/parseWavFileHeader";
import "./CuePointsList.css";

type Props = {
  cuePoints: CuePoint[];
};

export function CuePointsList({ cuePoints }: Props): ReactElement {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(2).padStart(5, "0")}`;
  };

  return (
    <div className="cue-points-list">
      <h3>Cue Points ({cuePoints.length})</h3>

      {cuePoints.length === 0 ? (
        <div className="no-cue-points">No cue points found in this reel</div>
      ) : (
        <table className="cue-points-table">
          <thead>
            <tr>
              <th className="cue-point-id">ID</th>
              <th className="cue-point-position">Position</th>
              <th className="cue-point-time">Time</th>
            </tr>
          </thead>
          <tbody>
            {cuePoints.map((cuePoint) => (
              <tr key={cuePoint.id}>
                <td className="cue-point-id">{cuePoint.id}</td>
                <td className="cue-point-position">{cuePoint.position}</td>
                <td className="cue-point-time">
                  {cuePoint.timeInSeconds.toFixed(2)}s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
