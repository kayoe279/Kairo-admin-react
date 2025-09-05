import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { ButtonIcon, Drawer } from "@/components/ui";
import { Animation } from "./Animation";
import { LayoutMode } from "./LayoutMode";
import { PageFeatures } from "./PageFeatures";
import { ThemeColor } from "./ThemeColor";
import { ThemeMode } from "./ThemeMode";

export const AppSetting = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleResetSettings = () => {
    // TODO: 集成到状态管理中重置所有设置
    console.log("Reset all settings");

    // 显示成功消息
    console.log("Settings reset successfully");
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
          <Button color="danger" variant="solid" onPress={handleResetSettings} className="w-full">
            {t("app.resetConfig")}
          </Button>
        }
      >
        <Divider className="!text-foreground-subtle my-4 !text-sm">{t("app.theme.title")}</Divider>
        <ThemeMode />

        <Divider className="!text-foreground-subtle my-4 !text-sm">{t("app.layout.title")}</Divider>
        <LayoutMode />

        <Divider className="!text-foreground-subtle my-4 !text-sm">
          {t("app.theme.primaryColor")}
        </Divider>
        <ThemeColor />

        <Divider className="!text-foreground-subtle my-4 !text-sm">
          {t("app.pageFeature.title")}
        </Divider>
        <PageFeatures />

        <Divider className="!text-foreground-subtle my-4 !text-sm">
          {t("app.animation.title")}
        </Divider>
        <Animation />
      </Drawer>
    </>
  );
};
