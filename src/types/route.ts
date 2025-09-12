import React from "react";
import type { RouteObject } from "react-router";

/** React 路由的 meta 属性接口 */
export interface MetaProps {
  /** 路由名称 */
  name?: string;
  /** 页面标题 */
  title?: string;
  /** 是否是根路由 */
  isRoot?: boolean;
  /** 图标组件 */
  icon?: React.ReactNode;
  /** 排序权重，数字越小越靠前 */
  sort?: number;
  /** 是否开启页面缓存 */
  keepAlive?: boolean;
  /** 是否固定在Tab中 */
  affix?: boolean;
  /** 是否隐藏菜单项 */
  hidden?: boolean;
  /** 访问角色权限 */
  roles?: string[];
  /** 外部链接 */
  isLink?: string;
  /** 忽略权限验证 */
  ignoreAuth?: boolean;
  /** 是否需要登录验证 */
  requireAuth?: boolean;
  /** 高亮的菜单项 */
  activeMenu?: string;
  /** 是否添加到Tab */
  withoutTab?: boolean;
  /** 菜单分组名称，用于自动生成层次菜单 */
  group?: string;
}

/** React 应用路由对象接口 */
export type AppRouteObject = RouteObject & {
  /** 路径 */
  path?: string;
  /** 路由组件 */
  element?: React.ReactNode;
  /** 子路由 */
  children?: AppRouteObject[];
  caseSensitive?: boolean;
  /** 是否为索引路由 */
  index?: boolean;
  /** 路由元信息 */
  meta?: MetaProps;
  /** 路由引用，用于动画等 */
  nodeRef?: React.RefObject<unknown>;
};

/**
 * 动态路由配置类型
 * component: 对应 routes 目录下的组件路径，用于动态加载
 */
export type DynamicRouteConfig = {
  path: string;
  component?: string; // 组件路径，如 "dashboard/workplace"
  meta?: {
    name: string;
    icon?: string;
    sort?: number;
    keepAlive?: boolean;
    affix?: boolean;
    hidden?: boolean;
    roles?: string[];
  };
  children?: DynamicRouteConfig[];
};
