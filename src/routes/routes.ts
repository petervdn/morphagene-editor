export const routes = {
  home: "/",
  folder: "/folder",
  reel: "/folder/reel/:reelId",
  splice: "/folder/reel/:reelId/splice/:spliceIndex",
  options: "/folder/options",
} as const;

export function getReelPath(reelId: string): string {
  return routes.reel.replace(":reelId", reelId);
}

export function getSplicePath(reelId: string, spliceIndex: number): string {
  return routes.splice
    .replace(":reelId", reelId)
    .replace(":spliceIndex", spliceIndex.toString());
}
