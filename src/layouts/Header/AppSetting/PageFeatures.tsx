import { Input, Switch } from "@heroui/react";
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
        <Switch
          isSelected={blurMask}
          onValueChange={(value) => updateAppSetting("blurMask", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.headerHeight")}>
        <Input
          type="number"
          value={headerSetting.height.toString()}
          onChange={(e) => updateAppSetting("headerSetting.height", parseInt(e.target.value))}
          className="w-20"
          size="sm"
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.fixedHeaderAndTabs")}>
        <Switch
          isSelected={headerSetting.fixed}
          onValueChange={(value) => updateAppSetting("headerSetting.fixed", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showReloadButton")}>
        <Switch
          isSelected={headerSetting.isReload}
          onValueChange={(value) => updateAppSetting("headerSetting.isReload", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showTabs")}>
        <Switch
          isSelected={multiTabsSetting.show}
          onValueChange={(value) => updateAppSetting("multiTabsSetting.show", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.tabHeight")}>
        <Input
          type="number"
          value={multiTabsSetting.height.toString()}
          onChange={(e) => updateAppSetting("multiTabsSetting.height", parseInt(e.target.value))}
          className="w-20"
          size="sm"
          min={30}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showBreadcrumb")}>
        <Switch
          isSelected={breadcrumbsSetting.show}
          onValueChange={(value) => updateAppSetting("breadcrumbsSetting.show", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.showBreadcrumbIcon")}>
        <Switch
          isSelected={breadcrumbsSetting.showIcon}
          onValueChange={(value) => updateAppSetting("breadcrumbsSetting.showIcon", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.menuAccordion")}>
        <Switch
          isSelected={menuSetting.accordion}
          onValueChange={(value) => updateAppSetting("menuSetting.accordion", value)}
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.menuWidth")}>
        <Input
          type="number"
          value={menuSetting.menuWidth.toString()}
          onChange={(e) => updateAppSetting("menuSetting.menuWidth", parseInt(e.target.value))}
          className="w-20"
          size="sm"
        />
      </SettingItem>

      <SettingItem title={t("app.pageFeature.minMenuWidth")}>
        <Input
          type="number"
          value={menuSetting.minMenuWidth.toString()}
          onChange={(e) => updateAppSetting("menuSetting.minMenuWidth", parseInt(e.target.value))}
          className="w-20"
          size="sm"
        />
      </SettingItem>
    </div>
  );
};
