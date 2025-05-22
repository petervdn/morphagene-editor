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
