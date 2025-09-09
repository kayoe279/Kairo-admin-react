import { Select, SelectItem, Switch } from "@heroui/react";
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

  const handleAnimateTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateAppSetting("pageAnimateType", e.target.value);
  };

  return (
    <div className="space-y-4 py-3">
      <SettingItem title={t("app.animation.enable")}>
        <Switch isSelected={isPageAnimate} onValueChange={handleAnimateToggle} />
      </SettingItem>

      <SettingItem title={t("app.animation.type")}>
        <Select
          selectedKeys={[pageAnimateType]}
          onChange={handleAnimateTypeChange}
          className="max-w-36 min-w-30"
          size="sm"
          isDisabled={!isPageAnimate}
        >
          {animateOptions.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      </SettingItem>
    </div>
  );
};
