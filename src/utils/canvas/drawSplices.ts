import type { Splice, ViewPort } from "../../types/types";

// Define a classy deep red color for the selected splice
const SELECTED_RED = "#B71C1C";
// Define a light gray color for all other splices
const LIGHT_GRAY = "#CCCCCC";

export function drawSplices({
  context,
  viewPort,
  splices,
  selectedSpliceIndex,
}: {
  context: CanvasRenderingContext2D;
  viewPort: ViewPort;
  splices: Array<Splice>;
  selectedSpliceIndex?: number;
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

    // Determine if this is the selected splice
    const isSelected = index === selectedSpliceIndex;
    
    // Use deep red for selected splice, light gray for others
    const color = isSelected ? SELECTED_RED : LIGHT_GRAY;

    // Calculate positions based on the splice start/end times
    const startX =
      Math.round(((splice.start - viewPort.from) / viewportDuration) * width) +
      0.5;

    // Skip if position is outside the canvas
    if (startX < 0 || startX > width) return;

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

    // Add a label with the splice ID
    const spliceId = String(index + 1);
    const fontSize = 22;
    const padding = 8;
    
    // Set font style
    context.font = isSelected ? "bold 22px sans-serif" : "22px sans-serif";
    
    // For the selected splice, add a red background behind the label that spans the full splice width
    if (isSelected) {
      context.save();
      const bgHeight = fontSize + padding;
      
      // Calculate the end position of the splice
      let endX;
      if (index < splices.length - 1) {
        // If not the last splice, go up to the next splice
        const nextSplice = splices[index + 1];
        endX = Math.round(((nextSplice.start - viewPort.from) / viewportDuration) * width) + 0.5;
      } else {
        // If it's the last splice, use its end time
        endX = Math.round(((splice.end - viewPort.from) / viewportDuration) * width) + 0.5;
      }
      
      // Draw background rectangle that spans the full width of the splice
      context.fillStyle = color;
      context.fillRect(startX, 0, endX - startX, bgHeight);
      
      // Draw the label in white for better contrast
      context.fillStyle = "#FFFFFF";
    } else {
      // For non-selected splices, use the regular color
      context.fillStyle = color;
    }
    
    // Draw the text
    context.fillText(spliceId, startX + padding, fontSize);
    
    if (isSelected) {
      context.restore();
    }
  });
}
