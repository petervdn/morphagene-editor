import type { ReactElement } from "react";
import type { Size } from "../../types/types";

type Props = {
  size: Size;
  onCanvasRef: (instance: HTMLCanvasElement | null) => void;
};

export function SizedCanvas({ size, onCanvasRef }: Props): ReactElement {
  return (
    <canvas
      ref={onCanvasRef}
      width={size.width * window.devicePixelRatio}
      height={size.height * window.devicePixelRatio}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    />
  );
}
