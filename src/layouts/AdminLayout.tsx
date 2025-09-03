import { Layout } from "antd";
import { Menu } from "@/layouts/Menu/Menu";
import { useDarkMode } from "@/lib/hooks";
import { useAppMenuCollapsed, useAppSettings } from "@/store";
import { Header } from "./Header/Header";
import { Logo } from "./Header/Logo";
import { Main } from "./Main";

const { Sider } = Layout;

export const AdminLayout = () => {
  const { theme } = useDarkMode();
  const collapsed = useAppMenuCollapsed();
  const { menuSetting } = useAppSettings();

  return (
    <Layout className="!text-foreground !bg-background flex h-screen transition-colors duration-200">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={theme}
        collapsedWidth={menuSetting.minMenuWidth}
        width={menuSetting.menuWidth}
      >
        <Logo collapsed={collapsed} />
        <Menu />
      </Sider>
      <Layout className="text-foreground bg-background flex flex-1 flex-col overflow-hidden transition-colors duration-200">
        <Header />
        <Main />
      </Layout>
    </Layout>
  );
};
