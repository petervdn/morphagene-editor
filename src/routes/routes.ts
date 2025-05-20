export const routes = {
  home: "/",
  folder: "/folder",
  reel: "/folder/reel/:reelId",
  options: "/folder/options",
} as const;

export function getReelPath(reelId: string): string {
  return routes.reel.replace(":reelId", reelId);
}

export function getOptionsPath(): string {
  return routes.options;
}
