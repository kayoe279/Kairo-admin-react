import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import {
  getConfirmPasswordRules,
  getEmailRules,
  getFullNameRules,
  getPasswordRules,
} from "@/components/features/auth/validation";
import { SvgIcon } from "@/components/ui";
import type { RegisterCredentials } from "@/service";

type RegisterFormProps = {
  loading: boolean;
  onFinish: (values: RegisterCredentials) => void;
};

export const RegisterForm = ({ loading, onFinish }: RegisterFormProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<RegisterCredentials>();

  return (
    <Form
      form={form}
      name="register"
      size="large"
      variant="filled"
      className="space-y-2"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item name="fullName" rules={getFullNameRules(t)}>
        <Input
          prefix={<SvgIcon icon="solar:user-id-broken" className="mr-3 text-lg" />}
          placeholder={t("auth.fullNamePlaceholder")}
        />
      </Form.Item>

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

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={getConfirmPasswordRules(t)}
      >
        <Input.Password
          prefix={<SvgIcon icon="solar:lock-password-broken" className="mr-3 text-lg" />}
          placeholder={t("auth.checkPasswordPlaceholder")}
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
          {t("auth.registerButton")}
        </Button>
      </Form.Item>
    </Form>
  );
};
