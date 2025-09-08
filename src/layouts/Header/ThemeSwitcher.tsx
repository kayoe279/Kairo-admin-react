import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ButtonIcon } from "@/components/ui";
import { useDarkMode } from "@/lib/hooks";
import { useThemeActions } from "@/store";

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { setAllThemeColor, setBaseThemeColor } = useThemeActions();
  const { isDarkMode, setThemeMode } = useDarkMode();

  const iconName = useMemo(() => {
    return isDarkMode ? "solar:sun-2-broken" : "solar:moon-stars-broken";
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode(isDarkMode ? "light" : "dark");
  }, [setThemeMode, isDarkMode]);

  useEffect(() => {
    setBaseThemeColor({ isDarkMode });
    setAllThemeColor({ isDarkMode });
  }, [isDarkMode, setAllThemeColor, setBaseThemeColor]);

  return <ButtonIcon icon={iconName} title={t("app.theme.themeSwitch")} onClick={toggleTheme} />;
};
