import { Navigate, useRoutes } from "react-router";
import type { RouteObject as BaseRouteObject } from "react-router";
import { AdminLayout } from "@/layouts/AdminLayout";
import Login from "@/routes/auth/login";
import Exception404 from "@/routes/exception/404";
// 导入路由类型定义
import type { AppRouteObject, MetaProps } from "@/types";
// 导入路由模块
import { aboutRoutes } from "./modules/about";
import { compRoutes } from "./modules/comp";
import { dashboardRoutes } from "./modules/dashboard";
import { exceptionRoutes } from "./modules/exception";
import { formRoutes } from "./modules/form";
import { listRoutes } from "./modules/list";
import { permissionsRoutes } from "./modules/permissions";
import { settingRoutes } from "./modules/setting";
import { testRoutes } from "./modules/test";

export type { MetaProps, AppRouteObject };

// 组合所有路由
const allModuleRoutes: AppRouteObject[] = [
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

export const rootRouter: BaseRouteObject[] = [
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

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
