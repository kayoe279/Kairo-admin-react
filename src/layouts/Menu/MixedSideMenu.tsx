import { useMixedMenu } from "@/lib/hooks/useMenu";
import { menuRoutes } from "@/router";
import { SideMenu } from "./SideMenu";

export const MixedSideMenu = ({ className }: { className?: string }) => {
  const { activeTopMenuKey, showSideMenu, sideMenuRoutes } = useMixedMenu(menuRoutes);

  return (
    <>
      {showSideMenu && (
        <SideMenu key={activeTopMenuKey} menuRoutes={sideMenuRoutes} className={className} />
      )}
    </>
  );
};
