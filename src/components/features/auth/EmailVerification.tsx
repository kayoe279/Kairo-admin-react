import { App, Button, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@/components/ui";
import { useResendConfirmation, useVerifyOtp } from "@/service";

const { Text } = Typography;

interface EmailVerificationProps {
  email: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

interface VerificationFormData {
  token: string;
}

export const EmailVerification = ({ email, onVerifySuccess, onBack }: EmailVerificationProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<VerificationFormData>();
  const { message } = App.useApp();

  const { isPending, mutateAsync: verifyOtp } = useVerifyOtp();
  const { isPending: isResendPending, mutateAsync: resendConfirmation } = useResendConfirmation();

  const onFinish = async (values: VerificationFormData) => {
    try {
      const result = await verifyOtp({ email, token: values.token, type: "signup" });

      if (result.error) {
        throw new Error(result.error.message);
      }

      onVerifySuccess();
    } catch (error: any) {
      console.error("Verification error:", error);
      form.setFields([
        {
          name: "token",
          errors: [error.message || t("auth.verifyFailed")],
        },
      ]);
    }
  };

  const resendVerification = async () => {
    try {
      const result = await resendConfirmation({ email, type: "signup" });

      if (result.error) {
        throw new Error(result.error.message);
      }
      message.success(t("auth.resendCodeSuccess"));
    } catch (error) {
      message.error(`${t("auth.resendCodeFailed")}: ${error}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-medium">{t("auth.verifyEmailTitle")}</h3>
        <Text type="secondary" className="mx-auto block w-[90%] text-sm">
          {t("auth.verifyEmailDesc", { email })}
        </Text>
      </div>

      <Form
        form={form}
        name="verification"
        size="large"
        variant="filled"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="token"
          rules={[
            { required: true, message: t("auth.verificationCodeRequired") },
            { len: 6, message: t("auth.verificationCodeLength") },
          ]}
        >
          <Input
            prefix={<SvgIcon icon="solar:key-broken" className="mr-3 text-lg" />}
            placeholder={t("auth.verificationCodePlaceholder")}
            maxLength={6}
            className="text-center tracking-widest"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={isPending}
            htmlType="submit"
            size="large"
            block
            className="mt-4"
          >
            {t("auth.verifyButton")}
          </Button>
        </Form.Item>
      </Form>

      <div className="space-y-3 text-center">
        <div>
          <Text type="secondary" className="text-sm">
            {t("auth.noCodeReceived")}
          </Text>
          <Button
            type="link"
            onClick={resendVerification}
            loading={isResendPending}
            className="ml-1 p-0"
          >
            {t("auth.resendCode")}
          </Button>
        </div>

        <Button type="link" onClick={onBack} className="p-0">
          {t("auth.backToRegister")}
        </Button>
      </div>
    </div>
  );
};
