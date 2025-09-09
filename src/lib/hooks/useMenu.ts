import { useMemo } from "react";
import { useLocation } from "react-router";
import { useDarkMode } from "@/lib/hooks";
import {
  findFirstLeafRoute,
  getAntMenuSelectedKeys,
  getLevelKeys,
  getMenuKeyPaths,
  hasSubRoutes,
  transformToMenus,
  transformToTopMixedMenus,
  type LevelKeysProps,
} from "@/lib/menu";
import type { AppRouteObject } from "@/types";

/**
 * 菜单通用逻辑Hook
 */
export function useMenu(menuRoutes: AppRouteObject[]) {
  const location = useLocation();
  const { theme } = useDarkMode();

  const menuItems = useMemo(() => transformToMenus(menuRoutes), [menuRoutes]);

  const selectedKeys = useMemo(
    () => getAntMenuSelectedKeys(location.pathname),
    [location.pathname]
  );

  const levelKeys = useMemo(() => getLevelKeys(menuItems as LevelKeysProps[]), [menuItems]);

  const currentKeyPaths = useMemo(
    () => getMenuKeyPaths(menuItems, location.pathname),
    [menuItems, location.pathname]
  );

  return {
    theme,
    menuItems,
    selectedKeys,
    levelKeys,
    currentKeyPaths,
    currentPath: location.pathname,
    getMenuKeyPaths,
  };
}

/**
 * 混合菜单激活路由Hook
 */
export function useMixedMenu(menuRoutes: AppRouteObject[]) {
  const location = useLocation();
  const { theme } = useDarkMode();

  const topMixedMenuItems = useMemo(() => transformToTopMixedMenus(menuRoutes), [menuRoutes]);

  const activeTopMenu = useMemo(() => {
    const currentPath = location.pathname;
    const activeRoute = menuRoutes.find(
      (route) => currentPath === route.path || currentPath.startsWith((route.path || "") + "/")
    );
    return {
      activeRoute,
      activeTopMenuKey: activeRoute?.path || "",
      showSideMenu: activeRoute ? hasSubRoutes(activeRoute) : false,
      firstLeafRoute: activeRoute ? findFirstLeafRoute(activeRoute) : null,
    };
  }, [location.pathname, menuRoutes]);

  const topSelectedKeys = useMemo(
    () => [activeTopMenu.activeTopMenuKey],
    [activeTopMenu.activeTopMenuKey]
  );

  const sideMenuRoutes = useMemo(() => {
    if (!activeTopMenu.activeTopMenuKey) return [];
    const parentRoute = menuRoutes.find((route) => route.path === activeTopMenu.activeTopMenuKey);
    if (!parentRoute || !parentRoute.children) return [];
    return [parentRoute];
  }, [menuRoutes, activeTopMenu.activeTopMenuKey]);

  return {
    ...activeTopMenu,
    theme,
    currentPath: location.pathname,
    topSelectedKeys,
    topMixedMenuItems,
    sideMenuRoutes,
  };
}
