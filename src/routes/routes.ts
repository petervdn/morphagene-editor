export const routes = {
  home: "/",
  folder: "/folder",
  reel: "/folder/reel/:reelId",
} as const;

export function getReelPath(reelId: string): string {
  return routes.reel.replace(":reelId", reelId);
}
