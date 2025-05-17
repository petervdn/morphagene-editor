export const routes = {
  home: "/",
  folder: "/folder",
  reel: "/folder/reel/:reelName",
} as const;

export function getReelPath(reelName: string): string {
  return routes.reel.replace(":reelName", reelName);
}
