import { useState } from "react";
import { useRequest } from "alova/client";
import { App, Button, Checkbox, Form, Input } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { LoginBanner, SvgIcon } from "@/components/ui";
import { LanguageSwitch } from "@/layouts/Header/LanguageSwitch";
import { ThemeSwitcher } from "@/layouts/Header/ThemeSwitcher";
import { cn } from "@/lib";
import { defaultLoginParams } from "@/lib/settings/app";
import { login } from "@/service/api";
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

  const initialValues = { ...defaultLoginParams, remember: true };

  // 处理卡片悬停效果
  const [isCardHovered, setIsCardHovered] = useState(false);
  const onCardHover = (hovered: boolean) => {
    setIsCardHovered(hovered);
  };

  const {
    loading,
    send: submitLogin,
    onError,
  } = useRequest(login, {
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
    } else {
      message.error(t("auth.loginFailed"));
    }
  };

  return (
    <div className="bg-background-root text-foreground relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <LoginBanner className={cn(isCardHovered ? "scale-y-100" : "scale-y-0")} />

      <motion.div
        className="bg-background/90 text-foreground relative z-10 mx-4 w-[90%] max-w-md rounded-3xl p-6 shadow-2xl backdrop-blur-2xl sm:mx-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => onCardHover(true)}
        onMouseLeave={() => onCardHover(false)}
      >
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <SvgIcon localIcon="logo" className="size-30" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Form
            form={form}
            name="basic"
            size="large"
            variant="filled"
            className="space-y-2"
            initialValues={initialValues}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: t("auth.usernameRequired") },
                { min: 3, message: t("auth.usernameMinLength") },
              ]}
            >
              <Input
                prefix={<SvgIcon icon="solar:user-broken" className="mr-3 text-lg" />}
                placeholder={t("auth.usernamePlaceholder")}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: t("auth.passwordRequired") },
                { min: 6, message: t("auth.passwordMinLength") },
              ]}
            >
              <Input.Password
                prefix={
                  <SvgIcon icon="solar:lock-password-unlocked-broken" className="mr-3 text-lg" />
                }
                placeholder={t("auth.passwordPlaceholder")}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>{t("auth.rememberMe")}</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                size="large"
                block
                className="!mt-4"
              >
                {t("auth.loginButton")}
              </Button>
            </Form.Item>
          </Form>
        </motion.div>

        {/* 底部工具区域 */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ThemeSwitcher />
          <LanguageSwitch />
        </motion.div>
      </motion.div>
    </div>
  );
}
