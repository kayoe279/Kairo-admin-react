import type { ReactNode } from "react";
import { ConfigProvider, type ThemeConfig } from "antd";
import { hexToRgba } from "@/lib";
import { useThemeSettings } from "@/store";

export const AntConfigProvider = ({ children }: { children: ReactNode }) => {
  const {
    backgroundColor,
    foregroundColor,
    primaryColor,
    successColor,
    warningColor,
    dangerColor,
  } = useThemeSettings();

  const primaryStr = hexToRgba(primaryColor, 0.15);
  const successStr = hexToRgba(successColor, 0.15);
  const warningStr = hexToRgba(warningColor, 0.15);
  const errorStr = hexToRgba(dangerColor, 0.15);

  const config: ThemeConfig = {
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
    components: {
      Menu: {
        iconSize: 20,
        collapsedIconSize: 20,
        itemHeight: 42,
        itemBorderRadius: 12,
        subMenuItemBorderRadius: 12,
        collapsedWidth: 64,
        subMenuItemBg: "rgba(0,0,0,0)",
        darkSubMenuItemBg: "rgba(0,0,0,0)",
        darkItemSelectedBg: primaryStr,
        darkItemHoverBg: "rgba(255, 255, 255, 0.09)",
        darkItemBg: backgroundColor,
        darkPopupBg: backgroundColor,
        darkItemSelectedColor: primaryColor,
        darkItemColor: foregroundColor,
      },
      Layout: {
        siderBg: backgroundColor,
      },
    },
  };

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};
