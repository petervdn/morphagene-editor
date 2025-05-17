/**
 * Central configuration for application routes
 */
export const ROUTES = {
  HOME: "/",
  FOLDER: "/folder",
  REEL: "/folder/reel/:reelName",
} as const;

/**
 * Helper functions to generate route paths with parameters
 */
export const ROUTE_PATHS = {
  /**
   * Get the home page path
   */
  home: () => ROUTES.HOME,
  
  /**
   * Get the folder page path
   */
  folder: () => ROUTES.FOLDER,
  
  /**
   * Get a specific reel page path
   * @param reelName The name of the reel file
   */
  reel: (reelName: string) => `/folder/reel/${reelName}`,
} as const;
