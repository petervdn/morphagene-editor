import { useEffect, type RefObject } from "react";

export function useWheelEvent({
  elementRef,
  onWheel,
}: {
  elementRef: RefObject<HTMLElement | null>;
  onWheel?(event: globalThis.WheelEvent): void;
}): void {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      onWheel?.(event);
    };

    // Add non-passive wheel event listener
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [elementRef, onWheel]);
}
