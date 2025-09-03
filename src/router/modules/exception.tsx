import { createRef } from "react";
import { Outlet } from "react-router";
import Exception403 from "@/routes/exception/403";
import Exception404 from "@/routes/exception/404";
import type { AppRouteObject } from "@/types";

export const exceptionRoutes: AppRouteObject[] = [
  {
    path: "/exception",
    element: <Outlet />,
    nodeRef: createRef(),
    meta: {
      title: "异常页面",
      icon: "solar:confounded-circle-broken",
      sort: 2,
    },
    children: [
      {
        path: "/exception/403",
        element: <Exception403 />,
        nodeRef: createRef(),
        meta: {
          title: "403",
        },
      },
      {
        path: "/exception/404",
        element: <Exception404 />,
        nodeRef: createRef(),
        meta: {
          title: "404",
        },
      },
    ],
  },
];
