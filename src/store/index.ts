// Store connections and cross-store dependencies
import { useAppStore } from "./app";
import { useRouteStore } from "./route";
import { useTabsStore } from "./tabs";
import { useThemeStore } from "./theme";
import { connectUserStore, useUserStore } from "./user";

export * from "./app";
export * from "./user";
export * from "./theme";
export * from "./tabs";
export * from "./route";

// Store setup for React app
export const setupStores = () => {
  // Connect user store with route and tabs store methods
  connectUserStore(
    // Route initialization function
    async () => {
      await useRouteStore.getState().actions.initAuthRoute(
        // Logout function
        () => useUserStore.getState().actions.logout(),
        // Error display function (you may want to integrate with your notification system)
        (msg: string) => console.error(msg)
      );
    },
    // Clear tabs function
    () => {
      useTabsStore.getState().actions.clearAllTabs();
    }
  );

  // Initialize tabs with home route after routes are loaded
  let lastInitAuthRoute = false;
  useRouteStore.subscribe((state) => {
    const currentInitAuthRoute = state.isInitAuthRoute;
    if (currentInitAuthRoute && !lastInitAuthRoute) {
      const homeRoute = useRouteStore.getState().homeRoute();
      if (homeRoute) {
        useTabsStore.getState().actions.initTabs({
          name: homeRoute.name,
          path: homeRoute.path,
          fullPath: homeRoute.path,
          meta: homeRoute.meta,
        });
      }
    }
    lastInitAuthRoute = currentInitAuthRoute;
  });
};

/**
 * Hook to use multiple stores together
 * Useful for components that need access to multiple stores
 */
export const useStores = () => {
  const appStore = useAppStore();
  const userStore = useUserStore();
  const themeStore = useThemeStore();
  const tabsStore = useTabsStore();
  const routeStore = useRouteStore();

  return {
    app: appStore,
    user: userStore,
    theme: themeStore,
    tabs: tabsStore,
    route: routeStore,
  };
};

/**
 * Helper function to reset all stores (useful for logout)
 */
export const resetAllStores = () => {
  useRouteStore.getState().actions.resetRoutes();
  useTabsStore.getState().actions.clearAllTabs();
  // App store and theme store persist their settings, so we don't reset them
};
