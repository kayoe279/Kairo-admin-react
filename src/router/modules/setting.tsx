import { createRef } from "react";
import { Outlet } from "react-router";
import SettingAccount from "@/routes/setting/account";
import type { AppRouteObject } from "@/types";

export const settingRoutes: AppRouteObject[] = [
  {
    path: "/setting",
    element: <Outlet />,
    nodeRef: createRef(),
    meta: {
      title: "设置页面",
      icon: "solar:settings-outline",
      sort: 8,
    },
    children: [
      {
        path: "/setting/account",
        element: <SettingAccount />,
        nodeRef: createRef(),
        meta: {
          title: "个人设置",
        },
      },
    ],
  },
];
