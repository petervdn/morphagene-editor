import { type ReactElement, useEffect, useState } from "react";
import { ValueSlider } from "../ValueSlider/ValueSlider";
import styles from "./SpliceOperations.module.css";
import type { ReelWithAudioBuffer, Splice } from "../../types/types";
import { autoSliceByDivision } from "../../utils/slice/autoSliceByDivision";
import { autoSliceByTransient } from "../../utils/slice/autoSliceByTransient";

type Props = {
  splice: Splice;
  reel: ReelWithAudioBuffer;
};

export function SpliceOperations({ splice, reel }: Props): ReactElement {
  const [division, setDivision] = useState(4);
  const [sensitivity, setSensitivity] = useState(1);

  const onDivisionSliderChange = (value: number) => {
    setDivision(value);
  };

  const onSensitivitySliderChange = (value: number) => {
    setSensitivity(value);
  };

  useEffect(() => {
    autoSliceByDivision({ division, splice });
  }, [division, splice]);

  useEffect(() => {
    autoSliceByTransient({
      sensitivity,
      splice,
      audioBuffer: reel.audioBuffer,
    });
  }, [reel.audioBuffer, sensitivity, splice]);

  return (
    <div className={styles.container}>
      <h3>Auto Slice by division</h3>
      <ValueSlider
        min={1}
        max={32}
        value={division}
        onChange={onDivisionSliderChange}
        label="Number of Slices"
      />
      <h3>Auto Slice by transient</h3>
      <ValueSlider
        min={1}
        max={100}
        value={division}
        onChange={onSensitivitySliderChange}
        label="Sensitivity"
      />
    </div>
  );
}
