import { Navigate, useRoutes } from "react-router";
import type { RouteObject as BaseRouteObject } from "react-router";
import { AdminLayout } from "@/layouts/AdminLayout";
import Login from "@/routes/auth/login";
import Exception404 from "@/routes/exception/404";
import type { AppRouteObject } from "@/types";
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
export const allModuleRoutes: AppRouteObject[] = [
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

export const rootRoutes: BaseRouteObject[] = [
  // 登录页面 - 不需要布局
  {
    path: "/auth/login",
    element: <Login />,
  },
  // 主应用布局
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard/workplace" replace />,
      },
      // 导入所有模块路由
      ...(allModuleRoutes as BaseRouteObject[]),
      // 404 fallback
      {
        path: "*",
        element: <Exception404 />,
      },
    ],
  },
];

// 导出用于菜单生成的路由数据
export const menuRoutes = allModuleRoutes;

export const Router = () => {
  const routes = useRoutes(rootRoutes);
  return routes;
};
