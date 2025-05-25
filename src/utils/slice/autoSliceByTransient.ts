import { useCuePointTimesStore } from "../../stores/cuePointTimes/cuePointTimesStore";
import type { Splice } from "../../types/types";

type Props = {
  splice: Splice;
  sensitivity: number;
  audioBuffer: AudioBuffer;
};

export function autoSliceByTransient({
  sensitivity,
  splice,
  audioBuffer,
}: Props): void {
  const times: Array<number> = [];
  const sampleRate = audioBuffer.sampleRate;
  const leftChannel = audioBuffer.getChannelData(0);
  
  // Convert splice start and end times to sample indices
  const startSample = Math.floor(splice.start * sampleRate);
  const endSample = Math.floor(splice.end * sampleRate);
  
  // Calculate window size for analysis based on sensitivity
  // Lower sensitivity = larger window (less sensitive to small changes)
  const windowSize = Math.floor(sampleRate * (0.05 - (sensitivity - 1) / 2000)); // 5ms to 50ms window
  
  // Minimum distance between transients in samples
  const minDistance = Math.floor(sampleRate * 0.05); // 50ms minimum between transients
  
  // Threshold for detecting transients - adjust based on sensitivity
  const threshold = 1.5 - (sensitivity / 100);
  
  // Extract RMS energy values from the audio
  const energyValues: number[] = [];
  for (let i = startSample; i < endSample - windowSize; i += windowSize) {
    let sum = 0;
    for (let j = 0; j < windowSize; j++) {
      const sample = leftChannel[i + j] || 0;
      sum += sample * sample; // Square the sample for RMS calculation
    }
    const rms = Math.sqrt(sum / windowSize);
    energyValues.push(rms);
  }
  
  // Find transients (peaks in energy)
  let lastTransientIndex = -1;
  for (let i = 1; i < energyValues.length - 1; i++) {
    // Look for sudden increases in energy
    const prevEnergy = energyValues[i - 1];
    const currentEnergy = energyValues[i];
    const nextEnergy = energyValues[i + 1];
    
    // Calculate energy ratio - higher ratio means sharper transient
    const ratio = currentEnergy / (prevEnergy + 0.0001); // Avoid division by zero
    
    // Check if this is a peak (transient)
    if (ratio > threshold && currentEnergy > nextEnergy) {
      const sampleIndex = startSample + (i * windowSize);
      
      // Ensure minimum distance between transients
      if (lastTransientIndex === -1 || (sampleIndex - lastTransientIndex) >= minDistance) {
        const timeInSeconds = sampleIndex / sampleRate;
        
        // Only add if within the splice range
        if (timeInSeconds > splice.start && timeInSeconds < splice.end) {
          times.push(timeInSeconds);
          lastTransientIndex = sampleIndex;
        }
      }
    }
  }
  
  // Sort times in ascending order
  times.sort((a, b) => a - b);
  
  // Update the store with detected transient times
  useCuePointTimesStore.setState({
    autoSliceCuePointTimes: times,
  });
}
