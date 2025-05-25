import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './ValueSlider.module.css';

interface ValueSliderProps {
  min?: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export const ValueSlider: React.FC<ValueSliderProps> = ({
  min = 0,
  max,
  value,
  onChange,
  label
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setDisplayValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10);
    
    // Handle empty input
    if (isNaN(newValue)) {
      setDisplayValue(0);
      return;
    }
    
    // Clamp value between min and max
    newValue = Math.max(min, Math.min(max, newValue));
    setDisplayValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={min}
          max={max}
          value={displayValue}
          onChange={handleSliderChange}
          className={styles.slider}
        />
        <input
          type="number"
          min={min}
          max={max}
          value={displayValue}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>
    </div>
  );
};
