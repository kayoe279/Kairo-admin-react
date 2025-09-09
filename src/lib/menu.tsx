import type { MenuProps } from "antd";
import type { ItemType, SubMenuType } from "antd/es/menu/interface";
import { Link } from "react-router";
import { SvgIcon } from "@/components/ui/SvgIcon";
import type { AppRouteObject } from "@/types";

export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItemType[];
}

export interface TopMixedMenuItemType {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

/**
 * 将路由数据转换为 Menu（侧边菜单, 顶部菜单）
 */
export function transformToMenus(routes: AppRouteObject[]): MenuProps["items"] {
  function buildAntMenuFromRoute(route: AppRouteObject): ItemType | null {
    const meta = route.meta;

    if (!meta || meta.hidden) return null;

    const menuItem = {
      key: route.path || "",
      label: meta.title || <></>,
      icon: meta.icon ? <SvgIcon icon={meta.icon as string} /> : undefined,
    };

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      const childMenus = route.children
        .map((child) => buildAntMenuFromRoute(child))
        .filter((child) => child !== null);

      if (childMenus.length > 0) {
        (menuItem as SubMenuType).children = childMenus;
      }
    } else {
      menuItem.label = <Link to={route.path || ""}>{meta.title || "未命名"}</Link>;
    }

    return menuItem || [];
  }

  const menuItems = routes
    .map((route) => buildAntMenuFromRoute(route))
    .filter((item) => item !== null);

  // 获取路由的 sort 值进行排序
  return menuItems.sort((a, b) => {
    const aRoute = routes.find((r) => r.path === a.key);
    const bRoute = routes.find((r) => r.path === b.key);
    return (aRoute?.meta?.sort || 0) - (bRoute?.meta?.sort || 0);
  });
}

/**
 * 将路由数据转换为 Menu（顶部混合菜单）
 */
export function transformToTopMixedMenus(routes: AppRouteObject[]): MenuProps["items"] {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => ({
      key: route.path || "",
      label: route.meta?.title || "未命名",
      icon: route.meta?.icon ? <SvgIcon icon={route.meta.icon as string} /> : undefined,
    }))
    .sort((a, b) => {
      const aRoute = routes.find((r) => r.path === a.key);
      const bRoute = routes.find((r) => r.path === b.key);
      return (aRoute?.meta?.sort || 0) - (bRoute?.meta?.sort || 0);
    });
}

export type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
};
// 获取菜单的层级
export const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

/**
 * 获取菜单路径的完整层级路径（基于转换后的菜单结构）
 * @param menus 转换后的菜单数据
 * @param targetKey 目标菜单key，例如 '/comp/table/edit-cell'
 * @returns 返回包含所有父级路径的数组，例如 ['/comp/table/edit-cell', '/comp/table', '/comp']
 */
export const getMenuKeyPaths = (menus: MenuProps["items"], targetKey: string): string[] => {
  if (!targetKey || !menus) return [];

  const keyPaths: string[] = [];

  function findPathInMenus(menuList: MenuProps["items"] = [], currentPath: string[]): boolean {
    for (const _menu of menuList) {
      const menu = _menu as MenuItemType;
      const newPath = [...currentPath, (menu?.key as string) || ""];

      // 如果找到目标菜单项
      if (menu?.key === targetKey) {
        keyPaths.push(...newPath);
        return true;
      }

      // 递归查找子菜单
      if (menu?.children && menu?.children?.length > 0) {
        if (findPathInMenus(menu?.children as MenuProps["items"], newPath)) {
          return true;
        }
      }
    }
    return false;
  }

  findPathInMenus(menus, []);

  // 返回从目标路径到根路径的顺序：[..., 祖父路径, 父路径, 目标路径]
  return keyPaths.filter((v) => !!v);
};

/**
 * 根据当前路径获取 Ant Design Menu 选中的键
 */
export function getAntMenuSelectedKeys(currentPath: string): string[] {
  return [currentPath];
}

/**
 * 检查路由是否有子路由
 */
export function hasSubRoutes(route: AppRouteObject): boolean {
  return Boolean(route.children && route.children.length > 0);
}

/**
 * 递归查找最底层的第一个可访问路由
 * 如果一个路由有子路由，会继续递归查找直到找到没有子路由的叶子节点
 */
export function findFirstLeafRoute(route: AppRouteObject): AppRouteObject | null {
  if (route.meta?.hidden) {
    return null;
  }

  if (!route.children || route.children.length === 0) {
    return route;
  }

  for (const child of route.children) {
    const leafRoute = findFirstLeafRoute(child);
    if (leafRoute) {
      return leafRoute;
    }
  }

  return null;
}
