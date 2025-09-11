import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useMenu } from "@/lib/hooks/useMenu";
import { cn } from "@/lib/utils";
import { useAppSettings, useThemeSettings } from "@/store";
import type { AppRouteObject } from "@/types";

type SideMenuProps = {
  menuRoutes: AppRouteObject[];
  className?: string;
};

export const SideMenu = ({ menuRoutes, className }: SideMenuProps) => {
  const { collapsed, menuSetting } = useAppSettings();
  const { darkNav } = useThemeSettings();

  const { theme, menuItems, selectedKeys, currentKeyPaths, getMenuKeyPaths } = useMenu(menuRoutes);

  // 初始化时根据accordion设置来决定展开逻辑
  const [stateOpenKeys, setStateOpenKeys] = useState<string[] | undefined>(
    collapsed ? undefined : currentKeyPaths
  );
  // 保存菜单收缩前的状态
  const savedOpenKeysRef = useRef<string[] | undefined>(collapsed ? undefined : currentKeyPaths);

  const onOpenChange: MenuProps["onOpenChange"] = useCallback(
    (openKeys: string[]) => {
      // 如果菜单是收缩状态，清空 openKeys
      if (collapsed) {
        setStateOpenKeys(undefined);
        return;
      }

      if (menuSetting.accordion) {
        const lastOpenKey = openKeys.at(-1) || "";
        const keyPaths = getMenuKeyPaths(menuItems, lastOpenKey);
        const newOpenKeys = keyPaths.length > 0 ? keyPaths : currentKeyPaths;
        setStateOpenKeys(newOpenKeys);
        savedOpenKeysRef.current = newOpenKeys;
        return;
      }

      setStateOpenKeys(openKeys);
      savedOpenKeysRef.current = openKeys;
    },
    [menuSetting.accordion, currentKeyPaths, collapsed, menuItems, getMenuKeyPaths]
  );

  // 监听 collapsed 状态变化，处理菜单展开/收缩
  useEffect(() => {
    if (collapsed) {
      // 菜单收缩时，清空 openKeys
      setStateOpenKeys(undefined);
    } else {
      // 菜单展开时，恢复之前保存的状态
      setStateOpenKeys(savedOpenKeysRef.current);
    }
  }, [collapsed]);

  useEffect(() => {
    if (collapsed) return;
    // accordion模式：只展开当前路径的父级菜单
    if (menuSetting.accordion) {
      setStateOpenKeys(currentKeyPaths);
      savedOpenKeysRef.current = currentKeyPaths;
    } else {
      // 非accordion模式：合并当前已展开的菜单和当前路径的父级菜单
      setStateOpenKeys((prev) => {
        const newKeys = [...new Set([...(prev || []), ...currentKeyPaths])];
        savedOpenKeysRef.current = newKeys;
        return newKeys;
      });
    }
  }, [currentKeyPaths, menuSetting.accordion, collapsed]);

  const onClick: MenuProps["onClick"] = ({ keyPath }) => {
    if (menuSetting.accordion) {
      setStateOpenKeys(keyPath);
    }
  };

  return (
    <Menu
      mode={collapsed ? "vertical" : "inline"}
      inlineIndent={20}
      theme={darkNav ? "dark" : theme}
      selectedKeys={selectedKeys}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      inlineCollapsed={collapsed}
      items={menuItems}
      className={cn("flex flex-col !border-none", className)}
    />
  );
};
