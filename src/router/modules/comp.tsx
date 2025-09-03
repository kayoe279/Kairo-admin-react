import { createRef } from "react";
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
    nodeRef: createRef(),
    meta: {
      title: "组件示例",
      icon: "proicons:component",
      sort: 6,
    },
    children: [
      {
        path: "/comp/table",
        meta: {
          title: "表格",
        },
        element: <Outlet />,
        children: [
          {
            path: "/comp/table/basic",
            element: <CompTableBasic />,
            nodeRef: createRef(),
            meta: {
              title: "基础表格",
            },
          },
          {
            path: "/comp/table/edit-cell",
            element: <CompTableEditCell />,
            nodeRef: createRef(),
            meta: {
              title: "单元格编辑",
            },
          },
          {
            path: "/comp/table/edit-row",
            element: <CompTableEditRow />,
            nodeRef: createRef(),
            meta: {
              title: "整行编辑",
            },
          },
        ],
      },
      {
        path: "/comp/form",
        meta: {
          title: "表单",
        },
        element: <Outlet />,
        children: [
          {
            path: "/comp/form/basic",
            element: <CompFormBasic />,
            nodeRef: createRef(),
            meta: {
              title: "基础使用",
            },
          },
          {
            path: "/comp/form/use-form",
            element: <CompFormUseForm />,
            nodeRef: createRef(),
            meta: {
              title: "useForm",
            },
          },
        ],
      },
      {
        path: "/comp/upload",
        element: <CompUpload />,
        nodeRef: createRef(),
        meta: {
          title: "上传图片",
        },
      },
    ],
  },
];
