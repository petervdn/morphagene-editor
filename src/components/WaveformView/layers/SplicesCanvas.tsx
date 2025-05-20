import { useEffect, useCallback, type ReactElement, useRef } from "react";
import { drawSplices } from "../../../utils/canvas/drawSplices";
import type { Splice, ViewPort } from "../../../types/types";
import type { Size } from "../../../types/types";
import { SizedCanvas } from "../../SizedCanvas/SizedCanvas";
import { useSplice } from "../../../utils/hooks/useSpliceFromUrl";

type Props = {
  splices: Array<Splice>;
  viewPort: ViewPort;
  size: Size;
};

// todo extract + move shared code from all canvases
export function SplicesCanvas({
  splices,
  viewPort,
  size,
}: Props): ReactElement {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Get the selected splice index from the URL
  const { spliceIndex } = useSplice(splices);

  useEffect(() => {
    if (!contextRef.current || !viewPort || !size) {
      return;
    }

    drawSplices({
      context: contextRef.current,
      splices,
      viewPort,
      selectedSpliceIndex: spliceIndex,
    });
  }, [splices, viewPort, size, spliceIndex]);

  const onCanvasRef = useCallback((canvasElement: HTMLCanvasElement | null) => {
    contextRef.current = canvasElement?.getContext("2d") ?? null;
  }, []);

  return <SizedCanvas size={size} onCanvasRef={onCanvasRef} />;
}
