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
  highlightIndex = -1,
}: {
  context: CanvasRenderingContext2D;
  viewPort: ViewPort;
  splices: Array<Splice>;
  colors?: Array<string>;
  highlightIndex?: number;
}): void {
  if (!context || !viewPort || !splices.length) return;

  const { width, height } = context.canvas;
  const viewportDuration = viewPort.to - viewPort.from;

  // Clear the canvas before drawing
  context.clearRect(0, 0, width, height);

  // Draw each splice marker as a vertical line
  splices.forEach((splice, index) => {
    // Skip if splice is outside the viewport
    if (splice.start < viewPort.from && splice.end < viewPort.from) return;
    if (splice.start > viewPort.to) return;

    // Select color from the rotating set
    const colorIndex = index % colors.length;
    const color = colors[colorIndex];

    // Calculate positions based on the splice start/end times
    const startX = Math.round(((splice.start - viewPort.from) / viewportDuration) * width) + 0.5;
    
    // Skip if position is outside the canvas
    if (startX < 0 || startX > width) return;

    // If this is the highlighted splice, draw a semi-transparent background
    if (index === highlightIndex && splice.end > splice.start) {
      const endX = Math.round(((splice.end - viewPort.from) / viewportDuration) * width) + 0.5;
      
      // Draw a semi-transparent rectangle for the highlighted splice
      context.fillStyle = color + '33'; // Add 33 hex for 20% opacity
      context.fillRect(startX, 0, endX - startX, height);
    }

    // Draw the vertical line for this splice
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 4;
    context.setLineDash([5, 3]); // Dashed line
    context.moveTo(startX, 0);
    context.lineTo(startX, height);
    context.stroke();

    // Reset line style
    context.setLineDash([]);

    // Add a small label with the splice index
    context.font = "22px sans-serif";
    context.fillStyle = color;
    context.fillText(`${index + 1}`, startX + 8, 22);
  });
}
