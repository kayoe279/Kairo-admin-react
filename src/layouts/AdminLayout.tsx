import { Layout } from "antd";
import { Header, Logo } from "@/layouts/Header";
import { AdminMenu } from "@/layouts/Menu/AdminMenu";
import { useDarkMode } from "@/lib/hooks";
import { useAppMenuCollapsed, useAppSettings } from "@/store";
import { Main } from "./Main";

const { Sider } = Layout;

export const AdminLayout = () => {
  const { theme } = useDarkMode();
  const collapsed = useAppMenuCollapsed();
  const { menuSetting, navMode } = useAppSettings();

  return (
    <Layout className="text-foreground !bg-background flex h-screen transition-colors duration-200">
      {navMode === "vertical" && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme={theme}
          collapsedWidth={menuSetting.minMenuWidth}
          width={menuSetting.menuWidth}
        >
          <Logo collapsed={collapsed} />
          <AdminMenu />
        </Sider>
      )}
      <Layout className="text-foreground bg-background flex flex-1 flex-col overflow-hidden transition-colors duration-200">
        <Header />
        <Main />
      </Layout>
    </Layout>
  );
};
