import { Outlet } from "react-router";
import CompFormBasic from "@/routes/comp/form/basic";
import CompFormUseForm from "@/routes/comp/form/use-form";
import CompTableBasic from "@/routes/comp/table/basic";
import CompTableEditCell from "@/routes/comp/table/edit-cell";
import CompTableEditRow from "@/routes/comp/table/edit-row";
import CompUpload from "@/routes/comp/upload";
import type { AppRouteObject } from "@/types";

export const compRoutes: AppRouteObject[] = [
  {
    path: "/comp",
    element: <Outlet />,
    meta: {
      name: "comp",
      icon: "proicons:component",
      sort: 6,
    },
    children: [
      {
        path: "/comp/table",
        element: <Outlet />,
        name: "compTable",
        meta: {
          name: "compTable",
        },
        children: [
          {
            path: "/comp/table/basic",
            element: <CompTableBasic />,
            meta: {
              name: "compTableBasic",
            },
          },
          {
            path: "/comp/table/edit-cell",
            element: <CompTableEditCell />,
            meta: {
              name: "compTableEditCell",
            },
          },
          {
            path: "/comp/table/edit-row",
            element: <CompTableEditRow />,
            meta: {
              name: "compTableEditRow",
            },
          },
        ],
      },
      {
        path: "/comp/form",
        element: <Outlet />,
        meta: {
          name: "compForm",
        },
        children: [
          {
            path: "/comp/form/basic",
            element: <CompFormBasic />,
            meta: {
              name: "compFormBasic",
            },
          },
          {
            path: "/comp/form/use-form",
            element: <CompFormUseForm />,
            meta: {
              name: "compFormUseForm",
            },
          },
        ],
      },
      {
        path: "/comp/upload",
        element: <CompUpload />,
        meta: {
          name: "compUpload",
        },
      },
    ],
  },
];
