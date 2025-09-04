import { Menu } from "antd";
import { useMenu } from "@/lib/hooks/useMenu";
import { cn } from "@/lib/utils";
import { type AppRouteObject } from "@/router";

type TopMenuProps = {
  menuRoutes: AppRouteObject[];
  className?: string;
};

export const TopMenu = ({ menuRoutes, className }: TopMenuProps) => {
  const { theme, menuItems, selectedKeys } = useMenu(menuRoutes);

  return (
    <Menu
      mode="horizontal"
      theme={theme}
      selectedKeys={selectedKeys}
      items={menuItems}
      triggerSubMenuAction="hover"
      className={cn("min-w-0 flex-1 !border-none", className)}
    />
  );
};
