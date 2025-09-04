import { useTranslation } from "react-i18next";
import { ButtonIcon } from "@/components/ui";
import { AdminMenu, Collapsed } from "@/layouts/Menu";
import { appConfig } from "@/lib/settings/app";
import { useAppSettings } from "@/store";
import { AppSetting } from "./AppSetting/AppSetting";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  const { t } = useTranslation();
  const { headerSetting, navMode } = useAppSettings();

  const showCollapsed = navMode === "vertical" || navMode === "horizontal-mix";
  const showTopMenu = navMode === "horizontal" || navMode === "horizontal-mix";

  const onIconClick = (key: "github" | "lock") => {
    if (key === "github") {
      window.open(appConfig.github);
    }
  };

  return (
    <header
      className="text-foreground bg-background z-10 flex w-full items-center justify-between gap-x-6 px-4 shadow-xs md:px-5"
      style={{ height: headerSetting.height + "px" }}
    >
      <div className="flex h-full min-w-0 flex-1 items-center gap-x-5">
        {showCollapsed && <Collapsed />}
        {showTopMenu && (
          <>
            {navMode === "horizontal" && <Logo className="shrink-0" />}
            <AdminMenu />
          </>
        )}
      </div>
      <div className="flex h-full items-center gap-x-6">
        <ButtonIcon
          icon="proicons:github"
          tooltipContent={t("app.github")}
          onClick={() => onIconClick("github")}
        />
        <ThemeSwitcher />
        <AppSetting />
        <div>头像</div>
      </div>
    </header>
  );
};
