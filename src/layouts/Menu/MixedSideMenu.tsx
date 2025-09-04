import { useMixedMenu } from "@/lib/hooks/useMenu";
import { menuRoutes } from "@/router";
import { SideMenu } from "./SideMenu";

type MixedSideMenuProps = {
  className?: string;
};

export const MixedSideMenu = ({ className }: MixedSideMenuProps) => {
  const { activeTopMenuKey, showSideMenu, sideMenuRoutes } = useMixedMenu(menuRoutes);

  return (
    <>
      {showSideMenu && (
        <SideMenu key={activeTopMenuKey} menuRoutes={sideMenuRoutes} className={className} />
      )}
    </>
  );
};
