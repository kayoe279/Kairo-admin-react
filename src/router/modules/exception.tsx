import { Outlet } from "react-router";
import Exception403 from "@/routes/exception/403";
import Exception404 from "@/routes/exception/404";
import type { AppRouteObject } from "@/types";

export const exceptionRoutes: AppRouteObject[] = [
  {
    path: "/exception",
    element: <Outlet />,
    meta: {
      name: "exception",
      icon: "solar:confounded-circle-broken",
      sort: 2,
    },
    children: [
      {
        path: "/exception/403",
        element: <Exception403 />,
        meta: {
          name: "exception403",
        },
      },
      {
        path: "/exception/404",
        element: <Exception404 />,
        meta: {
          name: "exception404",
        },
      },
    ],
  },
];
