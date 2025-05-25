import { useEffect, useState, type RefObject } from "react";
import type { Size } from "../types/types";

type Props = {
  elementRef: RefObject<HTMLElement | null>;
};

export function useElementSize({ elementRef }: Props) {
  const [elementSize, setElementSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    function updateSize() {
      const { width, height } = element.getBoundingClientRect();
      setElementSize({ width, height });
    }

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [elementRef]);

  return elementSize;
}
