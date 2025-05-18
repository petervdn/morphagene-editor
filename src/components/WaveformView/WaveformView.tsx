import {
  useState,
  useRef,
  useEffect,
  type ReactElement,
} from "react";
import styles from "./WaveformView.module.css";
import type { ViewPort } from "../../types/types";
import type { Splice } from "../../utils/getSplices";
import { useElementSize } from "../../utils/hooks/useElementSize";
import { WaveformCanvas } from "./WaveformCanvas";
import { SplicesCanvas } from "./SplicesCanvas";

type Props = {
  audioBuffer: AudioBuffer;
  splices: Array<Splice>;
  highlightSpliceIndex?: number;
};

export function WaveformView({ 
  audioBuffer, 
  splices, 
  highlightSpliceIndex = -1 
}: Props): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSize = useElementSize({ elementRef: wrapperRef });
  const [viewPort, setViewport] = useState<ViewPort | null>(null);

  useEffect(() => {
    setViewport({
      from: 0,
      to: audioBuffer.duration,
    });
  }, [audioBuffer]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {viewPort && wrapperSize && (
        <>
          <WaveformCanvas 
            audioBuffer={audioBuffer} 
            viewPort={viewPort} 
            size={wrapperSize} 
          />
          <SplicesCanvas 
            splices={splices} 
            viewPort={viewPort} 
            size={wrapperSize} 
            highlightIndex={highlightSpliceIndex} 
          />
        </>
      )}
    </div>
  );
}
