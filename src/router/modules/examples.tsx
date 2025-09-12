import { Outlet } from "react-router";
import ChartExample from "@/routes/examples/chart";
import FormAdvancedExample from "@/routes/examples/form/advanced";
import FormBasicExample from "@/routes/examples/form/basic";
import FormStepExample from "@/routes/examples/form/step";
import FormValidationExample from "@/routes/examples/form/validation";
import TableAdvancedExample from "@/routes/examples/table/advanced";
import TableBasicExample from "@/routes/examples/table/basic";
import TableEditableExample from "@/routes/examples/table/editable";
import TableVirtualExample from "@/routes/examples/table/virtual";
import UploadExample from "@/routes/examples/upload";
import type { AppRouteObject } from "@/types";

export const examplesRoutes: AppRouteObject[] = [
  {
    path: "/examples",
    element: <Outlet />,
    meta: {
      name: "examples",
      icon: "solar:code-square-broken",
      sort: 1,
    },
    children: [
      // 表单示例 - 三级路由
      {
        path: "/examples/form",
        element: <Outlet />,
        meta: {
          name: "examplesForm",
        },
        children: [
          {
            path: "/examples/form/basic",
            element: <FormBasicExample />,
            meta: {
              name: "examplesFormBasic",
            },
          },
          {
            path: "/examples/form/advanced",
            element: <FormAdvancedExample />,
            meta: {
              name: "examplesFormAdvanced",
            },
          },
          {
            path: "/examples/form/step",
            element: <FormStepExample />,
            meta: {
              name: "examplesFormStep",
            },
          },
          {
            path: "/examples/form/validation",
            element: <FormValidationExample />,
            meta: {
              name: "examplesFormValidation",
            },
          },
        ],
      },
      // 表格示例 - 三级路由
      {
        path: "/examples/table",
        element: <Outlet />,
        meta: {
          name: "examplesTable",
        },
        children: [
          {
            path: "/examples/table/basic",
            element: <TableBasicExample />,
            meta: {
              name: "examplesTableBasic",
            },
          },
          {
            path: "/examples/table/advanced",
            element: <TableAdvancedExample />,
            meta: {
              name: "examplesTableAdvanced",
            },
          },
          {
            path: "/examples/table/editable",
            element: <TableEditableExample />,
            meta: {
              name: "examplesTableEditable",
            },
          },
          {
            path: "/examples/table/virtual",
            element: <TableVirtualExample />,
            meta: {
              name: "examplesTableVirtual",
            },
          },
        ],
      },
      // 其他组件示例
      {
        path: "/examples/chart",
        element: <ChartExample />,
        meta: {
          name: "examplesChart",
        },
      },
      {
        path: "/examples/upload",
        element: <UploadExample />,
        meta: {
          name: "examplesUpload",
        },
      },
    ],
  },
];
