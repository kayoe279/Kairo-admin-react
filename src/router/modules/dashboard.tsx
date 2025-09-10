import { Outlet } from "react-router";
import DashboardConsole from "@/routes/dashboard/console";
import DashboardWorkplace from "@/routes/dashboard/workplace";
import type { AppRouteObject } from "@/types";

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: "/dashboard",
    element: <Outlet />,
    meta: {
      name: "dashboard",
      icon: "solar:emoji-funny-square-broken",
      sort: 0,
    },
    children: [
      {
        path: "/dashboard/workplace",
        element: <DashboardWorkplace />,
        meta: {
          name: "dashboardWorkplace",
          keepAlive: true,
          affix: true,
        },
      },
      {
        path: "/dashboard/console",
        element: <DashboardConsole />,
        meta: {
          name: "dashboardConsole",
          keepAlive: true,
        },
      },
    ],
  },
];
