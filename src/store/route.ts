import { message } from "antd";
import cloneDeep from "lodash-es/cloneDeep";
import omit from "lodash-es/omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { $t } from "@/lib";
import { usePermission } from "@/lib/hooks";
import { getUserInfo } from "@/lib/storage";
import { menuRoutes } from "@/router";
import { getUserRoutes } from "@/service/api";
import type { AppRouteObject } from "@/types";
import { useUserStore } from "./user";

interface RouteState {
  authRoutes: AppRouteObject[];
  isInitAuthRoute: boolean;
}

type HasPermission = (accesses: Entity.RoleType[]) => boolean;

interface RouteActions {
  initAuthRoute: (hasPermission: HasPermission) => Promise<void>;
  resetAuthRoute: () => void;
}

type RouteStore = RouteState & { actions: RouteActions };

const userStore = useUserStore.getState();

const filterRoutes = (routes: AppRouteObject[], hasPermission: HasPermission) => {
  return routes.filter((route) => {
    if (route.children?.length) {
      route.children = filterRoutes(route.children, hasPermission);
    }
    return hasPermission((route.meta?.roles as Entity.RoleType[]) || []);
  });
};

export const useRouteStore = create<RouteStore>()(
  persist(
    immer<RouteStore>((set, get, store) => ({
      authRoutes: [],
      isInitAuthRoute: false,

      // Actions
      actions: {
        initAuthRoute: async (hasPermission) => {
          set((state) => {
            state.isInitAuthRoute = true;
          });
          let resultRouter: AppRouteObject[] = [];

          if (import.meta.env.VITE_ROUTE_LOAD_MODE === "dynamic") {
            const userInfo = getUserInfo();
            if (!userInfo || !userInfo.id) {
              userStore.actions.logout();
              return;
            }

            const { data: dynamicRoutes } = await getUserRoutes({
              id: userInfo.id,
            });
            console.log(
              "%c [ dynamicRoutes ]-63",
              "font-size:13px; background:pink; color:#bf2c9f;",
              dynamicRoutes
            );
            // if (dynamicRoutes?.length) {
            //   resultRouter = generateDynamicRoutes(dynamicRoutes);
            // }
          } else {
            resultRouter = cloneDeep(menuRoutes);
          }

          if (!resultRouter.length) {
            message.error($t(`app.getRouteError`));
            return;
          }

          // 路由权限过滤
          resultRouter = filterRoutes(resultRouter, hasPermission);

          //   resultRouter.forEach((item) => {
          //     router.addRoute(item);
          //   });

          set((state) => {
            state.authRoutes = resultRouter;
            state.isInitAuthRoute = true;
          });
        },
        resetAuthRoute: () => {
          set((state) => {
            state.isInitAuthRoute = false;
            state.authRoutes = [];
          });
        },
      },
    })),
    {
      name: "auth-route-store",
      partialize: (state) => omit(state, ["actions"]),
    }
  )
);

// Selectors Hooks
export const useAuthRouteState = () => useRouteStore((state) => state);
export const useAuthRouteActions = () => {
  const actions = useRouteStore((state) => state.actions);
  const { hasPermission } = usePermission();

  return {
    ...actions,
    initAuthRoute: () => actions.initAuthRoute(hasPermission),
  };
};
