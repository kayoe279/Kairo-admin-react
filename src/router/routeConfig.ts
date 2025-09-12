import type { DynamicRouteConfig } from "@/types";

/**
 * 完整的路由配置
 * 这个配置可以直接从 API 返回
 */
export const routeConfig: DynamicRouteConfig[] = [
  // 仪表盘模块
  {
    path: "/dashboard",
    meta: {
      name: "dashboard",
      icon: "solar:chart-square-broken",
      sort: 0,
    },
    children: [
      {
        path: "/dashboard/workplace",
        component: "dashboard/workplace",
        meta: {
          name: "dashboardWorkplace",
          affix: true,
        },
      },
      {
        path: "/dashboard/analysis",
        component: "dashboard/analysis",
        meta: {
          name: "dashboardAnalysis",
        },
      },
      {
        path: "/dashboard/monitor",
        component: "dashboard/monitor",
        meta: {
          name: "dashboardMonitor",
        },
      },
    ],
  },

  // 组件示例模块
  {
    path: "/examples",
    meta: {
      name: "examples",
      icon: "solar:code-square-broken",
      sort: 1,
    },
    children: [
      {
        path: "/examples/form",
        meta: {
          name: "examplesForm",
        },
        children: [
          {
            path: "/examples/form/basic",
            component: "examples/form/basic",
            meta: {
              name: "examplesFormBasic",
            },
          },
          {
            path: "/examples/form/advanced",
            component: "examples/form/advanced",
            meta: {
              name: "examplesFormAdvanced",
            },
          },
          {
            path: "/examples/form/step",
            component: "examples/form/step",
            meta: {
              name: "examplesFormStep",
            },
          },
          {
            path: "/examples/form/validation",
            component: "examples/form/validation",
            meta: {
              name: "examplesFormValidation",
            },
          },
        ],
      },
      {
        path: "/examples/table",
        meta: {
          name: "examplesTable",
        },
        children: [
          {
            path: "/examples/table/basic",
            component: "examples/table/basic",
            meta: {
              name: "examplesTableBasic",
            },
          },
          {
            path: "/examples/table/advanced",
            component: "examples/table/advanced",
            meta: {
              name: "examplesTableAdvanced",
            },
          },
          {
            path: "/examples/table/editable",
            component: "examples/table/editable",
            meta: {
              name: "examplesTableEditable",
            },
          },
          {
            path: "/examples/table/virtual",
            component: "examples/table/virtual",
            meta: {
              name: "examplesTableVirtual",
            },
          },
        ],
      },
      {
        path: "/examples/chart",
        component: "examples/chart",
        meta: {
          name: "examplesChart",
        },
      },
      {
        path: "/examples/upload",
        component: "examples/upload",
        meta: {
          name: "examplesUpload",
        },
      },
    ],
  },

  // 业务管理模块
  {
    path: "/business",
    meta: {
      name: "business",
      icon: "solar:shop-broken",
      sort: 2,
    },
    children: [
      {
        path: "/business/product",
        meta: {
          name: "businessProduct",
        },
        children: [
          {
            path: "/business/product/list",
            component: "business/product/list",
            meta: {
              name: "businessProductList",
            },
          },
          {
            path: "/business/product/detail/:id?",
            component: "business/product/detail",
            meta: {
              name: "businessProductDetail",
              hidden: true,
            },
          },
          {
            path: "/business/product/category",
            meta: {
              name: "businessProductCategory",
            },
            children: [
              {
                path: "/business/product/category/list",
                component: "business/product/category/list",
                meta: {
                  name: "businessProductCategoryList",
                },
              },
              {
                path: "/business/product/category/detail/:id?",
                component: "business/product/category/detail",
                meta: {
                  name: "businessProductCategoryDetail",
                  hidden: true,
                },
              },
            ],
          },
          {
            path: "/business/product/brand",
            component: "business/product/brand",
            meta: {
              name: "businessProductBrand",
            },
          },
          {
            path: "/business/product/inventory",
            component: "business/product/inventory",
            meta: {
              name: "businessProductInventory",
            },
          },
        ],
      },
      {
        path: "/business/order",
        meta: {
          name: "businessOrder",
        },
        children: [
          {
            path: "/business/order/list",
            component: "business/order/list",
            meta: {
              name: "businessOrderList",
            },
          },
          {
            path: "/business/order/detail/:id",
            component: "business/order/detail",
            meta: {
              name: "businessOrderDetail",
              hidden: true,
            },
          },
          {
            path: "/business/order/refund",
            component: "business/order/refund",
            meta: {
              name: "businessOrderRefund",
            },
          },
          {
            path: "/business/order/shipping",
            component: "business/order/shipping",
            meta: {
              name: "businessOrderShipping",
            },
          },
        ],
      },
      {
        path: "/business/customer",
        meta: {
          name: "businessCustomer",
        },
        children: [
          {
            path: "/business/customer/list",
            component: "business/customer/list",
            meta: {
              name: "businessCustomerList",
            },
          },
          {
            path: "/business/customer/detail/:id",
            component: "business/customer/detail",
            meta: {
              name: "businessCustomerDetail",
              hidden: true,
            },
          },
          {
            path: "/business/customer/group",
            component: "business/customer/group",
            meta: {
              name: "businessCustomerGroup",
            },
          },
          {
            path: "/business/customer/service",
            component: "business/customer/service",
            meta: {
              name: "businessCustomerService",
            },
          },
        ],
      },
    ],
  },

  // 权限管理模块
  {
    path: "/permissions",
    meta: {
      name: "permissions",
      icon: "solar:shield-user-broken",
      sort: 5,
    },
    children: [
      {
        path: "/permissions/example",
        component: "permissions/example",
        meta: {
          name: "permissionsExample",
        },
      },
      {
        path: "/permissions/super",
        component: "permissions/super",
        meta: {
          name: "permissionsSuper",
          roles: ["super"],
        },
      },
    ],
  },

  // 系统管理模块
  {
    path: "/system",
    meta: {
      name: "system",
      icon: "solar:settings-minimalistic-broken",
      sort: 7,
    },
    children: [
      {
        path: "/system/user",
        meta: {
          name: "systemUser",
        },
        children: [
          {
            path: "/system/user/list",
            component: "system/user/list",
            meta: {
              name: "systemUserList",
            },
          },
          {
            path: "/system/user/detail/:id",
            component: "system/user/detail",
            meta: {
              name: "systemUserDetail",
              hidden: true,
            },
          },
        ],
      },
      {
        path: "/system/role",
        meta: {
          name: "systemRole",
        },
        children: [
          {
            path: "/system/role/list",
            component: "system/role/list",
            meta: {
              name: "systemRoleList",
            },
          },
          {
            path: "/system/role/detail/:id",
            component: "system/role/detail",
            meta: {
              name: "systemRoleDetail",
              hidden: true,
            },
          },
          {
            path: "/system/role/permissions/:id",
            component: "system/role/permissions",
            meta: {
              name: "systemRolePermissions",
              hidden: true,
            },
          },
        ],
      },
      {
        path: "/system/menu",
        meta: {
          name: "systemMenu",
        },
        children: [
          {
            path: "/system/menu/list",
            component: "system/menu/list",
            meta: {
              name: "systemMenuList",
            },
          },
          {
            path: "/system/menu/detail/:id?",
            component: "system/menu/detail",
            meta: {
              name: "systemMenuDetail",
              hidden: true,
            },
          },
        ],
      },
      {
        path: "/system/dept",
        meta: {
          name: "systemDept",
        },
        children: [
          {
            path: "/system/dept/list",
            component: "system/dept/list",
            meta: {
              name: "systemDeptList",
            },
          },
          {
            path: "/system/dept/detail/:id?",
            component: "system/dept/detail",
            meta: {
              name: "systemDeptDetail",
              hidden: true,
            },
          },
        ],
      },
    ],
  },

  // 系统设置模块
  {
    path: "/setting",
    meta: {
      name: "setting",
      icon: "solar:settings-outline",
      sort: 8,
    },
    children: [
      {
        path: "/setting/account",
        component: "setting/account",
        meta: {
          name: "settingAccount",
        },
      },
      {
        path: "/setting/theme",
        component: "setting/theme",
        meta: {
          name: "settingTheme",
        },
      },
      {
        path: "/setting/security",
        component: "setting/security",
        meta: {
          name: "settingSecurity",
        },
      },
    ],
  },

  // 关于模块
  {
    path: "/about",
    component: "about/index",
    meta: {
      name: "aboutIndex",
      icon: "solar:info-circle-broken",
      sort: 8,
    },
  },

  // 异常页面模块
  {
    path: "/exception",
    meta: {
      name: "exception",
      icon: "solar:confounded-circle-broken",
      sort: 4,
    },
    children: [
      {
        path: "/exception/403",
        component: "exception/403",
        meta: {
          name: "exception403",
        },
      },
      {
        path: "/exception/404",
        component: "exception/404",
        meta: {
          name: "exception404",
        },
      },
    ],
  },
];
