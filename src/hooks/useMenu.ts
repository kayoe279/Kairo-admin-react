import { useMemo } from "react";
import type { ItemType } from "antd/es/menu/interface";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useDarkMode } from "@/hooks";
import {
  getAntMenuSelectedKeys,
  getLevelKeys,
  getMenuKeyPaths,
  transformToMenus,
  type LevelKeysProps,
} from "@/lib/menu";
import type { AppRouteObject } from "@/types";

/**
 * 菜单通用逻辑Hook
 */
export const useMenu = (menuRoutes: AppRouteObject[]) => {
  const location = useLocation();
  const { theme } = useDarkMode();
  const { t } = useTranslation();

  const menuItems = useMemo(() => transformToMenus(menuRoutes, { t }), [menuRoutes, t]);

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
};

/**
 * 混合菜单激活路由Hook
 */
export const useMixedMenu = (menuRoutes: AppRouteObject[]) => {
  const location = useLocation();
  const { theme } = useDarkMode();
  const { t } = useTranslation();

  const menuItems = useMemo(() => transformToMenus(menuRoutes, { t }), [menuRoutes, t]);

  const topMixedMenuItems = useMemo(() => {
    return menuItems.map((item) => ({ ...item, children: undefined })) as ItemType[];
  }, [menuItems]);

  const activeTopMenu = useMemo(() => {
    const currentPath = location.pathname;
    const keyPaths = getMenuKeyPaths(menuItems, currentPath);

    const activeMenu = menuItems?.find(
      (item) => currentPath === item?.key || keyPaths[0] === item?.key
    );

    return {
      activeMenu,
      activeTopMenuKey: (activeMenu?.key || "") as string,
      showSideMenu: activeMenu ? keyPaths.length > 1 : false,
    };
  }, [location.pathname, menuItems]);

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
    topMixedMenuItems,
    theme,
    currentPath: location.pathname,
    topSelectedKeys,
    sideMenuRoutes,
    ...activeTopMenu,
  };
};
