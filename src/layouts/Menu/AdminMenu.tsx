import { useAppSettings, useAuthRouteState } from "@/store";
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
  const { authRoutes } = useAuthRouteState();
  const { navMode } = settings;

  switch (navMode) {
    case "horizontal":
      return <TopMenu menuRoutes={authRoutes} className={className} />;
    case "horizontal-mix":
      return location === "header" ? (
        <MixedTopMenu menuRoutes={authRoutes} className={className} />
      ) : (
        <MixedSideMenu menuRoutes={authRoutes} className={className} />
      );
    case "vertical":
    default:
      return <SideMenu menuRoutes={authRoutes} className={className} />;
  }
};
