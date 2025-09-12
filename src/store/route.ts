import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { usePermission } from "@/lib/hooks";
import { staticRoutes, transformRouteConfig } from "@/router";
import { routeConfig } from "@/router/routeConfig";
import { getUserRoutes } from "@/service/api";
import { useUserActions, useUserInfo } from "@/store";
import type { AppRouteObject } from "@/types";

interface RouteState {
  authRoutes: AppRouteObject[];
  isInitAuthRoute: boolean;
}
interface RouteActions {
  initAuthRoute: (routes: AppRouteObject[]) => Promise<void>;
  setInitAuthRoute: (value: boolean) => void;
  resetAuthRoute: () => void;
}

type RouteStore = RouteState & { actions: RouteActions };

export const useRouteStore = create<RouteStore>()(
  immer<RouteStore>((set) => ({
    authRoutes: [],
    isInitAuthRoute: false,

    // Actions
    actions: {
      initAuthRoute: async (routes) => {
        set((state) => {
          state.authRoutes = routes;
          state.isInitAuthRoute = true;
        });
      },
      setInitAuthRoute: (value: boolean) => {
        set((state) => {
          state.isInitAuthRoute = value;
        });
      },
      resetAuthRoute: () => {
        set((state) => {
          state.isInitAuthRoute = false;
          state.authRoutes = [];
        });
      },
    },
  }))
);

const isDynamicRoute = import.meta.env.VITE_ROUTE_LOAD_MODE === "dynamic";

// Selectors Hooks
export const useAuthRouteState = () => useRouteStore((state) => state);

// 权限路由 Hook
export const useAuthRoute = ({ immediate = true }: { immediate?: boolean } = {}) => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const { logout } = useUserActions();
  const { hasPermission } = usePermission();

  const state = useRouteStore((state) => state);

  const { setInitAuthRoute, initAuthRoute, ...actions } = useRouteStore((state) => state.actions);

  const [routeError, setRouteError] = useState<string | null>(null);

  const filterRoutes = useCallback(
    (routes: AppRouteObject[]) => {
      const filterFunc = (routes: AppRouteObject[]) => {
        return routes.filter((route) => {
          if (route.children?.length) {
            route.children = filterFunc(route.children);
          }
          return hasPermission((route.meta?.roles as Entity.RoleType[]) || []);
        });
      };

      return filterFunc(routes).sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0));
    },
    [hasPermission]
  );

  //获取路由配置
  const fetchRoutes = useCallback(
    async (user: Api.Login.Info | null) => {
      setInitAuthRoute(true);
      setRouteError(null);

      try {
        if (isDynamicRoute) {
          if (!user || !user.id) {
            logout();
            return;
          }

          const { data: dynamicRoutes } = await getUserRoutes({
            id: user.id,
          });
          // TODO: 使用从API获取的动态路由，目前使用静态配置进行mock
          // const routes = transformRouteConfig(dynamicRoutes);
          const routes = transformRouteConfig(routeConfig);
          console.log(
            "%c [ routes ]-104",
            "font-size:13px; background:pink; color:#bf2c9f;",
            routes
          );

          initAuthRoute(filterRoutes(routes));
        } else {
          initAuthRoute(filterRoutes(staticRoutes));
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : t("app.getRouteError");
        setRouteError(errorMessage);
        console.error("Failed to fetch route configs:", err);
      } finally {
        setInitAuthRoute(false);
      }
    },
    [t, logout, filterRoutes, setInitAuthRoute, initAuthRoute]
  );

  useEffect(() => {
    if (immediate) {
      fetchRoutes(userInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return {
    ...state,
    ...actions,
    routeError,
    initAuthRoute,
    setInitAuthRoute,
    refreshRoutes: fetchRoutes,
  };
};
