import { useTranslation } from "react-i18next";
import { ColorPicker } from "@/components/ui";
import { useDarkMode } from "@/lib/hooks";
import { useThemeActions, useThemeSettings, type ThemeType } from "@/store";
import { SettingItem } from "./SettingItem";

export const ThemeColor = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const { primaryColor, secondaryColor, successColor, warningColor, dangerColor } =
    useThemeSettings();
  const { setThemeColor } = useThemeActions();

  const updateThemeColor = (type: ThemeType, color: string) => {
    setThemeColor({ type, color, isDarkMode });
  };

  return (
    <div className="space-y-4 py-3">
      <SettingItem title={t("app.theme.primary")}>
        <ColorPicker
          color={primaryColor}
          onColorChange={(color) => updateThemeColor("primary", color)}
        />
      </SettingItem>

      <SettingItem title={t("app.theme.info")}>
        <ColorPicker
          color={secondaryColor}
          onColorChange={(color) => updateThemeColor("secondary", color)}
        />
      </SettingItem>

      <SettingItem title={t("app.theme.success")}>
        <ColorPicker
          color={successColor}
          onColorChange={(color) => updateThemeColor("success", color)}
        />
      </SettingItem>

      <SettingItem title={t("app.theme.warning")}>
        <ColorPicker
          color={warningColor}
          onColorChange={(color) => updateThemeColor("warning", color)}
        />
      </SettingItem>

      <SettingItem title={t("app.theme.error")}>
        <ColorPicker
          color={dangerColor}
          onColorChange={(color) => updateThemeColor("danger", color)}
        />
      </SettingItem>
    </div>
  );
};
