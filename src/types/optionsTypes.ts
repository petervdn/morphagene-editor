// Types for the Morphagene options

export type OptionType = 'select' | 'number';

export interface OptionDefinition {
  code: string;
  type: OptionType;
  value: string | number;
  description: string;
  choices?: Array<{
    value: string | number;
    label: string;
  }>;
  min?: number;
  max?: number;
  step?: number;
}

export interface OptionsData {
  firstLine: string;
  options: OptionDefinition[];
  comments: string[];
}

// Predefined option definitions with their possible values
export const optionDefinitions: Record<string, Omit<OptionDefinition, 'value'>> = {
  vsop: {
    code: 'vsop',
    type: 'select',
    description: 'Varispeed option',
    choices: [
      { value: 0, label: 'Bidirectional classic' },
      { value: 1, label: 'Bidirectional 1 v/oct' },
      { value: 2, label: 'Positive only - 1 v/oct' }
    ]
  },
  inop: {
    code: 'inop',
    type: 'select',
    description: 'Input option',
    choices: [
      { value: 0, label: 'Record SOS mix' },
      { value: 1, label: 'Record input only' }
    ]
  },
  pmin: {
    code: 'pmin',
    type: 'select',
    description: 'Phase/position modulation',
    choices: [
      { value: 0, label: 'No phase modulation' },
      { value: 1, label: 'Phase playback modulation on right signal input when no signal on left input' }
    ]
  },
  omod: {
    code: 'omod',
    type: 'select',
    description: 'Organize option',
    choices: [
      { value: 0, label: 'Organize at end of gene' },
      { value: 1, label: 'Organize immediately' }
    ]
  },
  gnsm: {
    code: 'gnsm',
    type: 'select',
    description: 'Gene smooth',
    choices: [
      { value: 0, label: 'Classic' },
      { value: 1, label: 'Smooth gene window' }
    ]
  },
  rsop: {
    code: 'rsop',
    type: 'select',
    description: 'Record option',
    choices: [
      { value: 0, label: 'Record + splice = record new splice, record = record current splice' },
      { value: 1, label: 'Record + splice = record current splice, record = record new splice' }
    ]
  },
  pmod: {
    code: 'pmod',
    type: 'select',
    description: 'Play option',
    choices: [
      { value: 0, label: 'Classic' },
      { value: 1, label: 'Momentary' },
      { value: 2, label: 'Trigger loop' }
    ]
  },
  ckop: {
    code: 'ckop',
    type: 'select',
    description: 'Clock control option',
    choices: [
      { value: 0, label: 'Hybrid gene shift time stretch' },
      { value: 1, label: 'Gene shift only' },
      { value: 2, label: 'Time stretch only' }
    ]
  },
  cvop: {
    code: 'cvop',
    type: 'select',
    description: 'CV out',
    choices: [
      { value: 0, label: 'Envelope follow' },
      { value: 1, label: 'Ramp gene' }
    ]
  },
  mcr1: {
    code: 'mcr1',
    type: 'number',
    description: 'Morph Chord Ratio 1',
    min: -16,
    max: 16,
    step: 0.00001
  },
  mcr2: {
    code: 'mcr2',
    type: 'number',
    description: 'Morph Chord Ratio 2',
    min: -16,
    max: 16,
    step: 0.00001
  },
  mcr3: {
    code: 'mcr3',
    type: 'number',
    description: 'Morph Chord Ratio 3',
    min: -16,
    max: 16,
    step: 0.00001
  }
};
