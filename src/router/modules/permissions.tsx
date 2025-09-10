import { Outlet } from "react-router";
import PermissionsExample from "@/routes/permissions/example";
import type { AppRouteObject } from "@/types";

export const permissionsRoutes: AppRouteObject[] = [
  {
    path: "/permissions",
    element: <Outlet />,
    meta: {
      name: "permissions",
      icon: "solar:shield-user-broken",
      sort: 5,
    },
    children: [
      {
        path: "/permissions/example",
        element: <PermissionsExample />,
        meta: {
          name: "permissionsExample",
        },
      },
    ],
  },
];
