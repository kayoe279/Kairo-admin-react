import { InputNumber, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useAppActions, useAppSettings } from "@/store";
import { SettingItem } from "./SettingItem";

export const PageFeatures = () => {
  const { t } = useTranslation();
  const { blurMask, headerSetting, multiTabsSetting, menuSetting, breadcrumbsSetting } =
    useAppSettings();
  const { updateAppSetting } = useAppActions();

  return (
    <div className="space-y-4 py-3">
      <SettingItem title={t("app.pageFeature.blurMask")}>
        <Switch value={blurMask} onChange={(value) => updateAppSetting("blurMask", value)} />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.headerHeight")}>
        <InputNumber
          variant="filled"
          value={headerSetting.height.toString()}
          onChange={(value) => updateAppSetting("headerSetting.height", parseInt(value || "0"))}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.fixedHeaderAndTabs")}>
        <Switch
          value={headerSetting.fixed}
          onChange={(value) => updateAppSetting("headerSetting.fixed", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showReloadButton")}>
        <Switch
          value={headerSetting.isReload}
          onChange={(value) => updateAppSetting("headerSetting.isReload", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showTabs")}>
        <Switch
          value={multiTabsSetting.show}
          onChange={(value) => updateAppSetting("multiTabsSetting.show", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.tabHeight")}>
        <InputNumber
          variant="filled"
          value={multiTabsSetting.height.toString()}
          onChange={(value) => updateAppSetting("multiTabsSetting.height", parseInt(value || "0"))}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showBreadcrumb")}>
        <Switch
          value={breadcrumbsSetting.show}
          onChange={(value) => updateAppSetting("breadcrumbsSetting.show", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showBreadcrumbIcon")}>
        <Switch
          value={breadcrumbsSetting.showIcon}
          onChange={(value) => updateAppSetting("breadcrumbsSetting.showIcon", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.menuAccordion")}>
        <Switch
          value={menuSetting.accordion}
          onChange={(value) => updateAppSetting("menuSetting.accordion", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.menuWidth")}>
        <InputNumber
          variant="filled"
          value={menuSetting.menuWidth.toString()}
          onChange={(value) => updateAppSetting("menuSetting.menuWidth", parseInt(value || "0"))}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.minMenuWidth")}>
        <InputNumber
          variant="filled"
          value={menuSetting.minMenuWidth.toString()}
          onChange={(value) => updateAppSetting("menuSetting.minMenuWidth", parseInt(value || "0"))}
        />
      </SettingItem>
    </div>
  );
};
