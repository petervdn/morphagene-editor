import { routes } from "../routes";
import { getPath } from "./getPath";

export function getSplicePath({
  reelId,
  spliceId,
}: {
  reelId: string;
  spliceId: string;
}): string {
  return getPath(routes.splice, {
    reelId,
    spliceId,
  });
}
