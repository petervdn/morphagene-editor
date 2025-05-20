import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSplicePath } from '../../routes/routes';
import type { Splice } from '../../types/types';

/**
 * Hook for handling keyboard navigation between splices
 * Allows using left/right arrow keys to navigate between splices
 * and up/down arrow keys for zoom control
 */
export function useKeyboardNavigation({
  splices = [],
  zoomToRangeRef,
  setZoomLevel,
  audioBuffer,
}: {
  splices?: Splice[];
  zoomToRangeRef?: React.MutableRefObject<
    | ((start: number, end: number, options?: any) => void)
    | null
  >;
  setZoomLevel?: (level: number) => void;
  audioBuffer?: AudioBuffer | null;
} = {}) {
  const { reelId, spliceId } = useParams();
  const navigate = useNavigate();

  // Handle keyboard navigation between splices and zoom controls
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only handle navigation if we have a valid spliceId and reelId
    if (!spliceId || !reelId) return;
    
    // Get the current splice ID as a number
    const currentSpliceIdNum = parseInt(spliceId, 10);
    
    if (event.key === 'ArrowLeft' && currentSpliceIdNum > 1) {
      // Navigate to previous splice (can't go before splice 1)
      const prevSpliceId = String(currentSpliceIdNum - 1);
      navigate(getSplicePath(reelId, prevSpliceId));
    } else if (event.key === 'ArrowRight') {
      // Navigate to next splice
      // We don't know the max splice ID here, but the router will handle invalid IDs
      const nextSpliceId = String(currentSpliceIdNum + 1);
      navigate(getSplicePath(reelId, nextSpliceId));
    } else if (event.key === 'ArrowUp' && zoomToRangeRef?.current && audioBuffer) {
      // Zoom fully out (level 1) with animation
      zoomToRangeRef.current(0, audioBuffer.duration, {
        duration: 300, // Shorter, snappier animation (300ms)
        easing: 'easeInCubic', // Inverted easing for zoom out
      });
    } else if (event.key === 'ArrowDown' && zoomToRangeRef?.current && splices.length > 0) {
      // Zoom to current selected splice
      const currentSpliceIndex = currentSpliceIdNum - 1; // Convert from 1-based to 0-based
      if (currentSpliceIndex >= 0 && currentSpliceIndex < splices.length) {
        const currentSplice = splices[currentSpliceIndex];
        zoomToRangeRef.current(currentSplice.start, currentSplice.end, {
          duration: 300, // Shorter, snappier animation (300ms)
          easing: 'easeOutCubic',
        });
      }
    }
  }, [reelId, spliceId, navigate, splices, zoomToRangeRef, setZoomLevel, audioBuffer]);
  
  // Add and remove keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // No need to return anything as this hook just sets up the listeners
}
