import { Layout } from "antd";
import { Drawer } from "@/components/ui";
import { useDarkMode, useMedia, useRouteMatch } from "@/hooks";
import { Header, Logo } from "@/layouts/Header";
import { AdminMenu } from "@/layouts/Menu/AdminMenu";
import { Tabs } from "@/layouts/Tabs/Tabs";
import { cn } from "@/lib";
import { useAppActions, useAppSettings } from "@/store";
import { PageMain } from "./PageMain";

export const AdminLayout = () => {
  const { theme } = useDarkMode();
  const { isRoot } = useRouteMatch();
  const { menuSetting, headerSetting, navMode, navTheme, collapsed, fullScreen } = useAppSettings();
  const { toggleCollapsed } = useAppActions();

  const showSideMenu =
    (navMode === "vertical" || (navMode === "horizontal-mix" && !isRoot)) && !fullScreen;

  const { isMobile } = useMedia();

  return (
    <Layout className="flex h-screen">
      {showSideMenu &&
        (isMobile ? (
          <Drawer
            placement="left"
            open={collapsed}
            onClose={() => toggleCollapsed()}
            maskClosable
            blurMask={false}
            closable={false}
            width={menuSetting.menuWidth}
            classNames={{
              body: "!p-0"
            }}
          >
            <Logo />
            <AdminMenu />
          </Drawer>
        ) : (
          <Layout.Sider
            collapsed={collapsed}
            width={menuSetting.menuWidth}
            collapsedWidth={menuSetting.minMenuWidth}
            theme={navTheme === "dark" ? "dark" : theme}
            className="h-full overflow-y-auto"
          >
            <Logo />
            <AdminMenu />
          </Layout.Sider>
        ))}

      <div
        className={cn(
          "text-foreground bg-background-root flex min-w-0 flex-1 flex-col",
          headerSetting.fixed ? "overflow-hidden" : "!h-auto overflow-y-auto"
        )}
      >
        {!fullScreen && <Header className="shrink-0" />}
        <Tabs className="shrink-0" />
        <PageMain />
      </div>
    </Layout>
  );
};
