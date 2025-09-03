import { useEffect, useMemo, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import {
  getAntMenuOpenKeys,
  getAntMenuSelectedKeys,
  getSubMenusByParent,
  getTopLevelMenus,
  hasSubRoutes,
} from "@/lib/utils/menu";
import { menuRoutes } from "@/router/index";
import { useAppMenuCollapsed, useAppSettings } from "@/store";

type MixedMenuProps = {
  className?: string;
};

export const MixedMenu = ({ className }: MixedMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = useAppSettings();
  const collapsed = useAppMenuCollapsed();
  const { menuSetting } = settings;

  // 获取顶级菜单项
  const topMenuItems = useMemo(() => getTopLevelMenus(menuRoutes), []);

  // 获取当前选中的菜单键
  const selectedKeys = useMemo(
    () => getAntMenuSelectedKeys(location.pathname),
    [location.pathname]
  );

  // 找到当前激活的顶级菜单
  const activeTopMenuKey = useMemo(() => {
    const currentPath = location.pathname;
    // 找到匹配的顶级路由
    const activeRoute = menuRoutes.find(
      (route) => currentPath === route.path || currentPath.startsWith((route.path || "") + "/")
    );
    return activeRoute?.path || "";
  }, [location.pathname]);

  // 获取当前激活顶级菜单的子菜单
  const sideMenuItems = useMemo(() => {
    if (!activeTopMenuKey) return [];
    return getSubMenusByParent(menuRoutes, activeTopMenuKey);
  }, [activeTopMenuKey]);

  // 是否显示侧边菜单（有子菜单时才显示）
  const showSideMenu = useMemo(() => {
    const activeRoute = menuRoutes.find((route) => route.path === activeTopMenuKey);
    return Boolean(activeRoute && hasSubRoutes(activeRoute));
  }, [activeTopMenuKey]);

  // 侧边菜单的展开状态
  const [sideOpenKeys, setSideOpenKeys] = useState<string[]>(() => {
    if (!showSideMenu) return [];
    return getAntMenuOpenKeys(
      menuRoutes.find((route) => route.path === activeTopMenuKey)?.children || [],
      location.pathname
    );
  });

  // 当激活的顶级菜单变化时，重置侧边菜单状态
  useEffect(() => {
    if (!showSideMenu) {
      setSideOpenKeys([]);
      return;
    }

    const activeRoute = menuRoutes.find((route) => route.path === activeTopMenuKey);
    if (activeRoute?.children) {
      const newOpenKeys = getAntMenuOpenKeys(activeRoute.children, location.pathname);
      setSideOpenKeys(newOpenKeys);
    }
  }, [activeTopMenuKey, showSideMenu, location.pathname]);

  // 处理顶部菜单点击
  const handleTopMenuClick: MenuProps["onClick"] = ({ key }) => {
    const route = menuRoutes.find((r) => r.path === key);
    if (route) {
      if (hasSubRoutes(route)) {
        // 如果有子路由，导航到第一个子路由
        const firstChild = route.children?.[0];
        if (firstChild?.path) {
          navigate(firstChild.path);
        }
      } else {
        // 没有子路由，直接导航
        navigate(key);
      }
    }
  };

  // 处理侧边菜单点击
  const handleSideMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  // 处理侧边菜单展开/收起
  const handleSideOpenChange = (keys: string[]) => {
    if (!menuSetting.accordion) {
      // 非手风琴模式：允许同时展开多个子菜单
      setSideOpenKeys(keys);
    } else {
      // 手风琴模式：只允许展开一个子菜单
      const latestOpenKey = keys.find((key) => !sideOpenKeys.includes(key));
      if (latestOpenKey) {
        // 如果有新的展开项，只保留这一个
        setSideOpenKeys([latestOpenKey]);
      } else {
        // 如果没有新的展开项，说明是收起操作
        setSideOpenKeys(keys);
      }
    }
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* 顶部菜单 */}
      <div className="border-b">
        <Menu
          mode="horizontal"
          theme="light"
          selectedKeys={[activeTopMenuKey]}
          onClick={handleTopMenuClick}
          items={topMenuItems}
          className="border-none"
          style={{ lineHeight: "inherit" }}
        />
      </div>

      {/* 侧边菜单 */}
      {showSideMenu && (
        <div
          className="flex-1 overflow-hidden"
          style={{
            width: collapsed ? `${menuSetting.minMenuWidth}px` : `${menuSetting.menuWidth}px`,
            transition: "width 0.2s",
          }}
        >
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            selectedKeys={selectedKeys}
            openKeys={sideOpenKeys}
            onOpenChange={handleSideOpenChange}
            onClick={handleSideMenuClick}
            items={sideMenuItems}
            className="h-full border-none"
          />
        </div>
      )}
    </div>
  );
};
