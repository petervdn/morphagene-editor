import { routes } from "../routes";
import { getPath } from "./getPath";

export function getReelPath(reelId: string): string {
  return getPath(routes.splice, { reelId, spliceId: "1" });
}
