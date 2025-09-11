import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "alova/client";
import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/layouts/Header/LanguageSwitch";
import { ThemeSwitcher } from "@/layouts/Header/ThemeSwitcher";
import { login } from "@/service/api/auth/login";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginForm>();

  // 使用 alova 的 useRequest hook
  const { loading, send: submitLogin } = useRequest((data: LoginForm) => login(data), {
    immediate: false,
  });

  const onFinish = async (values: LoginForm) => {
    try {
      const response = await submitLogin(values);
      if (response.data) {
        message.success(t("auth.success"));
        // 这里可以添加登录成功后的逻辑，比如跳转到首页
        console.log("Login successful:", response.data);
      }
    } catch (error) {
      message.error(t("auth.failed"));
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* 右上角工具栏 */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
        <LanguageSwitch />
        <ThemeSwitcher />
      </div>

      {/* 登录表单区域 */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card text-card-foreground rounded-2xl border p-8 shadow-lg">
            {/* 标题 */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">{t("auth.title")}</h1>
              <p className="text-muted-foreground mt-2">{t("auth.subtitle")}</p>
            </div>

            {/* 登录表单 */}
            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
              layout="vertical"
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
                <Input.Password
                  prefix={<LockOutlined className="text-muted-foreground" />}
                  placeholder={t("auth.passwordPlaceholder")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full"
                  size="large"
                >
                  {loading ? t("auth.loading") : t("auth.loginButton")}
                </Button>
              </Form.Item>
            </Form>

            {/* 额外信息 */}
            <div className="text-muted-foreground mt-6 text-center text-sm">
              <p>{t("auth.tip")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
