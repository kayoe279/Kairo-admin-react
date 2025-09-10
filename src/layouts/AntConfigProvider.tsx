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
    errorColor,
  } = useThemeSettings();
  const { isDarkMode } = useDarkMode();

  const primaryStr = hexToRgba(primaryColor, 0.15);

  const config: ThemeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: primaryColor,
        colorSuccess: successColor,
        colorWarning: warningColor,
        colorError: errorColor,
        colorInfo: primaryColor,
        borderRadius: 10,
      },
      cssVar: true,
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      components: {
        Button: {
          borderRadius: 8,
        },
        Menu: {
          iconSize: 20,
          collapsedIconSize: 20,
          itemHeight: 42,
          itemBorderRadius: 10,
          subMenuItemBorderRadius: 10,
          collapsedWidth: 64,
          dropdownWidth: 120,
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
        Breadcrumb: {
          borderRadiusSM: 8,
          paddingXXS: 8,
        },
        Dropdown: {
          borderRadiusLG: 12,
          borderRadiusSM: 8,
          borderRadiusXS: 4,
          paddingXXS: 4,
          paddingXS: 8,
        },
        Tooltip: {
          borderRadius: 10,
          paddingXS: 12,
          paddingSM: 14,
        },
        Switch: {
          handleSize: 20,
          trackHeight: 24,
          handleSizeSM: 14,
          trackHeightSM: 18,
          innerMaxMargin: 24,
        },
        InputNumber: {
          controlWidth: 80,
          borderRadius: 8,
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
      errorColor,
      primaryStr,
    ]
  );

  return (
    <ConfigProvider theme={config}>
      <App>{children}</App>
    </ConfigProvider>
  );
};
