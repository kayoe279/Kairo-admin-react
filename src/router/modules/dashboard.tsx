import { createRef } from "react";
import { Outlet } from "react-router";
import DashboardConsole from "@/routes/dashboard/console";
import DashboardWorkplace from "@/routes/dashboard/workplace";
import type { AppRouteObject } from "@/types";

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: "/dashboard",
    element: <Outlet />,
    nodeRef: createRef(),
    meta: {
      title: "工作台",
      icon: "solar:emoji-funny-square-broken",
      sort: 0,
    },
    children: [
      {
        path: "/dashboard/workplace",
        element: <DashboardWorkplace />,
        nodeRef: createRef(),
        meta: {
          title: "首页",
          keepAlive: true,
          affix: true,
        },
      },
      {
        path: "/dashboard/console",
        element: <DashboardConsole />,
        nodeRef: createRef(),
        meta: {
          title: "主控台",
          keepAlive: true,
        },
      },
    ],
  },
];
