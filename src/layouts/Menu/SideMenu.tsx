import { useEffect, useMemo, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation } from "react-router";
import { useDarkMode } from "@/lib/hooks";
import {
  getAntMenuOpenKeys,
  getAntMenuSelectedKeys,
  getLevelKeys,
  transformToMenus,
  type LevelKeysProps,
} from "@/lib/menu";
import { cn } from "@/lib/utils";
import { type AppRouteObject } from "@/router";
import { useAppMenuCollapsed } from "@/store";

type SideMenuProps = {
  menuRoutes: AppRouteObject[];
  className?: string;
};

export const SideMenu = ({ menuRoutes, className }: SideMenuProps) => {
  const location = useLocation();
  const { theme } = useDarkMode();
  const collapsed = useAppMenuCollapsed();

  // 转换为 Side Menu 数据格式
  const menuItems = useMemo(() => transformToMenus(menuRoutes), [menuRoutes]);
  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);

  const defaultSelectedKeys = useMemo(
    () => getAntMenuSelectedKeys(location.pathname),
    [location.pathname]
  );

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

  // 当路由变化时更新展开状态
  useEffect(() => {
    const newOpenKeys = getAntMenuOpenKeys(menuRoutes, location.pathname);
    setStateOpenKeys((prev) => [...new Set([...prev, ...newOpenKeys])]);
  }, [location.pathname, menuRoutes]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      const filteredOpenKeys = openKeys
        // remove repeat key
        .filter((_, index) => index !== repeatIndex)
        // remove current level all child
        .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]);

      setStateOpenKeys(filteredOpenKeys);
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    if (!collapsed) {
      setStateOpenKeys(getAntMenuOpenKeys(menuRoutes, location.pathname));
    }
  }, [collapsed, location.pathname, menuRoutes]);

  return (
    <Menu
      mode="inline"
      inlineIndent={20}
      theme={theme}
      defaultSelectedKeys={defaultSelectedKeys}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      inlineCollapsed={collapsed}
      items={menuItems}
      className={cn("flex h-full flex-col overflow-y-auto", className)}
    />
  );
};
