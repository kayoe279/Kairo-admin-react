import { createRef } from "react";
import { Navigate, useRoutes } from "react-router";
import { AdminLayout } from "@/layouts/AdminLayout";
// 导入所有页面组件
import About from "@/routes/about/index";
import Login from "@/routes/auth/login";
import CompFormBasic from "@/routes/comp/form/basic";
import CompFormUseForm from "@/routes/comp/form/use-form";
import CompTableBasic from "@/routes/comp/table/basic";
import CompTableEditCell from "@/routes/comp/table/edit-cell";
import CompTableEditRow from "@/routes/comp/table/edit-row";
import CompUpload from "@/routes/comp/upload";
import DashboardConsole from "@/routes/dashboard/console";
import DashboardWorkplace from "@/routes/dashboard/workplace";
import Exception403 from "@/routes/exception/403";
import Exception404 from "@/routes/exception/404";
import FormBasic from "@/routes/form/basic";
import FormDetail from "@/routes/form/detail";
import FormStep from "@/routes/form/step";
import ListBasic from "@/routes/list/basic";
import ListInfo from "@/routes/list/info.$id";
import PermissionsExample from "@/routes/permissions/example";
import SettingAccount from "@/routes/setting/account";
import TestIcons from "@/routes/test-icons";

export interface MetaProps {
  menu?: string;
}

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  meta?: MetaProps;
  isLink?: string;
}

export const rootRouter = [
  // 登录页面 - 不需要布局
  {
    path: "/auth/login",
    element: <Login />,
    nodeRef: createRef(),
  },
  // 主应用布局
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard/console" replace />,
        nodeRef: createRef(),
      },
      {
        path: "/about",
        element: <About />,
        nodeRef: createRef(),
        meta: {
          menu: "about",
        },
      },
      // Dashboard 路由
      {
        path: "/dashboard/console",
        element: <DashboardConsole />,
        nodeRef: createRef(),
        meta: {
          menu: "dashboard-console",
        },
      },
      {
        path: "/dashboard/workplace",
        element: <DashboardWorkplace />,
        nodeRef: createRef(),
        meta: {
          menu: "dashboard-workplace",
        },
      },
      // Component 路由
      {
        path: "/comp/form/basic",
        element: <CompFormBasic />,
        nodeRef: createRef(),
        meta: {
          menu: "comp-form-basic",
        },
      },
      {
        path: "/comp/form/use-form",
        element: <CompFormUseForm />,
        nodeRef: createRef(),
        meta: {
          menu: "comp-form-use-form",
        },
      },
      {
        path: "/comp/table/basic",
        element: <CompTableBasic />,
        nodeRef: createRef(),
        meta: {
          menu: "comp-table-basic",
        },
      },
      {
        path: "/comp/table/edit-cell",
        element: <CompTableEditCell />,
        nodeRef: createRef(),
        meta: {
          menu: "comp-table-edit-cell",
        },
      },
      {
        path: "/comp/table/edit-row",
        element: <CompTableEditRow />,
        nodeRef: createRef(),
        meta: {
          menu: "comp-table-edit-row",
        },
      },
      {
        path: "/comp/upload",
        element: <CompUpload />,
        nodeRef: createRef(),
        meta: {
          menu: "comp-upload",
        },
      },
      // Form 路由
      {
        path: "/form/basic",
        element: <FormBasic />,
        nodeRef: createRef(),
        meta: {
          menu: "form-basic",
        },
      },
      {
        path: "/form/detail",
        element: <FormDetail />,
        nodeRef: createRef(),
        meta: {
          menu: "form-detail",
        },
      },
      {
        path: "/form/step",
        element: <FormStep />,
        nodeRef: createRef(),
        meta: {
          menu: "form-step",
        },
      },
      // List 路由
      {
        path: "/list/basic",
        element: <ListBasic />,
        nodeRef: createRef(),
        meta: {
          menu: "list-basic",
        },
      },
      {
        path: "/list/info/:id",
        element: <ListInfo />,
        nodeRef: createRef(),
        meta: {
          menu: "list-info",
        },
      },
      // Permissions 路由
      {
        path: "/permissions/example",
        element: <PermissionsExample />,
        nodeRef: createRef(),
        meta: {
          menu: "permissions-example",
        },
      },
      // Setting 路由
      {
        path: "/setting/account",
        element: <SettingAccount />,
        nodeRef: createRef(),
        meta: {
          menu: "setting-account",
        },
      },
      // Exception 路由
      {
        path: "/exception/403",
        element: <Exception403 />,
        nodeRef: createRef(),
        meta: {
          menu: "exception-403",
        },
      },
      {
        path: "/exception/404",
        element: <Exception404 />,
        nodeRef: createRef(),
        meta: {
          menu: "exception-404",
        },
      },
      // Test Pages
      {
        path: "/test/icons",
        element: <TestIcons />,
        nodeRef: createRef(),
        meta: {
          menu: "test-icons",
        },
      },
      // 404 fallback
      {
        path: "*",
        element: <Exception404 />,
        nodeRef: createRef(),
      },
    ],
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
