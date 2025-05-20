export const routes = {
  home: "/",
  folder: "/folder",
  // reel: "/folder/reel/:reelId",
  splice: "/folder/reel/:reelId/splice/:spliceIndex",
  options: "/folder/options",
} as const;

export function getReelPath(reelId: string): string {
  return getPath(routes.splice, { reelId, spliceIndex: "1" });
}

export function getSplicePath(reelId: string, spliceIndex: number): string {
  return getPath(routes.splice, {
    reelId,
    spliceIndex: spliceIndex.toString(),
  });
}

export function getPath(
  route: string,
  params: { [key in string]: string }
): string {
  let path = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  return path;
}
