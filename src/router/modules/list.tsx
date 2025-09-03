import { createRef } from "react";
import { Outlet } from "react-router";
import ListBasic from "@/routes/list/basic";
import ListInfo from "@/routes/list/info.$id";
import type { AppRouteObject } from "@/types";

export const listRoutes: AppRouteObject[] = [
  {
    path: "/list",
    element: <Outlet />,
    nodeRef: createRef(),
    meta: {
      title: "列表页面",
      icon: "solar:checklist-minimalistic-outline",
      sort: 1,
    },
    children: [
      {
        path: "/list/basic",
        element: <ListBasic />,
        nodeRef: createRef(),
        meta: {
          title: "基础列表",
        },
      },
      {
        path: "/list/info/:id",
        element: <ListInfo />,
        nodeRef: createRef(),
        meta: {
          title: "基础详情",
          hidden: true,
        },
      },
    ],
  },
];
