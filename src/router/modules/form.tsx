import { Outlet } from "react-router";
import FormBasic from "@/routes/form/basic";
import FormDetail from "@/routes/form/detail";
import FormStep from "@/routes/form/step";
import type { AppRouteObject } from "@/types";

export const formRoutes: AppRouteObject[] = [
  {
    path: "/form",
    element: <Outlet />,
    meta: {
      name: "form",
      icon: "solar:document-add-broken",
      sort: 3,
    },
    children: [
      {
        path: "/form/basic",
        element: <FormBasic />,
        meta: {
          name: "formBasicForm",
        },
      },
      {
        path: "/form/step",
        element: <FormStep />,
        meta: {
          name: "formStepForm",
        },
      },
      {
        path: "/form/detail",
        element: <FormDetail />,
        meta: {
          name: "formDetail",
        },
      },
    ],
  },
];
