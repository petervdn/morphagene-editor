/**
 * Cleans up option descriptions by removing numeric values and redundant information
 * that's already shown in the dropdown.
 * 
 * @param description The raw description from the options.txt file
 * @returns A cleaned description with only the essential information
 */
export function cleanOptionDescription(description: string): string {
  if (!description) return '';
  
  // Remove numeric values like (0, 1, 2) that aren't relevant to the user
  let cleaned = description.replace(/\s*\(\d+(?:,\s*\d+)*\)\s*/g, ' ');
  
  // Remove option listings that are already in the dropdown
  cleaned = cleaned.replace(/(?:options?|values?|settings?):?\s*(?:are|is)?:?\s*.*$/i, '');
  
  // Remove any remaining numeric prefixes
  cleaned = cleaned.replace(/^\d+\s*[-–:]\s*/, '');
  
  // Capitalize first letter if it's not already
  cleaned = cleaned.trim();
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  
  return cleaned;
}

/**
 * Provides additional explanations for Morphagene options
 */
export const optionExplanations: Record<string, string> = {
  vsop: 'Controls how the Varispeed knob affects playback speed and direction',
  inop: 'Determines what audio is recorded when using the Record function',
  pmin: 'Enables phase modulation using the right input when no signal is present on the left',
  omod: 'Controls when splices are organized after recording',
  gnsm: 'Determines how transitions between genes are handled',
  rsop: 'Sets the behavior of the Record and Splice buttons when used together',
  pmod: 'Configures how the Play button operates',
  ckop: 'Determines how the clock input affects time stretching and gene shifting',
  cvop: 'Sets what signal is sent to the CV output',
  mcr1: 'Sets the pitch ratio for the first voice in Morph mode',
  mcr2: 'Sets the pitch ratio for the second voice in Morph mode',
  mcr3: 'Sets the pitch ratio for the third voice in Morph mode'
};
