import { useTranslation } from "react-i18next";
import { ButtonIcon } from "@/components/ui";
import { appConfig } from "@/lib/settings/app";
import { useAppSettings } from "@/store";
import { AppSetting } from "./AppSetting/AppSetting";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  const { t } = useTranslation();
  const settings = useAppSettings();
  const { headerSetting } = settings;

  const onIconClick = (key: "github" | "lock") => {
    if (key === "github") {
      window.open(appConfig.github);
    }
  };

  return (
    <header
      className="z-10 flex w-full items-center justify-between gap-x-5 px-4 shadow-xs transition-all duration-200 ease-in-out md:px-5"
      style={{ height: headerSetting.height + "px" }}
    >
      <div className="text-foreground flex h-full min-w-0 flex-1 items-center gap-x-5">占位符</div>
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
