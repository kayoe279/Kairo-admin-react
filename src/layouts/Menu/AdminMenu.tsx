import { menuRoutes } from "@/router";
import { useAppSettings } from "@/store";
import { MixedSideMenu } from "./MixedSideMenu";
import { MixedTopMenu } from "./MixedTopMenu";
import { SideMenu } from "./SideMenu";
import { TopMenu } from "./TopMenu";

type MenuProps = {
  location?: "side" | "header";
  className?: string;
};

export const AdminMenu = ({ className, location = "side" }: MenuProps) => {
  const settings = useAppSettings();
  const { navMode } = settings;

  switch (navMode) {
    case "horizontal":
      return <TopMenu menuRoutes={menuRoutes} className={className} />;
    case "horizontal-mix":
      return location === "header" ? (
        <MixedTopMenu menuRoutes={menuRoutes} className={className} />
      ) : (
        <MixedSideMenu className={className} />
      );
    case "vertical":
    default:
      return <SideMenu menuRoutes={menuRoutes} className={className} />;
  }
};
