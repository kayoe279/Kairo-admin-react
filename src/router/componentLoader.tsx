import { lazy, type ComponentType } from "react";
import { Outlet } from "react-router";
import type { AppRouteObject, DynamicRouteConfig } from "@/types";

/**
 * 组件映射表，将组件路径映射到实际的组件
 * 使用 lazy loading 提高性能
 */
const componentMap: Record<string, ComponentType<any>> = {
  // 仪表盘模块
  "dashboard/workplace": lazy(() => import("@/routes/dashboard/workplace")),
  "dashboard/analysis": lazy(() => import("@/routes/dashboard/analysis")),
  "dashboard/monitor": lazy(() => import("@/routes/dashboard/monitor")),

  // 组件示例模块
  "examples/form/basic": lazy(() => import("@/routes/examples/form/basic")),
  "examples/form/advanced": lazy(() => import("@/routes/examples/form/advanced")),
  "examples/form/step": lazy(() => import("@/routes/examples/form/step")),
  "examples/form/validation": lazy(() => import("@/routes/examples/form/validation")),
  "examples/table/basic": lazy(() => import("@/routes/examples/table/basic")),
  "examples/table/advanced": lazy(() => import("@/routes/examples/table/advanced")),
  "examples/table/editable": lazy(() => import("@/routes/examples/table/editable")),
  "examples/table/virtual": lazy(() => import("@/routes/examples/table/virtual")),
  "examples/chart": lazy(() => import("@/routes/examples/chart")),
  "examples/upload": lazy(() => import("@/routes/examples/upload")),

  // 业务管理模块
  "business/product/list": lazy(() => import("@/routes/business/product/list")),
  "business/product/detail": lazy(() => import("@/routes/business/product/detail")),
  "business/product/category/list": lazy(() => import("@/routes/business/product/category/list")),
  "business/product/category/detail": lazy(
    () => import("@/routes/business/product/category/detail")
  ),
  "business/product/brand": lazy(() => import("@/routes/business/product/brand")),
  "business/product/inventory": lazy(() => import("@/routes/business/product/inventory")),
  "business/order/list": lazy(() => import("@/routes/business/order/list")),
  "business/order/detail": lazy(() => import("@/routes/business/order/detail")),
  "business/order/refund": lazy(() => import("@/routes/business/order/refund")),
  "business/order/shipping": lazy(() => import("@/routes/business/order/shipping")),
  "business/customer/list": lazy(() => import("@/routes/business/customer/list")),
  "business/customer/detail": lazy(() => import("@/routes/business/customer/detail")),
  "business/customer/group": lazy(() => import("@/routes/business/customer/group")),
  "business/customer/service": lazy(() => import("@/routes/business/customer/service")),

  // 权限管理模块
  "permissions/example": lazy(() => import("@/routes/permissions/example")),
  "permissions/super": lazy(() => import("@/routes/permissions/super")),

  // 系统管理模块
  "system/user/list": lazy(() => import("@/routes/system/user/list")),
  "system/user/detail": lazy(() => import("@/routes/system/user/detail")),
  "system/role/list": lazy(() => import("@/routes/system/role/list")),
  "system/role/detail": lazy(() => import("@/routes/system/role/detail")),
  "system/role/permissions": lazy(() => import("@/routes/system/role/permissions")),
  "system/menu/list": lazy(() => import("@/routes/system/menu/list")),
  "system/menu/detail": lazy(() => import("@/routes/system/menu/detail")),
  "system/dept/list": lazy(() => import("@/routes/system/dept/list")),
  "system/dept/detail": lazy(() => import("@/routes/system/dept/detail")),

  // 系统设置模块
  "setting/account": lazy(() => import("@/routes/setting/account")),
  "setting/theme": lazy(() => import("@/routes/setting/theme")),
  "setting/security": lazy(() => import("@/routes/setting/security")),

  // 关于模块
  "about/index": lazy(() => import("@/routes/about/index")),

  // 异常页面模块
  "exception/403": lazy(() => import("@/routes/exception/403")),
  "exception/404": lazy(() => import("@/routes/exception/404")),
};

/**
 * 动态加载组件
 * @param componentPath 组件路径，如 "dashboard/workplace"
 * @returns React 元素
 */
export const ComponentLoader = ({ componentPath }: { componentPath?: string }) => {
  // 如果没有指定组件路径，返回 Outlet 用于嵌套路由
  if (!componentPath) {
    return <Outlet />;
  }

  // 从组件映射表中获取组件
  const Component = componentMap[componentPath];

  if (!Component) {
    console.warn(`Component not found for path: ${componentPath}`);
    return <div>Component not found: {componentPath}</div>;
  }

  return <Component />;
};

/**
 * 将动态路由配置转换为实际的路由对象
 * @param routeConfigs 动态路由配置数组
 * @returns React Router 路由对象数组
 */
export const transformRouteConfig = (routeConfigs: DynamicRouteConfig[]): AppRouteObject[] => {
  const transformSingleRoute = (config: DynamicRouteConfig): AppRouteObject => {
    const route: AppRouteObject = {
      path: config.path,
      element: <ComponentLoader componentPath={config.component} />,
      meta: config.meta,
    };
    if (config.children && config.children?.length > 0) {
      route.children = config.children.map(transformSingleRoute);
    }

    return route;
  };

  return routeConfigs.map(transformSingleRoute);
};

/**
 * 获取所有可用的组件路径
 * 用于开发时检查组件是否正确注册
 */
export const getAvailableComponents = (): string[] => {
  return Object.keys(componentMap);
};

/**
 * 检查组件是否存在
 * @param componentPath 组件路径
 * @returns 是否存在
 */
export const hasComponent = (componentPath: string): boolean => {
  return componentPath in componentMap;
};
