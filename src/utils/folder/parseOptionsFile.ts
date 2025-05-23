import {
  type OptionDefinition,
  type OptionsData,
  optionDefinitions,
} from "../../types/optionsTypes";

/**
 * Parses the options.txt file content into a structured format
 */
export function parseOptionsFile(content: string): OptionsData {
  const lines = content.split("\n");
  const firstLine = lines[0];
  const options: OptionDefinition[] = [];
  const comments: string[] = [];

  // Process each line after the first one
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Handle comment lines
    if (line.startsWith("//")) {
      comments.push(line);
      continue;
    }

    // Parse option lines: code value //description
    const match = line.match(/^([a-z0-9]+)\s+([^\s]+)(?:\s+\/\/(.*))?$/);
    if (match) {
      const [, code, valueStr, description = ""] = match;

      // Check if this is a known option
      if (optionDefinitions[code]) {
        const definition = { ...optionDefinitions[code] };

        // Parse the value based on the option type
        let value: string | number = valueStr;
        if (definition.type === "number") {
          value = parseFloat(valueStr);
        } else if (definition.type === "select") {
          value = parseInt(valueStr, 10);
        }

        options.push({
          ...definition,
          value,
          description: description.trim() || definition.description,
        });
      } else {
        // Unknown option, add it as a select with the current value
        options.push({
          code,
          type: "select",
          value: valueStr,
          description: description.trim() || `${code} option`,
          choices: [{ value: valueStr, label: valueStr }],
        });
      }
    }
  }

  return {
    firstLine,
    options,
    comments,
  };
}

/**
 * Serializes the structured options data back to the options.txt file format
 */
export function serializeOptionsData(data: OptionsData): string {
  const lines: string[] = [data.firstLine];

  // Add comment lines
  data.comments.forEach((comment) => {
    lines.push(comment);
  });

  // Add option lines
  data.options.forEach((option) => {
    const valueStr =
      typeof option.value === "number"
        ? option.type === "number" && option.value % 1 !== 0
          ? option.value.toFixed(5) // Format floating point with 5 decimal places
          : option.value.toString()
        : option.value;

    const description = option.description ? ` //${option.description}` : "";
    lines.push(`${option.code} ${valueStr}${description}`);
  });

  return lines.join("\n");
}
