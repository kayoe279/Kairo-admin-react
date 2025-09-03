import { useEffect, useMemo, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation } from "react-router";
import { useDarkMode } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import {
  getAntMenuOpenKeys,
  getAntMenuSelectedKeys,
  transformRouteToAntMenu,
} from "@/lib/utils/menu";
import { menuRoutes } from "@/router/index";
import { useAppMenuCollapsed } from "@/store";

type SideMenuProps = {
  className?: string;
};

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export const SideMenu = ({ className }: SideMenuProps) => {
  const location = useLocation();
  const { theme } = useDarkMode();
  const collapsed = useAppMenuCollapsed();

  // 转换为 Ant Design Menu 数据格式
  const menuItems = useMemo(() => transformRouteToAntMenu(menuRoutes), []);
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
  }, [location.pathname]);

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
  }, [collapsed, location.pathname]);

  return (
    <div className={cn("flex h-full flex-col overflow-y-auto", className)}>
      <Menu
        mode="inline"
        inlineIndent={20}
        theme={theme}
        defaultSelectedKeys={defaultSelectedKeys}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        inlineCollapsed={collapsed}
        items={menuItems}
      />
    </div>
  );
};

const getLevelKeys = (items1: LevelKeysProps[]) => {
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
