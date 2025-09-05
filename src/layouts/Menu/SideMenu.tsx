import { useEffect, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation } from "react-router";
import { useMenu } from "@/lib/hooks/useMenu";
import { getAntMenuOpenKeys } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { useAppSettings, useThemeSettings } from "@/store";
import type { AppRouteObject } from "@/types";

type SideMenuProps = {
  menuRoutes: AppRouteObject[];
  className?: string;
};

export const SideMenu = ({ menuRoutes, className }: SideMenuProps) => {
  const location = useLocation();
  const { collapsed } = useAppSettings();
  const { darkNav } = useThemeSettings();

  const { theme, menuItems, selectedKeys, defaultOpenKeys, levelKeys } = useMenu(menuRoutes);

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(defaultOpenKeys);

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
      theme={darkNav ? "dark" : theme}
      selectedKeys={selectedKeys}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      inlineCollapsed={collapsed}
      items={menuItems}
      className={cn("flex h-full flex-col overflow-y-auto !border-none", className)}
    />
  );
};
