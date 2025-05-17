import type { ViewPort } from "../../types/types";
import type { Splice } from "../getSplices";

// Define a set of visually distinct colors for the splice markers
const DEFAULT_COLORS = [
  "#FF5252", // Red
  "#4CAF50", // Green
  "#2196F3", // Blue
  "#FF9800", // Orange
  "#9C27B0", // Purple
  "#00BCD4", // Cyan
  "#FFEB3B", // Yellow
  "#795548", // Brown
];

export function drawSplices({
  context,
  viewPort,
  splices,
  colors = DEFAULT_COLORS,
}: {
  context: CanvasRenderingContext2D;
  viewPort: ViewPort;
  splices: Array<Splice>;
  colors?: Array<string>;
}): void {
  if (!context || !viewPort || !splices.length) return;

  const { width, height } = context.canvas;
  const viewportDuration = viewPort.to - viewPort.from;

  // Draw each splice marker as a vertical line
  splices.forEach((splice, index) => {
    // Skip if splice is outside the viewport
    if (splice.start < viewPort.from && splice.end < viewPort.from) return;
    if (splice.start > viewPort.to) return;

    // Calculate x-position based on the splice start time
    const xPos =
      Math.round(((splice.start - viewPort.from) / viewportDuration) * width) +
      0.5;

    // Skip if position is outside the canvas
    if (xPos < 0 || xPos > width) return;

    // Select color from the rotating set
    const colorIndex = index % colors.length;
    const color = colors[colorIndex];

    // Draw the vertical line for this splice
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.setLineDash([5, 3]); // Dashed line
    context.moveTo(xPos, 0);
    context.lineTo(xPos, height);
    context.stroke();

    // Reset line style
    context.setLineDash([]);

    // Add a small label with the splice index
    context.font = "10px sans-serif";
    context.fillStyle = color;
    context.fillText(`${index + 1}`, xPos + 3, 12);
  });
}
