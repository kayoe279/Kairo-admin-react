import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { hasPermission } from "@/hooks";
import { PAGE } from "@/lib";
import { getUserInfo } from "@/lib/cookie";
import { staticRoutes, transformRouteConfig } from "@/router";
import { getUserRoutes, type RoleType } from "@/service";
import { useUserActions, useUserInfo } from "@/store";
import type { AppRouteObject } from "@/types";

interface RouteState {
  authRoutes: AppRouteObject[];
  isInitAuthRoute: boolean;
  getHomeRoute: () => AppRouteObject | undefined;
}
interface RouteActions {
  initAuthRoute: (routes: AppRouteObject[]) => Promise<void>;
  setInitAuthRoute: (value: boolean) => void;
  resetAuthRoute: () => void;
}

type RouteStore = RouteState & { actions: RouteActions };

export const useRouteStore = create<RouteStore>()(
  immer<RouteStore>((set, get) => ({
    authRoutes: [],
    isInitAuthRoute: false,

    getHomeRoute: () => {
      const { authRoutes } = get();
      const home = authRoutes.find((item) => item.meta?.name === PAGE.HOME_NAME);
      return (home?.children as AppRouteObject[])?.find(
        (item) => item.meta?.affix || item.meta?.name === PAGE.HOME_NAME_REDIRECT
      );
    },

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

  const state = useRouteStore((state) => state);

  const { setInitAuthRoute, initAuthRoute, ...actions } = useRouteStore((state) => state.actions);

  const [routeError, setRouteError] = useState<string | null>(null);

  const filterRoutes = useCallback((routes: AppRouteObject[]) => {
    const filterFunc = (routes: AppRouteObject[]): AppRouteObject[] => {
      return routes
        .filter((route) => hasPermission((route.meta?.roles as RoleType[]) || []))
        .map((route) => {
          const newRoute = { ...route };

          if (newRoute.children && newRoute.children.length) {
            newRoute.children = filterFunc(newRoute.children);
          }

          return newRoute;
        });
    };

    return filterFunc(routes).sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0));
  }, []);

  //获取路由配置
  const fetchRoutes = useCallback(
    async (user?: User | null) => {
      setInitAuthRoute(true);
      setRouteError(null);

      try {
        if (isDynamicRoute) {
          const userInfo = user || getUserInfo();

          if (!userInfo || !userInfo.id) {
            logout();
            return;
          }

          const { data } = await getUserRoutes({
            id: userInfo.id,
          });
          const dynamicRoutes = transformRouteConfig(data || []);

          initAuthRoute(filterRoutes(dynamicRoutes));
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
