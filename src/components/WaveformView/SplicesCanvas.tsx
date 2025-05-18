import { useEffect, useCallback, type ReactElement, useRef } from "react";
import { drawSplices } from "../../utils/canvas/drawSplices";
import type { ViewPort } from "../../types/types";
import type { Size } from "../../types/types";
import type { Splice } from "../../utils/getSplices";
import { SizedCanvas } from "../SizedCanvas/SizedCanvas";

type Props = {
  splices: Array<Splice>;
  viewPort: ViewPort;
  size: Size;
  highlightIndex?: number;
};

export function SplicesCanvas({ 
  splices, 
  viewPort, 
  size,
  highlightIndex = -1
}: Props): ReactElement {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!contextRef.current || !viewPort || !size) {
      return;
    }

    drawSplices({
      context: contextRef.current,
      splices,
      viewPort,
      highlightIndex,
    });
  }, [splices, viewPort, size, highlightIndex]);

  const onCanvasRef = useCallback(
    (canvasElement: HTMLCanvasElement | null) => {
      contextRef.current = canvasElement?.getContext("2d") ?? null;
    },
    []
  );

  return <SizedCanvas size={size} onCanvasRef={onCanvasRef} />;
}
