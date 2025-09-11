import { Layout } from "antd";
import { Header, Logo } from "@/layouts/Header";
import { AdminMenu } from "@/layouts/Menu/AdminMenu";
import { Tabs } from "@/layouts/Tabs/Tabs";
import { cn } from "@/lib";
import { useDarkMode, useRouteMatch } from "@/lib/hooks";
import { useAppSettings } from "@/store";
import { PageMain } from "./PageMain";

export const AdminLayout = () => {
  const { theme } = useDarkMode();
  const { isRoot } = useRouteMatch();
  const { menuSetting, headerSetting, navMode, navTheme, collapsed } = useAppSettings();

  const showSideMenu = navMode === "vertical" || (navMode === "horizontal-mix" && !isRoot);

  return (
    <Layout className="flex h-screen">
      {showSideMenu && (
        <Layout.Sider
          collapsed={collapsed}
          width={menuSetting.menuWidth}
          collapsedWidth={menuSetting.minMenuWidth}
          theme={navTheme === "dark" ? "dark" : theme}
          className="h-full overflow-y-auto"
        >
          <Logo collapsed={collapsed} />
          <AdminMenu />
        </Layout.Sider>
      )}

      <div
        className={cn(
          "text-foreground bg-background-root flex min-w-0 flex-1 flex-col",
          headerSetting.fixed ? "overflow-hidden" : "!h-auto overflow-y-auto"
        )}
      >
        <Header className="shrink-0" />
        <Tabs />
        <PageMain className={cn(headerSetting.fixed && "min-h-0 flex-1 overflow-y-auto")} />
      </div>
    </Layout>
  );
};
