import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex h-full items-center justify-center">
      <Result
        status="404"
        title={t("exception.404.title")}
        subTitle={t("exception.404.subtitle")}
        extra={
          <div className="space-x-2">
            <Button type="primary" onClick={() => navigate("/")}>
              {t("exception.404.backHome")}
            </Button>
          </div>
        }
      />
    </div>
  );
}
