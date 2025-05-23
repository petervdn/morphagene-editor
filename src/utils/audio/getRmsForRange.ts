import type { Range } from "../../types/types";

// todo throw error if out of bounds
export function getRmsForRange({
  range: { start, end },
  values,
}: {
  range: Range;
  values: Float32Array;
}): number {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += values[i] * values[i];
  }
  return Math.sqrt(sum / (end - start));
}
