import React from "react";

/** React 路由的 meta 属性接口 */
export interface MetaProps {
  /** 菜单标识符 */
  menu?: string;
  /** 页面标题 */
  title?: string;
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
  /** 是否是根路由 */
  isRoot?: boolean;
  /** 访问角色权限 */
  roles?: string[];
  /** 外部链接 */
  isLink?: string;
  /** 忽略权限验证 */
  ignoreAuth?: boolean;
  /** 高亮的菜单项 */
  activeMenu?: string;
  /** 是否添加到Tab */
  withoutTab?: boolean;
  /** 菜单分组名称，用于自动生成层次菜单 */
  group?: string;
}

/** React 应用路由对象接口 */
export interface AppRouteObject {
  /** 路径 */
  path?: string;
  /** 路由组件 */
  element?: React.ReactNode;
  /** 子路由 */
  children?: AppRouteObject[];
  /** 是否为索引路由 */
  index?: boolean;
  /** 路径大小写敏感 */
  caseSensitive?: boolean;
  /** 路由元信息 */
  meta?: MetaProps;
  /** 外部链接 */
  isLink?: string;
  /** 路由引用，用于动画等 */
  nodeRef?: React.RefObject<unknown>;
}

/** 菜单项数据接口 */
export interface MenuItemData {
  /** 菜单标题 */
  title: string;
  /** 菜单路径 */
  path: string;
  /** 菜单图标 */
  icon?: React.ReactNode;
  /** 排序权重 */
  sort?: number;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 子菜单 */
  children?: MenuItemData[];
}
