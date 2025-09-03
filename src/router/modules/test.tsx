import { createRef } from "react";
import TestIcons from "@/routes/test-icons";
import type { AppRouteObject } from "@/types";

export const testRoutes: AppRouteObject[] = [
  {
    path: "/test/icons",
    element: <TestIcons />,
    nodeRef: createRef(),
    meta: {
      title: "图标测试",
      icon: "solar:stars-minimalistic-broken",
      sort: 99,
    },
  },
];
