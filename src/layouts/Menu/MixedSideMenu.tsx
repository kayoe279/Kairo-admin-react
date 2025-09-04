import { useMemo } from "react";
import { useLocation } from "react-router";
import { hasSubRoutes } from "@/lib/menu";
import { menuRoutes } from "@/router";
import { SideMenu } from "./SideMenu";

type MixedSideMenuProps = {
  className?: string;
};

export const MixedSideMenu = ({ className }: MixedSideMenuProps) => {
  const location = useLocation();

  // 找到当前激活的顶级菜单
  const activeTopMenuKey = useMemo(() => {
    const currentPath = location.pathname;
    const activeRoute = menuRoutes.find(
      (route) => currentPath === route.path || currentPath.startsWith((route.path || "") + "/")
    );
    return activeRoute?.path || "";
  }, [location.pathname]);

  // 获取当前激活顶级菜单的子路由
  const sideMenuRoutes = useMemo(() => {
    if (!activeTopMenuKey) return [];
    const parentRoute = menuRoutes.find((route) => route.path === activeTopMenuKey);
    if (!parentRoute || !parentRoute.children) return [];
    return [parentRoute];
  }, [activeTopMenuKey]);

  // 是否显示侧边菜单（有子菜单时才显示）
  const showSideMenu = useMemo(() => {
    const activeRoute = menuRoutes.find((route) => route.path === activeTopMenuKey);
    return Boolean(activeRoute && hasSubRoutes(activeRoute));
  }, [activeTopMenuKey]);

  return (
    <>
      {showSideMenu && (
        <SideMenu key={activeTopMenuKey} menuRoutes={sideMenuRoutes} className={className} />
      )}
    </>
  );
};
