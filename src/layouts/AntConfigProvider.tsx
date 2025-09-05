import { useMemo, type ReactNode } from "react";
import { ConfigProvider, type ThemeConfig } from "antd";
import { hexToRgba } from "@/lib";
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

  const primaryStr = hexToRgba(primaryColor, 0.15);
  const successStr = hexToRgba(successColor, 0.15);
  const warningStr = hexToRgba(warningColor, 0.15);
  const errorStr = hexToRgba(dangerColor, 0.15);

  const config: ThemeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: primaryColor,
        colorPrimaryHover: primaryStr,
        colorSuccess: successColor,
        colorSuccessHover: successStr,
        colorWarning: warningColor,
        colorWarningHover: warningStr,
        colorError: dangerColor,
        colorErrorHover: errorStr,
      },
      cssVar: true,
      components: {
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

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};
