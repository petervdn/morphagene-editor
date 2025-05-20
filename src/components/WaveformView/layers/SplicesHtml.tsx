import { type ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import type { Splice, ViewPort } from "../../../types/types";
import type { Size } from "../../../types/types";
import { useSplice } from "../../../utils/hooks/useSpliceFromUrl";
import styles from "./SplicesHtml.module.css";
import { getSplicePath } from "../../../routes/routes";

// Define a fresh blue color for the selected splice (matching waveform background)
const SELECTED_BLUE = "#1E90FF";
// Define a light gray color for all other splices
const LIGHT_GRAY = "#CCCCCC";
// Define white for selected splice background
const WHITE = "#FFFFFF";

type Props = {
  splices: Array<Splice>;
  viewPort: ViewPort;
  size: Size;
  onSpliceClick?: (index: number) => void;
};

export function SplicesHtml({
  splices,
  viewPort,
  size,
  onSpliceClick,
}: Props): ReactElement {
  // Get the selected splice from the URL
  const { spliceIndex } = useSplice(splices);
  // Get the reel ID from the URL params
  const { reelId } = useParams();

  if (!viewPort || !size || !splices.length) {
    return <div className={styles.container} style={size} />;
  }

  const { width, height } = size;
  const viewportDuration = viewPort.to - viewPort.from;

  // Create splice elements
  const spliceElements = [];
  
  // Add vertical markers for all splices
  for (let i = 0; i < splices.length; i++) {
    const currentSplice = splices[i];
    
    // Skip if splice is completely outside the viewport
    if (currentSplice.start > viewPort.to || currentSplice.end < viewPort.from) {
      continue;
    }
    
    // Determine if this is the selected splice
    const isSelected = i === spliceIndex;
    
    // Use blue for selected splice marker, light gray for others
    const markerColor = isSelected ? SELECTED_BLUE : LIGHT_GRAY;
    
    // Use white background with blue text for selected splice label, light gray background with white text for others
    const labelBgColor = isSelected ? WHITE : LIGHT_GRAY;
    const labelTextColor = isSelected ? SELECTED_BLUE : WHITE;
    
    // Calculate the X position for this splice
    const startX = Math.round(((currentSplice.start - viewPort.from) / viewportDuration) * width);
    
    // Create the URL for the splice link using the getSplicePath helper
    const spliceUrl = reelId ? getSplicePath(reelId, String(i + 1)) : '#';
    
    // Splice ID for display
    const displayId = String(i + 1);
    
    // Add vertical line marker (skip for the first splice)
    if (i > 0) {
      spliceElements.push(
        <Link 
          key={`marker-${i}`}
          to={spliceUrl}
          className={styles.spliceMarker}
          style={{
            left: `${startX}px`,
            borderLeftColor: markerColor,
          }}
          title={`Splice ${displayId}`}
        />
      );
    }
    
    // Add label with background
    spliceElements.push(
      <Link 
        key={`label-${i}`}
        to={spliceUrl}
        className={`${styles.spliceLabel} ${isSelected ? styles.selectedLabel : ''}`}
        style={{
          left: `${startX + 4}px`, // Reduced padding for smaller font
          backgroundColor: labelBgColor,
        }}
        title={`Splice ${displayId}`}
      >
        {displayId}
      </Link>
    );
  }
  
  return (
    <div className={styles.container} style={{ width, height }}>
      {spliceElements}
    </div>
  );
}
