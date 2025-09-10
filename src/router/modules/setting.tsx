import { Outlet } from "react-router";
import SettingAccount from "@/routes/setting/account";
import type { AppRouteObject } from "@/types";

export const settingRoutes: AppRouteObject[] = [
  {
    path: "/setting",
    element: <Outlet />,
    meta: {
      name: "setting",
      icon: "solar:settings-outline",
      sort: 8,
    },
    children: [
      {
        path: "/setting/account",
        element: <SettingAccount />,
        meta: {
          name: "settingAccount",
        },
      },
    ],
  },
];
