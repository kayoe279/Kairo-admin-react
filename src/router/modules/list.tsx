import { Outlet } from "react-router";
import ListBasic from "@/routes/list/basic";
import ListInfo from "@/routes/list/info.$id";
import type { AppRouteObject } from "@/types";

export const listRoutes: AppRouteObject[] = [
  {
    path: "/list",
    element: <Outlet />,
    meta: {
      name: "list",
      icon: "solar:checklist-minimalistic-outline",
      sort: 1,
    },
    children: [
      {
        path: "/list/basic",
        element: <ListBasic />,
        meta: {
          name: "basicList",
        },
      },
      {
        path: "/list/info/:id",
        element: <ListInfo />,
        meta: {
          name: "listBasicInfo",
          hidden: true,
        },
      },
    ],
  },
];
