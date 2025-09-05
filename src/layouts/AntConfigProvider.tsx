import { useMemo, type ReactNode } from "react";
import { App, ConfigProvider, theme, type ThemeConfig } from "antd";
import { hexToRgba } from "@/lib";
import { useDarkMode } from "@/lib/hooks";
import { useThemeSettings } from "@/store";

export const AntConfigProvider = ({ children }: { children: ReactNode }) => {
  const {
    darkNav,
    foregroundColor,
    backgroundColor,
    primaryColor,
    successColor,
    warningColor,
    dangerColor,
  } = useThemeSettings();
  const { isDarkMode } = useDarkMode();

  const primaryStr = hexToRgba(primaryColor, 0.15);
  const successStr = hexToRgba(successColor, 0.15);
  const warningStr = hexToRgba(warningColor, 0.15);
  const errorStr = hexToRgba(dangerColor, 0.15);

  const config: ThemeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: primaryColor,
        colorSuccess: successColor,
        colorWarning: warningColor,
        colorError: dangerColor,
        borderRadius: 12,
      },
      cssVar: true,
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      components: {
        Button: {
          borderRadius: 10,
        },
        Menu: {
          iconSize: 20,
          collapsedIconSize: 20,
          itemHeight: 42,
          itemBorderRadius: 12,
          subMenuItemBorderRadius: 12,
          collapsedWidth: 64,
          subMenuItemBg: "transparent",
          darkSubMenuItemBg: "transparent",
          darkItemSelectedBg: primaryStr,
          darkItemSelectedColor: primaryColor,
          darkItemHoverBg: "rgba(255, 255, 255, 0.09)",
          darkPopupBg: "#3b3b3f",
          horizontalItemHoverColor: primaryColor,
          darkItemColor: "#ffffffd9",
          darkItemBg: "#18181c",
        },
        Layout: {
          siderBg: backgroundColor,
          lightSiderBg: darkNav ? foregroundColor : backgroundColor,
        },
      },
    }),
    [
      isDarkMode,
      darkNav,
      foregroundColor,
      backgroundColor,
      primaryColor,
      successColor,
      warningColor,
      dangerColor,
      primaryStr,
      successStr,
      warningStr,
      errorStr,
    ]
  );

  return (
    <ConfigProvider theme={config}>
      <App>{children}</App>
    </ConfigProvider>
  );
};
