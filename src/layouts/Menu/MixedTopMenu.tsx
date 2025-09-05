import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { useMixedMenu } from "@/lib/hooks/useMenu";
import { findFirstLeafRoute, hasSubRoutes } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { useAppActions } from "@/store";
import type { AppRouteObject } from "@/types";

type MixedTopMenuProps = {
  menuRoutes: AppRouteObject[];
  className?: string;
};

export const MixedTopMenu = ({ menuRoutes, className }: MixedTopMenuProps) => {
  const navigate = useNavigate();
  const { toggleCollapsed } = useAppActions();

  const { theme, currentPath, topSelectedKeys, topMixedMenuItems } = useMixedMenu(menuRoutes);

  // 处理顶部菜单点击
  const handleTopMenuClick: MenuProps["onClick"] = ({ key }) => {
    const route = menuRoutes.find((r) => r.path === key);
    if (!route) return;

    if (hasSubRoutes(route)) {
      const leafRoute = findFirstLeafRoute(route);
      if (leafRoute?.path && leafRoute.path !== currentPath) {
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
      selectedKeys={topSelectedKeys}
      onClick={handleTopMenuClick}
      items={topMixedMenuItems}
      className={cn("min-w-0 flex-1 !border-none", className)}
    />
  );
};
