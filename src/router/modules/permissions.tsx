import { createRef } from "react";
import { Outlet } from "react-router";
import PermissionsExample from "@/routes/permissions/example";
import type { AppRouteObject } from "@/types";

export const permissionsRoutes: AppRouteObject[] = [
  {
    path: "/permissions",
    element: <Outlet />,
    nodeRef: createRef(),
    meta: {
      title: "权限",
      icon: "solar:shield-user-broken",
      sort: 5,
    },
    children: [
      {
        path: "/permissions/example",
        element: <PermissionsExample />,
        nodeRef: createRef(),
        meta: {
          title: "权限展示",
        },
      },
    ],
  },
];
