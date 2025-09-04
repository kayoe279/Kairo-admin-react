import type { MenuProps } from "antd";
import type { ItemType, SubMenuType } from "antd/es/menu/interface";
import { Link } from "react-router";
import { SvgIcon } from "@/components/ui/SvgIcon";
import type { AppRouteObject } from "@/types";

/**
 * 将路由数据转换为 Ant Design Menu 格式
 */
export function transformRouteToAntMenu(routes: AppRouteObject[]): MenuProps["items"] {
  function buildAntMenuFromRoute(route: AppRouteObject): ItemType | null {
    const meta = route.meta;

    // 如果没有meta或被隐藏，跳过
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

    return menuItem as ItemType;
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
 * 获取顶级菜单项（用于混合模式）
 */
export function getTopLevelMenus(routes: AppRouteObject[]): MenuProps["items"] {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => ({
      key: route.path || "",
      label: route.meta?.title || "未命名",
      icon: route.meta?.icon ? <SvgIcon icon={route.meta.icon as string} /> : undefined,
    }))
    .sort((a: any, b: any) => {
      const aRoute = routes.find((r) => r.path === a.key);
      const bRoute = routes.find((r) => r.path === b.key);
      return (aRoute?.meta?.sort || 0) - (bRoute?.meta?.sort || 0);
    });
}

/**
 * 根据选中的顶级菜单获取其子菜单
 */
export function getSubMenusByParent(
  routes: AppRouteObject[],
  parentKey: string
): MenuProps["items"] {
  const parentRoute = routes.find((route) => route.path === parentKey);
  if (!parentRoute || !parentRoute.children) return [];

  return transformRouteToAntMenu(parentRoute.children);
}

/**
 * 获取当前路径的所有父级路径
 */
export function getParentPaths(currentPath: string): string[] {
  const segments = currentPath.split("/").filter(Boolean);
  const paths: string[] = [];

  for (let i = 1; i <= segments.length; i++) {
    paths.push("/" + segments.slice(0, i).join("/"));
  }

  return paths;
}

/**
 * 根据当前路径获取 Ant Design Menu 需要展开的键
 */
export function getAntMenuOpenKeys(routes: AppRouteObject[], currentPath: string): string[] {
  const openKeys: string[] = [];

  function findOpenKeys(routeList: AppRouteObject[]) {
    routeList.forEach((route) => {
      if (route.children && route.children.length > 0) {
        // 如果当前路径以这个路由路径开头，说明需要展开这个菜单项
        if (currentPath.startsWith(route.path || "")) {
          openKeys.push(route.path || "");
        }
        findOpenKeys(route.children);
      }
    });
  }

  findOpenKeys(routes);
  return openKeys;
}

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
