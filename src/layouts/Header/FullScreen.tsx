import { useTranslation } from "react-i18next";
import { ButtonIcon } from "@/components/ui";
import { useFullscreen } from "@/hooks";

export const FullScreen = () => {
  const { t } = useTranslation();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <ButtonIcon
      icon={
        isFullscreen ? "solar:quit-full-screen-square-broken" : "solar:full-screen-square-broken"
      }
      title={t("app.fullScreen")}
      onClick={toggleFullscreen}
    />
  );
};
