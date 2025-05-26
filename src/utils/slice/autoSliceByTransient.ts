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
  // If sensitivity is very low, return no slices
  if (sensitivity <= 1) {
    useCuePointTimesStore.setState({
      autoSliceCuePointTimes: [],
    });
    return;
  }

  const times: Array<number> = [];
  const sampleRate = audioBuffer.sampleRate;
  const leftChannel = audioBuffer.getChannelData(0);
  
  // Convert splice start and end times to sample indices
  const startSample = Math.floor(splice.start * sampleRate);
  const endSample = Math.floor(splice.end * sampleRate);
  
  // Fixed analysis window size (better for transient detection)
  const windowSize = Math.floor(sampleRate * 0.01); // 10ms window
  const hopSize = Math.floor(windowSize / 2); // 50% overlap for better resolution
  
  // Normalize sensitivity to get fewer results at low values
  // and more results as sensitivity increases
  const normalizedSensitivity = Math.pow(sensitivity / 100, 2) * 100;
  
  // Calculate minimum distance between transients based on sensitivity
  // Higher sensitivity = smaller minimum distance
  const minDistance = Math.floor(sampleRate * (0.2 - ((normalizedSensitivity - 1) / 100) * 0.18)); // 20ms to 200ms
  
  // Apply a more aggressive threshold function that produces fewer results at low sensitivity
  const baseThreshold = 3.0; // Higher base threshold means fewer detections overall
  const thresholdReduction = (normalizedSensitivity / 100) * 2.5; // How much threshold is reduced at max sensitivity
  const threshold = baseThreshold - thresholdReduction;
  
  // Extract energy values and calculate their derivatives (rate of change)
  const energyValues: number[] = [];
  const energyDerivatives: number[] = [];
  
  // Calculate energy values
  for (let i = startSample; i < endSample - windowSize; i += hopSize) {
    let sum = 0;
    for (let j = 0; j < windowSize; j++) {
      const sample = leftChannel[i + j] || 0;
      sum += sample * sample; // Square the sample for energy calculation
    }
    const energy = Math.sqrt(sum / windowSize);
    energyValues.push(energy);
  }
  
  // Calculate energy derivatives (how quickly energy changes)
  for (let i = 1; i < energyValues.length; i++) {
    energyDerivatives.push(energyValues[i] - energyValues[i - 1]);
  }
  
  // Find peaks in the energy derivative (sudden increases in energy)
  let lastTransientIndex = -1;
  for (let i = 1; i < energyDerivatives.length - 1; i++) {
    const prevDeriv = energyDerivatives[i - 1];
    const currentDeriv = energyDerivatives[i];
    const nextDeriv = energyDerivatives[i + 1];
    
    // Check if this is a positive peak in the derivative (sharp increase followed by decrease)
    if (currentDeriv > prevDeriv && currentDeriv > nextDeriv && currentDeriv > 0) {
      // Compare to threshold scaled by local energy to adapt to different volume levels
      const localEnergy = energyValues[i];
      const adaptiveThreshold = threshold * (localEnergy > 0.1 ? 1 : 2); // Higher threshold for quiet sections
      
      // Normalize the derivative by local energy to handle varying volume levels
      const normalizedDerivative = currentDeriv / (localEnergy + 0.001);
      
      if (normalizedDerivative > adaptiveThreshold) {
        const sampleIndex = startSample + (i * hopSize);
        
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
  }
  
  // Sort times in ascending order
  times.sort((a, b) => a - b);
  
  // Update the store with detected transient times
  useCuePointTimesStore.setState({
    autoSliceCuePointTimes: times,
  });
}
