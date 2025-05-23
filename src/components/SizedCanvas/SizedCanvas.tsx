import type { ReactElement } from "react";
import type { Size } from "../../types/types";

type Props = {
  size: Size;
  onCanvasRef: (instance: HTMLCanvasElement | null) => void;
  className?: string;
};

export function SizedCanvas({
  size,
  onCanvasRef,
  className,
}: Props): ReactElement {
  return (
    <canvas
      className={className}
      ref={onCanvasRef}
      width={size.width * window.devicePixelRatio}
      height={size.height * window.devicePixelRatio}
      style={{
        width: size.width,
        height: size.height,
      }}
    />
  );
}
