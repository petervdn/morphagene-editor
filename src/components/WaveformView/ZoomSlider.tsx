import { type ReactElement } from "react";
import styles from "./ZoomSlider.module.css";

type Props = {
  zoomLevel: number;
  maxZoom: number;
  onChange: (level: number) => void;
};

export function ZoomSlider({
  zoomLevel,
  maxZoom,
  onChange,
}: Props): ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseFloat(e.target.value);
    onChange(newLevel);
  };

  return (
    <div className={styles.container}>
      <input
        type="range"
        min="1"
        max={maxZoom}
        step="0.1"
        value={zoomLevel}
        onChange={handleChange}
        className={styles.slider}
      />
      <div className={styles.label}>{Math.round(zoomLevel * 10) / 10}x</div>
    </div>
  );
}
