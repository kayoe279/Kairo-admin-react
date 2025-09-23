import { Segmented, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@/components/ui";
import { useDarkMode, type ThemeMode as ThemeModeType } from "@/hooks";
import { useThemeActions, useThemeSettings } from "@/store";
import { SettingItem } from "./SettingItem";

const ThemeSwitch = () => {
  const { themeMode, themeModeMap, setThemeMode } = useDarkMode();

  const options = [
    { value: themeModeMap.light, icon: <SvgIcon icon="solar:sun-bold" className="text-xl" /> },
    {
      value: themeModeMap.dark,
      icon: <SvgIcon icon="solar:moon-stars-bold" className="text-xl" />,
    },
    {
      value: themeModeMap.system,
      icon: <SvgIcon icon="solar:sunrise-broken" className="text-xl" />,
    },
  ];

  const handleThemeChange = (key: string | number) => {
    setThemeMode(key as ThemeModeType);
  };

  return (
    <div className="w-full">
      <Segmented
        size="large"
        className="!transition-none"
        block
        value={themeMode}
        options={options}
        onChange={handleThemeChange}
      />
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
        <Switch value={darkNav} onChange={toggleDarkNav} />
      </SettingItem>
      <SettingItem title={t("app.theme.grayMode")}>
        <Switch value={grayMode} onChange={toggleGrayMode} />
      </SettingItem>
    </div>
  );
};
