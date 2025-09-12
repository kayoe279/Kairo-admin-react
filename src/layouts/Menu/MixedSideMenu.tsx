import { useMixedMenu } from "@/lib/hooks/useMenu";
import type { AppRouteObject } from "@/types";
import { SideMenu } from "./SideMenu";

export const MixedSideMenu = ({
  menuRoutes,
  className,
}: {
  menuRoutes: AppRouteObject[];
  className?: string;
}) => {
  const { activeTopMenuKey, showSideMenu, sideMenuRoutes } = useMixedMenu(menuRoutes);

  return (
    <>
      {showSideMenu && (
        <SideMenu key={activeTopMenuKey} menuRoutes={sideMenuRoutes} className={className} />
      )}
    </>
  );
};
