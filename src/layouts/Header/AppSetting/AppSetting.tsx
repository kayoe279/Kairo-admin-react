import { useState } from "react";
import { Button } from "@heroui/react";
import { App, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { ButtonIcon, Drawer } from "@/components/ui";
import { useDarkMode } from "@/lib/hooks";
import { useAppActions, useThemeActions } from "@/store";
import { Animation } from "./Animation";
import { LayoutMode } from "./LayoutMode";
import { PageFeatures } from "./PageFeatures";
import { ThemeColor } from "./ThemeColor";
import { ThemeMode } from "./ThemeMode";

export const AppSetting = () => {
  const { modal, message } = App.useApp();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { resetAppSetting } = useAppActions();
  const { resetThemeSetting } = useThemeActions();
  const { isDarkMode } = useDarkMode();

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
        tooltipContent={t("app.projectSetting")}
        onClick={() => setIsOpen(true)}
      />
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("app.projectSetting")}
        footer={
          <Button color="danger" variant="flat" onPress={handleResetSettings} className="w-full">
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
