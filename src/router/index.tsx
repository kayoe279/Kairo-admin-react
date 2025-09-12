import { Result } from "antd";
import { useTranslation } from "react-i18next";
import { Navigate, useRoutes } from "react-router";
import { Loading } from "@/components/ui";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AppRouteGuard } from "@/router/AppRouteGuard";
import Login from "@/routes/auth/login";
import Exception403 from "@/routes/exception/403";
import Exception404 from "@/routes/exception/404";
import { useAuthRoute } from "@/store";
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

export * from "./componentLoader";

// 组合所有静态路由
export const staticRoutes = [
  ...dashboardRoutes,
  ...systemRoutes,
  ...businessRoutes,
  ...examplesRoutes,
  ...permissionsRoutes,
  ...settingRoutes,
  ...aboutRoutes,
  ...exceptionRoutes,
];

const getRootRoutes = (routes: AppRouteObject[]): AppRouteObject[] => {
  return [
    // 登录页面 - 公开路由
    {
      path: "/auth/login",
      element: <Login />,
      meta: { ignoreAuth: true },
    },
    // 主应用布局 - 需要登录
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard/workplace" replace />,
        },
        ...routes,
        {
          path: "/403",
          element: <Exception403 />,
        },
        {
          path: "*",
          element: <Exception404 />,
        },
      ],
    },
  ];
};

export const Router = () => {
  const { t } = useTranslation();
  const { routeError, isInitAuthRoute, authRoutes } = useAuthRoute({ immediate: true });

  const rootRoutes = getRootRoutes(authRoutes);

  const routes = useRoutes(rootRoutes);

  if (isInitAuthRoute) {
    return <Loading />;
  }

  if (routeError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Result status="500" title="500" subTitle={t("app.getRouteError")} />
      </div>
    );
  }

  return <AppRouteGuard>{routes}</AppRouteGuard>;
};
