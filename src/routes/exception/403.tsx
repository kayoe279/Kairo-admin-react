import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Exception403() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex h-full items-center justify-center">
      <Result
        status="403"
        title={t("exception.403.title")}
        subTitle={t("exception.403.subtitle")}
        extra={
          <div className="space-x-2">
            <Button type="primary" onClick={() => navigate("/")}>
              {t("exception.403.backHome")}
            </Button>
            <Button onClick={() => navigate(-1)}>{t("exception.403.goBack")}</Button>
          </div>
        }
      />
    </div>
  );
}
