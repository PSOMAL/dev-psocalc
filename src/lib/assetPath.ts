const basePath: string = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const assetPath = (path?: string): string => {
  if (!path) return basePath;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
};
