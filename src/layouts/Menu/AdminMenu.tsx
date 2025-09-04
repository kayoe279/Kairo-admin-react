import { menuRoutes } from "@/router";
import { useAppSettings } from "@/store";
import { MixedTopMenu } from "./MixedTopMenu";
import { SideMenu } from "./SideMenu";
import { TopMenu } from "./TopMenu";

type MenuProps = {
  className?: string;
};

export const AdminMenu = ({ className }: MenuProps) => {
  const settings = useAppSettings();
  const { navMode } = settings;

  switch (navMode) {
    case "horizontal":
      return <TopMenu menuRoutes={menuRoutes} className={className} />;
    case "horizontal-mix":
      return <MixedTopMenu menuRoutes={menuRoutes} className={className} />;
    case "vertical":
    default:
      return <SideMenu menuRoutes={menuRoutes} className={className} />;
  }
};
