import { useTranslation } from "react-i18next";
import { ButtonIcon } from "@/components/ui";
import { useRouteMatch } from "@/hooks";
import { AdminMenu, Collapsed } from "@/layouts/Menu";
import { cn } from "@/lib";
import { appConfig } from "@/lib/settings/app";
import { useAppSettings } from "@/store";
import { AppSetting } from "./AppSetting/AppSetting";
import { Breadcrumbs } from "./Breadcrumbs";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { User } from "./User";

export const Header = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const { headerSetting, breadcrumbsSetting, navMode } = useAppSettings();
  const { isRoot } = useRouteMatch();

  const showCollapsed = navMode === "vertical" || (navMode === "horizontal-mix" && !isRoot);
  const showTopMenu = navMode === "horizontal" || navMode === "horizontal-mix";
  const showBreadcrumbs = navMode === "vertical" && breadcrumbsSetting.show;

  const onIconClick = (key: "github" | "lock") => {
    if (key === "github") {
      window.open(appConfig.github);
    }
  };

  return (
    <header
      className={cn(
        "text-foreground bg-background z-10 flex w-full items-center justify-between gap-x-6 px-4 md:px-5",
        className
      )}
      style={{ height: headerSetting.height + "px" }}
    >
      <div className="flex h-full min-w-0 flex-1 items-center gap-x-5">
        {showCollapsed && <Collapsed />}
        {showTopMenu && (
          <>
            {navMode === "horizontal" && <Logo className="shrink-0" />}
            <AdminMenu location="header" />
          </>
        )}
        {showBreadcrumbs && <Breadcrumbs />}
      </div>
      <div className="flex h-full items-center gap-x-6">
        <ButtonIcon
          icon="proicons:github"
          title={t("app.github")}
          onClick={() => onIconClick("github")}
        />
        <LanguageSwitch />
        <ThemeSwitcher />
        <AppSetting />
        <User />
      </div>
    </header>
  );
};
