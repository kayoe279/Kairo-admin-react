import { createRef } from "react";
import About from "@/routes/about/index";
import type { AppRouteObject } from "@/types";

export const aboutRoutes: AppRouteObject[] = [
  {
    path: "/about",
    element: <About />,
    nodeRef: createRef(),
    meta: {
      title: "关于项目",
      icon: "solar:info-circle-broken",
      sort: 10,
      isRoot: true,
    },
  },
];
