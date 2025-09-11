import type { MenuProps } from "antd";
import type { SubMenuType } from "antd/es/menu/interface";
import type { ResourceKey, TFunction } from "i18next";
import { Link } from "react-router";
import { SvgIcon } from "@/components/ui/SvgIcon";
import type { AppRouteObject } from "@/types";
import { typedBoolean } from "./helper";

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

//排除隐藏的route
export function filterRoutes(routerMap: Array<AppRouteObject> = []) {
  return routerMap?.filter((item) => !item?.meta?.hidden);
}

// 是否根路由
export function isRootMenu(item: AppRouteObject) {
  const children = filterRoutes(item?.children || []);
  return item?.meta?.isRoot || children.length === 1;
}

/**
 * 将路由数据转换为 Menu（侧边菜单, 顶部菜单, 混合菜单）
 */
export function transformToMenus(
  routes: AppRouteObject[] | undefined,
  { t, onlyFirstLevel }: { t: TFunction; onlyFirstLevel?: boolean }
): NonNullable<MenuProps["items"]> {
  const menuItems = filterRoutes(routes || []).map((item) => {
    const isRoot = isRootMenu(item);
    const route = isRoot ? item.children?.[0] : item;

    if (!route) return null;

    const meta = { ...(item.meta || {}), ...(route.meta || {}) };
    const hasChildren = route.children && route.children.length > 0;
    const label = t(`route.${meta.name}` as ResourceKey);

    const menuItem = {
      key: route.path || "",
      label: hasChildren ? label : <Link to={route.path || ""}>{label}</Link>,
      icon: meta.icon ? <SvgIcon icon={meta.icon as string} /> : undefined,
    } as SubMenuType;

    if (hasChildren && !onlyFirstLevel) {
      const childMenus = transformToMenus(route.children || [], { t, onlyFirstLevel });
      if (menuItem && childMenus && childMenus.length > 0) {
        menuItem.children = childMenus;
      }
    }

    return menuItem;
  });

  return menuItems.filter(typedBoolean);
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
