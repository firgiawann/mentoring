export const deploymentBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function createSitePath(path: `/${string}`, basePath = deploymentBasePath) {
  const normalizedBasePath = basePath.replace(/\/$/, "");
  return normalizedBasePath ? `${normalizedBasePath}${path}` : path;
}
