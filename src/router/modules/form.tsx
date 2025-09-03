import { createRef } from "react";
import { Outlet } from "react-router";
import FormBasic from "@/routes/form/basic";
import FormDetail from "@/routes/form/detail";
import FormStep from "@/routes/form/step";
import type { AppRouteObject } from "@/types";

export const formRoutes: AppRouteObject[] = [
  {
    path: "/form",
    element: <Outlet />,
    nodeRef: createRef(),
    meta: {
      title: "表单页面",
      icon: "solar:document-add-broken",
      sort: 3,
    },
    children: [
      {
        path: "/form/basic",
        element: <FormBasic />,
        nodeRef: createRef(),
        meta: {
          title: "基础表单",
        },
      },
      {
        path: "/form/step",
        element: <FormStep />,
        nodeRef: createRef(),
        meta: {
          title: "分步表单",
        },
      },
      {
        path: "/form/detail",
        element: <FormDetail />,
        nodeRef: createRef(),
        meta: {
          title: "表单详情",
        },
      },
    ],
  },
];
