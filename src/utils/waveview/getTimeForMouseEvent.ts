import type { Range } from "../../types/types";

export function getTimeForMouseEvent(
  event: {
    clientX: number;
  },
  element: HTMLElement,
  viewPort: Range
): number {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  return viewPort.start + (x / rect.width) * (viewPort.end - viewPort.start);
}
