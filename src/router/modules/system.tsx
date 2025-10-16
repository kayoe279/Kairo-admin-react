import { Outlet } from "react-router";
import SystemDeptDetail from "@/routes/system/dept/detail";
import SystemDeptList from "@/routes/system/dept/list";
import SystemMenuDetail from "@/routes/system/menu/detail";
import SystemMenuList from "@/routes/system/menu/list";
import SystemRoleDetail from "@/routes/system/role/detail";
import SystemRoleList from "@/routes/system/role/list";
import SystemRolePermissions from "@/routes/system/role/permissions";
import SystemUserDetail from "@/routes/system/user/detail";
import SystemUserList from "@/routes/system/user/list";
import type { AppRouteObject } from "@/types";

export const systemRoutes: AppRouteObject[] = [
  {
    path: "/system",
    element: <Outlet />,
    meta: {
      name: "system",
      icon: "solar:settings-minimalistic-broken",
      sort: 7
    },
    children: [
      // 用户管理
      {
        path: "/system/user",
        element: <Outlet />,
        meta: {
          name: "systemUser"
        },
        children: [
          {
            path: "/system/user/list",
            element: <SystemUserList />,
            meta: {
              name: "systemUserList"
            }
          },
          {
            path: "/system/user/detail/:id",
            element: <SystemUserDetail />,
            meta: {
              name: "systemUserDetail",
              hidden: true
            }
          }
        ]
      },
      // 角色管理 - 二级路由
      {
        path: "/system/role",
        element: <Outlet />,
        meta: {
          name: "systemRole"
        },
        children: [
          {
            path: "/system/role/list",
            element: <SystemRoleList />,
            meta: {
              name: "systemRoleList"
            }
          },
          {
            path: "/system/role/detail/:id",
            element: <SystemRoleDetail />,
            meta: {
              name: "systemRoleDetail",
              hidden: true
            }
          },
          {
            path: "/system/role/permissions/:id",
            element: <SystemRolePermissions />,
            meta: {
              name: "systemRolePermissions",
              hidden: true
            }
          }
        ]
      },
      // 菜单管理
      {
        path: "/system/menu",
        element: <Outlet />,
        meta: {
          name: "systemMenu"
        },
        children: [
          {
            path: "/system/menu/list",
            element: <SystemMenuList />,
            meta: {
              name: "systemMenuList"
            }
          },
          {
            path: "/system/menu/detail/:id?",
            element: <SystemMenuDetail />,
            meta: {
              name: "systemMenuDetail",
              hidden: true
            }
          }
        ]
      },
      // 部门管理
      {
        path: "/system/dept",
        element: <Outlet />,
        meta: {
          name: "systemDept"
        },
        children: [
          {
            path: "/system/dept/list",
            element: <SystemDeptList />,
            meta: {
              name: "systemDeptList"
            }
          },
          {
            path: "/system/dept/detail/:id?",
            element: <SystemDeptDetail />,
            meta: {
              name: "systemDeptDetail",
              hidden: true
            }
          }
        ]
      }
    ]
  }
];
