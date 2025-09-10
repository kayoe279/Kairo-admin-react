import { Select, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useAppActions, useAppSettings } from "@/store";
import { SettingItem } from "./SettingItem";

export const Animation = () => {
  const { t } = useTranslation();
  const { isPageAnimate, pageAnimateType } = useAppSettings();
  const { updateAppSetting } = useAppActions();

  // 动画选项
  const animateOptions = [
    { value: "fade-slide", label: t("app.animation.fadeSlide") },
    { value: "flip-fade", label: t("app.animation.flipFade") },
    { value: "fade-bottom", label: t("app.animation.fadeBottom") },
    { value: "bounce-in", label: t("app.animation.bounceIn") },
    { value: "zoom-fade", label: t("app.animation.zoomFade") },
    { value: "rotate-fade", label: t("app.animation.rotateFade") },
  ];

  const handleAnimateToggle = (value: boolean) => {
    updateAppSetting("isPageAnimate", value);
  };

  const handleAnimateTypeChange = (value: string) => {
    updateAppSetting("pageAnimateType", value);
  };

  return (
    <div className="space-y-4 py-3">
      <SettingItem title={t("app.animation.enable")}>
        <Switch value={isPageAnimate} onChange={handleAnimateToggle} />
      </SettingItem>

      <SettingItem title={t("app.animation.type")}>
        <Select
          className="max-w-40 min-w-32"
          variant="filled"
          value={pageAnimateType}
          onChange={handleAnimateTypeChange}
          disabled={!isPageAnimate}
          options={animateOptions}
        ></Select>
      </SettingItem>
    </div>
  );
};
