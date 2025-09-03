import { useMemo } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { getAntMenuSelectedKeys, transformRouteToAntMenu } from "@/lib/utils/menu";
import { menuRoutes } from "@/router/index";

type TopMenuProps = {
  className?: string;
};

export const TopMenu = ({ className }: TopMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 转换为 Ant Design Menu 数据格式
  const menuItems = useMemo(() => transformRouteToAntMenu(menuRoutes), []);

  // 获取当前选中的菜单项
  const selectedKeys = useMemo(
    () => getAntMenuSelectedKeys(location.pathname),
    [location.pathname]
  );

  // 处理菜单点击
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <div className={cn("flex h-full w-full", className)}>
      <Menu
        mode="horizontal"
        theme="light"
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
        items={menuItems}
        className="flex-1 border-none"
        style={{ lineHeight: "inherit" }}
      />
    </div>
  );
};
