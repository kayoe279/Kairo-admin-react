import { useState } from "react";
import { App, Button, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { ButtonIcon, Drawer } from "@/components/ui";
import { useDarkMode } from "@/lib/hooks";
import { useAppActions, useAppSettings, useThemeActions } from "@/store";
import { Animation } from "./Animation";
import { LayoutMode } from "./LayoutMode";
import { PageFeatures } from "./PageFeatures";
import { ThemeColor } from "./ThemeColor";
import { ThemeMode } from "./ThemeMode";

export const AppSetting = () => {
  const { modal, message } = App.useApp();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const { blurMask } = useAppSettings();
  const { resetAppSetting } = useAppActions();
  const { resetThemeSetting } = useThemeActions();

  const handleResetSettings = () => {
    modal.confirm({
      title: t("app.resetConfig"),
      content: t("app.resetConfigContent"),
      okText: t("common.confirm"),
      cancelText: t("common.cancel"),
      centered: true,
      onOk: () => {
        resetAppSetting();
        resetThemeSetting(isDarkMode);
        message.success(t("app.resetSuccess"));
      },
    });
  };

  return (
    <>
      <ButtonIcon
        icon="solar:settings-broken"
        title={t("app.projectSetting")}
        onClick={() => setIsOpen(true)}
      />
      <Drawer
        open={isOpen}
        blurMask={blurMask}
        onClose={() => setIsOpen(false)}
        title={t("app.projectSetting")}
        footer={
          <Button
            color="pink"
            variant="filled"
            size="large"
            onClick={handleResetSettings}
            className="w-full !text-sm"
          >
            {t("app.resetConfig")}
          </Button>
        }
      >
        <Divider className="!text-foreground-subtle my-4">{t("app.theme.title")}</Divider>
        <ThemeMode />

        <Divider className="!text-foreground-subtle my-4">{t("app.layout.title")}</Divider>
        <LayoutMode />

        <Divider className="!text-foreground-subtle my-4">{t("app.theme.primaryColor")}</Divider>
        <ThemeColor />

        <Divider className="!text-foreground-subtle my-4">{t("app.pageFeature.title")}</Divider>
        <PageFeatures />

        <Divider className="!text-foreground-subtle my-4">{t("app.animation.title")}</Divider>
        <Animation />
      </Drawer>
    </>
  );
};
