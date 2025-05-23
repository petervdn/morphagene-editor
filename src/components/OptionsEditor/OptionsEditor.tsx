import { useState, useEffect, useCallback, type ReactElement } from "react";
import { type OptionsData } from "../../types/optionsTypes";
import {
  parseOptionsFile,
  serializeOptionsData,
} from "../../utils/folder/parseOptionsFile";
import { OptionItem } from "./OptionItem";
import styles from "./OptionsEditor.module.css";
import { FiSave, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface OptionsEditorProps {
  content: string;
  onSave: (content: string) => Promise<boolean>;
}

type SaveStatus = "idle" | "saving" | "success" | "error";

export function OptionsEditor({
  content,
  onSave,
}: OptionsEditorProps): ReactElement {
  const [optionsData, setOptionsData] = useState<OptionsData | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState<string>("");

  // Parse the options file content
  useEffect(() => {
    if (content) {
      try {
        const parsedData = parseOptionsFile(content);
        setOptionsData(parsedData);
      } catch (error) {
        console.error("Error parsing options file:", error);
      }
    }
  }, [content]);

  // Handle option value changes
  const handleOptionChange = useCallback(
    async (code: string, value: string | number) => {
      if (!optionsData) return;

      // Update the option in the state
      const updatedOptions = optionsData.options.map((option) =>
        option.code === code ? { ...option, value } : option
      );

      const updatedData = {
        ...optionsData,
        options: updatedOptions,
      };

      setOptionsData(updatedData);

      // Serialize and save the updated options
      const serializedContent = serializeOptionsData(updatedData);
      await saveChanges(serializedContent);
    },
    [optionsData]
  );

  // Save changes to the file
  const saveChanges = useCallback(
    async (contentToSave: string) => {
      setSaveStatus("saving");
      setSaveMessage("Saving changes...");

      try {
        const success = await onSave(contentToSave);

        if (success) {
          setSaveStatus("success");
          setSaveMessage("Changes saved successfully");

          // Reset status after a delay
          setTimeout(() => {
            setSaveStatus("idle");
            setSaveMessage("");
          }, 2000);
        } else {
          setSaveStatus("error");
          setSaveMessage("Failed to save changes");
        }
      } catch (error) {
        setSaveStatus("error");
        setSaveMessage(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    },
    [onSave]
  );

  if (!optionsData) {
    return <div className={styles.loading}>Loading options...</div>;
  }

  // Group options by type for better organization
  const selectOptions = optionsData.options.filter(
    (opt) => opt.type === "select"
  );
  const numberOptions = optionsData.options.filter(
    (opt) => opt.type === "number"
  );

  return (
    <div className={styles.optionsEditor}>
      <div className={styles.saveStatus}>
        {saveStatus === "saving" && (
          <span className={styles.savingIndicator}>
            <FiSave className={styles.savingIcon} /> {saveMessage}
          </span>
        )}
        {saveStatus === "success" && (
          <span className={styles.successIndicator}>
            <FiCheckCircle className={styles.successIcon} /> {saveMessage}
          </span>
        )}
        {saveStatus === "error" && (
          <span className={styles.errorIndicator}>
            <FiAlertCircle className={styles.errorIcon} /> {saveMessage}
          </span>
        )}
      </div>

      {/* First line is preserved in the data structure but not displayed */}

      <div className={styles.optionsContainer}>
        <div className={styles.optionsSection}>
          {selectOptions.map((option) => (
            <OptionItem
              key={option.code}
              option={option}
              onChange={handleOptionChange}
            />
          ))}
        </div>

        <div className={styles.optionsSection}>
          <h3 className={styles.sectionTitle}>Chord Ratios</h3>
          {numberOptions.map((option) => (
            <OptionItem
              key={option.code}
              option={option}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
