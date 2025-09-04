import { useMemo } from "react";
import { Menu } from "antd";
import { useLocation } from "react-router";
import { useDarkMode } from "@/lib/hooks";
import { getAntMenuSelectedKeys, transformToMenus } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { type AppRouteObject } from "@/router";

type TopMenuProps = {
  menuRoutes: AppRouteObject[];
  className?: string;
};

export const TopMenu = ({ menuRoutes, className }: TopMenuProps) => {
  const location = useLocation();
  const { theme } = useDarkMode();

  // 转换为 Ant Design Menu 数据格式
  const menuItems = useMemo(() => transformToMenus(menuRoutes), [menuRoutes]);

  // 获取当前选中的菜单项
  const selectedKeys = useMemo(
    () => getAntMenuSelectedKeys(location.pathname),
    [location.pathname]
  );

  return (
    <Menu
      mode="horizontal"
      theme={theme}
      selectedKeys={selectedKeys}
      items={menuItems}
      className={cn("min-w-0 flex-1 !border-none", className)}
    />
  );
};
