import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "alova/client";
import { App, Button, Checkbox, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { LanguageSwitch } from "@/layouts/Header/LanguageSwitch";
import { ThemeSwitcher } from "@/layouts/Header/ThemeSwitcher";
import { login } from "@/service/api/auth/login";
import { useAuthRoute, useUserActions } from "@/store";

type FieldType = {
  username: string;
  password: string;
  remember?: string;
};

export default function Login() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm<FieldType>();
  const { updateUserInfo } = useUserActions();
  const { refreshRoutes } = useAuthRoute({ immediate: false });
  const { message } = App.useApp();

  const {
    loading,
    send: submitLogin,
    onError,
  } = useRequest((data: FieldType) => login(data), {
    immediate: false,
  });

  onError(() => {
    message.error(t("auth.loginFailed"));
  });

  const onFinish = async (values: FieldType) => {
    const result = await submitLogin(values);
    const userInfo = result.data;
    if (userInfo) {
      const redirectUrl = location.state?.redirect || location.state?.from || "/";
      updateUserInfo(userInfo);
      await refreshRoutes(userInfo);
      message.success(t("auth.loginSuccess"));
      navigate(redirectUrl, { replace: true });
    }
  };

  return (
    <div className="bg-background-root text-foreground flex min-h-screen">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
        <LanguageSwitch />
        <ThemeSwitcher />
      </div>

      {/* 登录表单区域 */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-background w-full max-w-md rounded-2xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">{t("auth.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("auth.subtitle")}</p>
          </div>

          <Form
            form={form}
            name="basic"
            size="large"
            labelCol={{ span: 6 }}
            variant="filled"
            initialValues={{ username: "super", password: "123456", remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              label={t("auth.username")}
              rules={[
                { required: true, message: t("auth.usernameRequired") },
                { min: 3, message: t("auth.usernameMinLength") },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-muted-foreground" />}
                placeholder={t("auth.usernamePlaceholder")}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("auth.password")}
              rules={[
                { required: true, message: t("auth.passwordRequired") },
                { min: 6, message: t("auth.passwordMinLength") },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-muted-foreground" />} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>{t("auth.rememberMe")}</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" loading={loading} htmlType="submit" className="w-full">
                {t("auth.loginButton")}
              </Button>
            </Form.Item>
          </Form>

          <div className="text-muted-foreground mt-6 text-center text-sm">
            <p>{t("auth.tip")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
