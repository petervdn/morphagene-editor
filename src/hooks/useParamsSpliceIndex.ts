import { usePathParams } from "./usePathParams";

export function useParamsSpliceIndex(): number {
  const { spliceId } = usePathParams();
  return spliceId !== "" ? Number(spliceId) - 1 : -1;
}
