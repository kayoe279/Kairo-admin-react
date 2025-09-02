import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PAGE } from "@/lib/constants";
import { getUserInfo } from "@/lib/storage";

// Mock API call - replace with your actual API
const getUserRoutes = async (_params: { id: number }) => {
  // This should be replaced with your actual API call
  return { data: [] as AppRoute.DynamicRouteRecordRaw[] };
};

// Mock permission check - implement according to your auth system
const hasPermission = (requiredRoles: string[]): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) return true;

  const userInfo = getUserInfo();
  if (!userInfo?.roles) return false;

  return requiredRoles.some((role) => userInfo.roles.includes(role as Entity.RoleType));
};

// Mock route generation functions - implement according to your needs
const generateDynamicRoutes = (
  dynamicRoutes: AppRoute.DynamicRouteRecordRaw[]
): AppRoute.RouteItem[] => {
  // Convert API routes to your route structure
  return dynamicRoutes.map((route) => ({
    name: route.name,
    path: route.path,
    meta: { ...route.meta } as AppRoute.RouteItem["meta"], // Type compatibility fix
    children: route.children ? generateDynamicRoutes(route.children) : undefined,
  }));
};

const generateCacheRoutes = (routes: AppRoute.RouteItem[]): string[] => {
  // Generate list of component names to cache (for keep-alive equivalent)
  const cacheList: string[] = [];

  const traverse = (routes: AppRoute.RouteItem[]) => {
    routes.forEach((route) => {
      if (route.meta?.cache && route.name) {
        cacheList.push(route.name);
      }
      if (route.children) {
        traverse(route.children);
      }
    });
  };

  traverse(routes);
  return cacheList;
};

interface RouteState {
  // State
  rowRoutes: AppRoute.RouteItem[];
  cacheRoutes: string[];
  isInitAuthRoute: boolean;

  // Computed
  homeRoute: () => AppRoute.RouteItem | undefined;

  // Internal methods
  filterRoutes: (routes: AppRoute.RouteItem[]) => AppRoute.RouteItem[];
}

interface RouteActions {
  initAuthRoute: (logout?: () => void, showError?: (msg: string) => void) => Promise<void>;
  resetRoutes: () => void;
  addRoute: (route: AppRoute.RouteItem) => void;
  removeRoute: (name: string) => void;
  hasRoute: (name: string) => boolean;
}

type RouteStore = RouteState & { actions: RouteActions };

export const useRouteStore = create<RouteStore>()(
  immer((set, get) => ({
    // Initial state
    rowRoutes: [],
    cacheRoutes: [],
    isInitAuthRoute: false,

    // Computed: Find home route
    homeRoute: () => {
      const { rowRoutes } = get();
      const home = rowRoutes.find((item) => item.name === PAGE.HOME_NAME);
      return (
        home?.children?.find((item) => item.meta?.affix || item.name === PAGE.HOME_NAME_REDIRECT) ||
        home
      );
    },

    // Filter routes by permissions
    filterRoutes: (routes: AppRoute.RouteItem[]): AppRoute.RouteItem[] => {
      return routes.filter((route) => {
        if (route.children?.length) {
          route.children = get().filterRoutes(route.children);
        }
        return hasPermission(route.meta?.roles || []);
      });
    },

    // Actions
    actions: {
      // Initialize auth routes
      initAuthRoute: async (logout?, showError?) => {
        set((state) => {
          state.isInitAuthRoute = false;
        });

        let resultRouter: AppRoute.RouteItem[] = [];

        // Check if using dynamic route loading
        if (process.env.REACT_APP_ROUTE_LOAD_MODE === "dynamic") {
          const userInfo = getUserInfo();
          if (!userInfo || !userInfo.id) {
            logout?.();
            return;
          }

          try {
            const { data: dynamicRoutes } = await getUserRoutes({
              id: userInfo.id,
            });

            if (dynamicRoutes?.length) {
              resultRouter = generateDynamicRoutes(dynamicRoutes);
            }
          } catch (error) {
            console.error("Failed to load user routes:", error);
            showError?.("Failed to load user routes");
            return;
          }
        } else {
          // Load static routes - you'll need to define these
          // resultRouter = cloneDeep(staticAsyncRoutes);
          resultRouter = []; // Replace with your static routes
        }

        if (!resultRouter.length) {
          showError?.("No routes available");
          return;
        }

        // Filter routes by permissions
        resultRouter = get().filterRoutes(resultRouter);

        // In React, we can't dynamically add routes like Vue Router
        // Instead, we store the routes and let the routing component handle them
        set((state) => {
          state.rowRoutes = resultRouter;
          state.cacheRoutes = generateCacheRoutes(resultRouter);
          state.isInitAuthRoute = true;
        });
      },

      // Reset routes (for logout)
      resetRoutes: () => {
        set((state) => {
          state.rowRoutes = [];
          state.cacheRoutes = [];
          state.isInitAuthRoute = false;
        });
      },

      // Add single route (for dynamic route addition)
      addRoute: (route: AppRoute.RouteItem) => {
        set((state) => {
          const exists = state.rowRoutes.some((r: AppRoute.RouteItem) => r.name === route.name);
          if (!exists) {
            state.rowRoutes.push(route);
            // Update cache routes if needed
            state.cacheRoutes = generateCacheRoutes(state.rowRoutes);
          }
        });
      },

      // Remove route by name
      removeRoute: (name: string) => {
        set((state) => {
          state.rowRoutes = state.rowRoutes.filter(
            (route: AppRoute.RouteItem) => route.name !== name
          );
          state.cacheRoutes = generateCacheRoutes(state.rowRoutes);
        });
      },

      // Check if route exists
      hasRoute: (name: string) => {
        const { rowRoutes } = get();
        const findRoute = (routes: AppRoute.RouteItem[]): boolean => {
          return routes.some((route) => {
            if (route.name === name) return true;
            if (route.children) return findRoute(route.children);
            return false;
          });
        };
        return findRoute(rowRoutes);
      },
    },
  }))
);

// Helper function to get all flattened routes (useful for navigation)
export const getFlatRoutes = (routes: AppRoute.RouteItem[]): AppRoute.RouteItem[] => {
  const flatRoutes: AppRoute.RouteItem[] = [];

  const traverse = (routes: AppRoute.RouteItem[]) => {
    routes.forEach((route) => {
      flatRoutes.push(route);
      if (route.children) {
        traverse(route.children);
      }
    });
  };

  traverse(routes);
  return flatRoutes;
};

// Helper function to find route by name
export const findRouteByName = (
  routes: AppRoute.RouteItem[],
  name: string
): AppRoute.RouteItem | undefined => {
  for (const route of routes) {
    if (route.name === name) {
      return route;
    }
    if (route.children) {
      const found = findRouteByName(route.children, name);
      if (found) return found;
    }
  }
  return undefined;
};

// Selectors Hooks
export const useRoutes = () => useRouteStore((s) => s.rowRoutes);
export const useCacheRoutes = () => useRouteStore((s) => s.cacheRoutes);
export const useIsInitAuthRoute = () => useRouteStore((s) => s.isInitAuthRoute);
export const useHomeRoute = () => useRouteStore((s) => s.homeRoute());
export const useRouteActions = () => useRouteStore((s) => s.actions);
