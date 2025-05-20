export const routes = {
  home: "/",
  folder: "/folder",
  splice: "/folder/reel/:reelId/splice/:spliceId",
  options: "/folder/options",
} as const;

export function getReelPath(reelId: string): string {
  return getPath(routes.splice, { reelId, spliceId: "1" });
}

export function getSplicePath(reelId: string, spliceId: string): string {
  return getPath(routes.splice, {
    reelId,
    spliceId,
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
