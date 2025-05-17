import type { ReactElement } from "react";
import type { Size } from "../../types/types";

type Props = {
  size: Size;
  onCanvasRef: (instance: HTMLCanvasElement | null) => void;
  className?: string;
  style?: React.CSSProperties;
};

export function SizedCanvas({ 
  size, 
  onCanvasRef, 
  className,
  style = {}
}: Props): ReactElement {
  return (
    <canvas
      className={className}
      ref={onCanvasRef}
      width={size.width * window.devicePixelRatio}
      height={size.height * window.devicePixelRatio}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${size.width}px`,
        height: `${size.height}px`,
        ...style
      }}
    />
  );
}
