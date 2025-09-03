import { useAppSettings } from "@/store";
import { MixedMenu } from "./MixedMenu";
import { SideMenu } from "./SideMenu";
import { TopMenu } from "./TopMenu";

type MenuProps = {
  className?: string;
};

export const Menu = ({ className }: MenuProps) => {
  const settings = useAppSettings();
  const { navMode } = settings;

  // 根据设置中的导航模式渲染对应的菜单组件
  switch (navMode) {
    case "horizontal":
      return <TopMenu className={className} />;
    case "horizontal-mix":
      return <MixedMenu className={className} />;
    case "vertical":
    default:
      return <SideMenu className={className} />;
  }
};
