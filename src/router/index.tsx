import { Navigate, useRoutes } from "react-router";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AppRouteGuard } from "@/router/AppRouteGuard";
import Login from "@/routes/auth/login";
import Exception403 from "@/routes/exception/403";
import Exception404 from "@/routes/exception/404";
import type { AppRouteObject } from "@/types";
// 所有模块路由
import { aboutRoutes } from "./modules/about";
import { compRoutes } from "./modules/comp";
import { dashboardRoutes } from "./modules/dashboard";
import { exceptionRoutes } from "./modules/exception";
import { formRoutes } from "./modules/form";
import { listRoutes } from "./modules/list";
import { permissionsRoutes } from "./modules/permissions";
import { settingRoutes } from "./modules/setting";
import { testRoutes } from "./modules/test";

// 组合所有路由
export const menuRoutes = [
  ...dashboardRoutes,
  ...compRoutes,
  ...formRoutes,
  ...listRoutes,
  ...exceptionRoutes,
  ...permissionsRoutes,
  ...settingRoutes,
  ...aboutRoutes,
  ...testRoutes,
];

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
        meta: { ignoreAuth: true },
      },
      // 404 fallback - 公开路由
      {
        path: "*",
        element: <Exception404 />,
        meta: { ignoreAuth: true },
      },
    ],
  },
];

export const Router = () => {
  const routes = useRoutes(rootRoutes);
  return <AppRouteGuard>{routes}</AppRouteGuard>;
};
