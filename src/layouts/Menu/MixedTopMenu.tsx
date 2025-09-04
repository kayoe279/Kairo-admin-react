import { useMemo } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDarkMode } from "@/lib/hooks";
import { findFirstLeafRoute, hasSubRoutes, transformToTopMixedMenus } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { type AppRouteObject } from "@/router";
import { useAppActions } from "@/store";

type MixedTopMenuProps = {
  menuRoutes: AppRouteObject[];
  className?: string;
};

export const MixedTopMenu = ({ menuRoutes, className }: MixedTopMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useDarkMode();
  const { toggleCollapsed } = useAppActions();

  // 获取顶级菜单项
  const topMenuItems = useMemo(() => transformToTopMixedMenus(menuRoutes), [menuRoutes]);

  // 找到当前激活的顶级菜单
  const activeTopMenuKey = useMemo(() => {
    const currentPath = location.pathname;
    // 找到匹配的顶级路由
    const activeRoute = menuRoutes.find(
      (route) => currentPath === route.path || currentPath.startsWith((route.path || "") + "/")
    );
    return activeRoute?.path || "";
  }, [location.pathname, menuRoutes]);

  // 处理顶部菜单点击
  const handleTopMenuClick: MenuProps["onClick"] = ({ key }) => {
    const route = menuRoutes.find((r) => r.path === key);
    if (!route) return;

    if (hasSubRoutes(route)) {
      const leafRoute = findFirstLeafRoute(route);
      if (leafRoute?.path && leafRoute.path !== location.pathname) {
        toggleCollapsed(false);
        navigate(leafRoute.path);
      }
    } else {
      // 没有子路由，直接导航
      toggleCollapsed(true);
      navigate(key);
    }
  };

  return (
    <Menu
      mode="horizontal"
      theme={theme}
      selectedKeys={[activeTopMenuKey]}
      onClick={handleTopMenuClick}
      items={topMenuItems}
      className={cn("min-w-0 flex-1 !border-none", className)}
    />
  );
};
