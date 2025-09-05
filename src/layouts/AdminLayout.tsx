import { Layout } from "antd";
import { Header, Logo } from "@/layouts/Header";
import { AdminMenu } from "@/layouts/Menu/AdminMenu";
import { useDarkMode } from "@/lib/hooks";
import { useAppSettings } from "@/store";
import { PageMain } from "./PageMain";

const { Sider } = Layout;

export const AdminLayout = () => {
  const { theme } = useDarkMode();
  const { menuSetting, navMode, collapsed } = useAppSettings();

  const showSideMenu = navMode === "vertical" || navMode === "horizontal-mix";

  return (
    <Layout className="flex h-screen transition-colors duration-200">
      {showSideMenu && (
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
        <Header className="shrink-0" />
        <PageMain className="min-h-0 flex-1" />
      </Layout>
    </Layout>
  );
};
