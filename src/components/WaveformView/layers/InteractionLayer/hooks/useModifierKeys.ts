import { useEffect, useState } from "react";

export function useModifierKeys() {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isAltPressed, setIsAltPressed] = useState(false);

  useEffect(() => {
    function onKeyDown({ key }: KeyboardEvent) {
      if (key === "Shift") {
        setIsShiftPressed(true);
      } else if (key === "Alt") {
        setIsAltPressed(true);
      }
    }

    function onKeyUp({ key }: KeyboardEvent) {
      if (key === "Shift") {
        setIsShiftPressed(false);
      } else if (key === "Alt") {
        setIsAltPressed(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return {
    isShiftPressed,
    isAltPressed,
  };
}
