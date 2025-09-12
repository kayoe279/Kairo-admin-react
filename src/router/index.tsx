import { useEffect } from "react";
import { Navigate, useRoutes } from "react-router";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AppRouteGuard } from "@/router/AppRouteGuard";
import Login from "@/routes/auth/login";
import Exception403 from "@/routes/exception/403";
import Exception404 from "@/routes/exception/404";
import { useAuthRouteActions, useAuthRouteState } from "@/store";
import type { AppRouteObject } from "@/types";
// 所有模块路由
import { aboutRoutes } from "./modules/about";
import { businessRoutes } from "./modules/business";
import { dashboardRoutes } from "./modules/dashboard";
import { examplesRoutes } from "./modules/examples";
import { exceptionRoutes } from "./modules/exception";
import { permissionsRoutes } from "./modules/permissions";
import { settingRoutes } from "./modules/setting";
import { systemRoutes } from "./modules/system";

// 组合所有路由
export const menuRoutes = [
  ...dashboardRoutes,
  ...systemRoutes,
  ...businessRoutes,
  ...examplesRoutes,
  ...permissionsRoutes,
  ...settingRoutes,
  ...aboutRoutes,
  ...exceptionRoutes,
].sort((a, b) => {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
});

export const rootRoutes: AppRouteObject[] = [
  // 登录页面 - 公开路由
  {
    path: "/auth/login",
    element: <Login />,
    meta: { ignoreAuth: true },
  },
  // 主应用布局 - 需要登录
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard/workplace" replace />,
      },
      // 导入所有模块路由
      ...menuRoutes,
      // 403 权限不足页面 - 公开路由
      {
        path: "/403",
        element: <Exception403 />,
      },
      // 404 fallback - 公开路由
      {
        path: "*",
        element: <Exception404 />,
      },
    ],
  },
];

export const Router = () => {
  const { authRoutes } = useAuthRouteState();
  const { initAuthRoute } = useAuthRouteActions();
  // const { routes } = useAsyncRoutes(initAuthRoute);
  const routes = useRoutes(rootRoutes);

  // useEffect(() => {
  //   initAuthRoute();
  // }, [initAuthRoute]);

  console.log("%c [ routes ]-81", "font-size:13px; background:pink; color:#bf2c9f;", routes);
  return <AppRouteGuard>{routes}</AppRouteGuard>;
};
