import { type ReactElement, useEffect, useState } from "react";
import { ValueSlider } from "../ValueSlider/ValueSlider";
import styles from "./SpliceOperations.module.css";
import type { Splice } from "../../types/types";
import { autoSliceByDivision } from "../../utils/slice/autoSliceByDivision";

type Props = {
  splice: Splice;
};

export function SpliceOperations({ splice }: Props): ReactElement {
  const [division, setDivision] = useState(4); // Default to 4 slices

  const onDivisionSliderChange = (division: number) => {
    setDivision(division);
  };

  useEffect(() => {
    autoSliceByDivision({ division, splice });
  });

  return (
    <div className={styles.container}>
      <h3>Auto Slice</h3>
      <ValueSlider
        min={1}
        max={32}
        value={division}
        onChange={onDivisionSliderChange}
        label="Number of Slices"
      />
    </div>
  );
}
