import { type ReactElement } from "react";
import { type OptionDefinition } from "../../types/optionsTypes";
import styles from "./OptionItem.module.css";
import { cleanOptionDescription, optionExplanations } from "../../utils/cleanOptionDescription";

interface OptionItemProps {
  option: OptionDefinition;
  onChange: (code: string, value: string | number) => void;
}

export function OptionItem({
  option,
  onChange,
}: OptionItemProps): ReactElement {
  const handleChange = (value: string | number) => {
    onChange(option.code, value);
  };

  return (
    <div className={styles.optionItem}>
      <div className={styles.optionHeader}>
        <div className={styles.optionCode}>{option.code}</div>
        <div className={styles.optionInfo}>
          <div className={styles.optionDescription}>
            {cleanOptionDescription(option.description)}
          </div>
          {optionExplanations[option.code] && (
            <div className={styles.optionExplanation}>
              {optionExplanations[option.code]}
            </div>
          )}
        </div>
      </div>

      <div className={styles.optionControl}>
        {option.type === "select" && option.choices && (
          <select
            className={styles.selectControl}
            value={option.value.toString()}
            onChange={(e) => {
              const value = e.target.value;
              // Convert to number if the original value is a number
              handleChange(
                typeof option.value === "number" ? parseInt(value, 10) : value
              );
            }}
            title={option.description}
          >
            {option.choices.map((choice) => (
              <option
                key={choice.value.toString()}
                value={choice.value.toString()}
              >
                {choice.label}
              </option>
            ))}
          </select>
        )}

        {option.type === "number" && (
          <div className={styles.numberInputContainer}>
            <input
              type="number"
              className={styles.numberInput}
              value={option.value.toString()}
              min={option.min}
              max={option.max}
              step={option.step || 0.00001}
              onChange={(e) => {
                handleChange(parseFloat(e.target.value));
              }}
              title={option.description}
            />
            <div className={styles.rangeContainer}>
              <input
                type="range"
                className={styles.rangeInput}
                value={option.value.toString()}
                min={option.min}
                max={option.max}
                step={option.step || 0.00001}
                onChange={(e) => {
                  handleChange(parseFloat(e.target.value));
                }}
                title={option.description}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
