import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { getEmailRules, getPasswordRules } from "@/components/features/auth/validation";
import { SvgIcon } from "@/components/ui";
import type { LoginCredentials } from "@/service";

interface LoginFormProps {
  loading: boolean;
  onFinish: (values: LoginCredentials) => void;
  initialValues?: Partial<LoginCredentials>;
}

export const LoginForm = ({ loading, onFinish, initialValues }: LoginFormProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginCredentials>();

  return (
    <Form
      form={form}
      name="login"
      size="large"
      variant="filled"
      className="space-y-2"
      initialValues={{ remember: true, ...initialValues }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item name="email" rules={getEmailRules(t)}>
        <Input
          prefix={<SvgIcon icon="solar:user-broken" className="mr-3 text-lg" />}
          placeholder={t("auth.emailPlaceholder")}
        />
      </Form.Item>

      <Form.Item name="password" rules={getPasswordRules(t)}>
        <Input.Password
          prefix={<SvgIcon icon="solar:lock-password-unlocked-broken" className="mr-3 text-lg" />}
          placeholder={t("auth.passwordPlaceholder")}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          size="large"
          block
          className="mt-4"
        >
          {t("auth.loginButton")}
        </Button>
      </Form.Item>
    </Form>
  );
};
