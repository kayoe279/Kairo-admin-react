import { Switch, Tab, Tabs } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@/components/ui";
import { useDarkMode, type ThemeMode as ThemeModeType } from "@/lib/hooks";
import { useThemeActions, useThemeSettings } from "@/store";
import { SettingItem } from "./SettingItem";

const ThemeSwitch = () => {
  const { themeMode, setThemeMode } = useDarkMode();

  const handleThemeChange = (key: string | number) => {
    setThemeMode(key as ThemeModeType);
  };

  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <Tabs
        className="[&>div]:!overflow-hidden"
        aria-label="Tabs variants"
        fullWidth
        variant="solid"
        selectedKey={themeMode}
        onSelectionChange={handleThemeChange}
      >
        <Tab key="light" title={<SvgIcon icon="solar:sun-bold" className="text-xl" />} />
        <Tab key="dark" title={<SvgIcon icon="solar:moon-stars-bold" className="text-xl" />} />
        <Tab key="system" title={<SvgIcon icon="solar:sunrise-broken" className="text-xl" />} />
      </Tabs>
    </div>
  );
};

export const ThemeMode = () => {
  const { t } = useTranslation();
  const { darkNav, grayMode } = useThemeSettings();
  const { toggleGrayMode, toggleDarkNav } = useThemeActions();

  return (
    <div className="space-y-4">
      <ThemeSwitch />
      <SettingItem title={t("app.theme.darkSidebar")}>
        <Switch isSelected={darkNav} onValueChange={toggleDarkNav} />
      </SettingItem>
      <SettingItem title={t("app.theme.grayMode")}>
        <Switch isSelected={grayMode} onValueChange={toggleGrayMode} />
      </SettingItem>
    </div>
  );
};
