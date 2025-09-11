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
      requireAuth: true,
      roles: ["admin", "user"], // 需要 admin 或 user 角色
    },
    children: [
      {
        path: "/permissions/example",
        element: <PermissionsExample />,
        meta: {
          name: "permissionsExample",
          requireAuth: true,
          roles: ["admin"], // 只有 admin 可以访问
        },
      },
    ],
  },
];
