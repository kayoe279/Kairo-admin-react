import { Outlet } from "react-router";
import CustomerDetail from "@/routes/business/customer/detail";
import CustomerGroup from "@/routes/business/customer/group";
import CustomerList from "@/routes/business/customer/list";
import CustomerService from "@/routes/business/customer/service";
import OrderDetail from "@/routes/business/order/detail";
import OrderList from "@/routes/business/order/list";
import OrderRefund from "@/routes/business/order/refund";
import OrderShipping from "@/routes/business/order/shipping";
import ProductBrand from "@/routes/business/product/brand";
import ProductCategoryDetail from "@/routes/business/product/category/detail";
import ProductCategoryList from "@/routes/business/product/category/list";
import ProductDetail from "@/routes/business/product/detail";
import ProductInventory from "@/routes/business/product/inventory";
import ProductList from "@/routes/business/product/list";
import type { AppRouteObject } from "@/types";

export const businessRoutes: AppRouteObject[] = [
  {
    path: "/business",
    element: <Outlet />,
    meta: {
      name: "business",
      icon: "solar:shop-broken",
      sort: 2
    },
    children: [
      // 商品管理 - 三级路由示例
      {
        path: "/business/product",
        element: <Outlet />,
        meta: {
          name: "businessProduct"
        },
        children: [
          {
            path: "/business/product/list",
            element: <ProductList />,
            meta: {
              name: "businessProductList"
            }
          },
          {
            path: "/business/product/detail/:id?",
            element: <ProductDetail />,
            meta: {
              name: "businessProductDetail",
              hidden: true
            }
          },
          // 商品分类 - 三级路由
          {
            path: "/business/product/category",
            element: <Outlet />,
            meta: {
              name: "businessProductCategory"
            },
            children: [
              {
                path: "/business/product/category/list",
                element: <ProductCategoryList />,
                meta: {
                  name: "businessProductCategoryList"
                }
              },
              {
                path: "/business/product/category/detail/:id?",
                element: <ProductCategoryDetail />,
                meta: {
                  name: "businessProductCategoryDetail",
                  hidden: true
                }
              }
            ]
          },
          {
            path: "/business/product/brand",
            element: <ProductBrand />,
            meta: {
              name: "businessProductBrand"
            }
          },
          {
            path: "/business/product/inventory",
            element: <ProductInventory />,
            meta: {
              name: "businessProductInventory"
            }
          }
        ]
      },
      // 订单管理
      {
        path: "/business/order",
        element: <Outlet />,
        meta: {
          name: "businessOrder"
        },
        children: [
          {
            path: "/business/order/list",
            element: <OrderList />,
            meta: {
              name: "businessOrderList"
            }
          },
          {
            path: "/business/order/detail/:id",
            element: <OrderDetail />,
            meta: {
              name: "businessOrderDetail",
              hidden: true
            }
          },
          {
            path: "/business/order/refund",
            element: <OrderRefund />,
            meta: {
              name: "businessOrderRefund"
            }
          },
          {
            path: "/business/order/shipping",
            element: <OrderShipping />,
            meta: {
              name: "businessOrderShipping"
            }
          }
        ]
      },
      // 客户管理
      {
        path: "/business/customer",
        element: <Outlet />,
        meta: {
          name: "businessCustomer"
        },
        children: [
          {
            path: "/business/customer/list",
            element: <CustomerList />,
            meta: {
              name: "businessCustomerList"
            }
          },
          {
            path: "/business/customer/detail/:id",
            element: <CustomerDetail />,
            meta: {
              name: "businessCustomerDetail",
              hidden: true
            }
          },
          {
            path: "/business/customer/group",
            element: <CustomerGroup />,
            meta: {
              name: "businessCustomerGroup"
            }
          },
          {
            path: "/business/customer/service",
            element: <CustomerService />,
            meta: {
              name: "businessCustomerService"
            }
          }
        ]
      }
    ]
  }
];
