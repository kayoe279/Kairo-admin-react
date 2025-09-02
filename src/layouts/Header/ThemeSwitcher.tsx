import { useMemo } from "react";
import { useTheme } from "@heroui/use-theme";
import { useTranslation } from "react-i18next";
import { ButtonIcon } from "@/components/ui";

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const iconName = useMemo(() => {
    return theme === "light" ? "solar:sun-2-broken" : "solar:moon-stars-broken";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ButtonIcon icon={iconName} tooltipContent={t("app.theme.themeSwitch")} onClick={toggleTheme} />
  );
};
