import { Outlet } from "react-router";
import DashboardAnalysis from "@/routes/dashboard/analysis";
import DashboardMonitor from "@/routes/dashboard/monitor";
import DashboardReport from "@/routes/dashboard/report";
import DashboardWorkplace from "@/routes/dashboard/workplace";
import type { AppRouteObject } from "@/types";

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: "/dashboard",
    element: <Outlet />,
    meta: {
      name: "dashboard",
      icon: "solar:chart-square-broken",
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
        path: "/dashboard/analysis",
        element: <DashboardAnalysis />,
        meta: {
          name: "dashboardAnalysis",
          keepAlive: true,
        },
      },
      {
        path: "/dashboard/monitor",
        element: <DashboardMonitor />,
        meta: {
          name: "dashboardMonitor",
        },
      },
      {
        path: "/dashboard/report",
        element: <DashboardReport />,
        meta: {
          name: "dashboardReport",
        },
      },
    ],
  },
];
