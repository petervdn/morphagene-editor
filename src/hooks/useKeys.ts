import { useEffect } from "react";

type UseKeysConfig = Record<string, () => void>;

export function useKeys(config: UseKeysConfig) {
  useEffect(() => {
    function onKeyUp(event: globalThis.KeyboardEvent) {
      config[event.key]?.();
    }

    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [config]);
}
