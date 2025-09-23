import { useState } from "react";
import { App, Button } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { EmailVerification, LoginForm, RegisterForm } from "@/components/features";
import { LoginBanner, SvgIcon } from "@/components/ui";
import { LanguageSwitch, ThemeSwitcher } from "@/layouts/Header";
import { cn } from "@/lib";
import {
  useSignIn,
  useSignUp,
  type LoginCredentials,
  type RegisterCredentials,
  type RoleType,
} from "@/service";
import { useAuthRoute, useUserActions } from "@/store";

export default function Login() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { updateUserInfo } = useUserActions();
  const { refreshRoutes } = useAuthRoute({ immediate: false });
  const { message } = App.useApp();

  const [currentView, setCurrentView] = useState<"login" | "register" | "verify">("login");
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { isPending: isSignInPending, mutateAsync: signIn } = useSignIn();
  const { isPending: isSignUpPending, mutateAsync: signUp } = useSignUp();

  const onCardHover = (hovered: boolean) => {
    setIsCardHovered(hovered);
  };

  const switchToRegister = () => setCurrentView("register");
  const switchToLogin = () => setCurrentView("login");
  const switchToVerify = (email: string) => {
    setRegisteredEmail(email);
    setCurrentView("verify");
  };
  const switchBackToRegister = () => setCurrentView("register");

  const onVerifySuccess = () => {
    message.success(t("auth.verifySuccess"));
    setCurrentView("login");
  };

  const onLoginFinish = async (values: LoginCredentials) => {
    try {
      const result = await signIn({
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        message.error(`${t("auth.loginFailed")}: ${result.error.message}`);
        return;
      }

      const user = result.user;

      if (user) {
        updateUserInfo(user);
        await refreshRoutes(user);
        message.success(t("auth.loginSuccess"));
        const redirectUrl = location.state?.redirect || location.state?.from || "/";
        navigate(redirectUrl, { replace: true });
      }
    } catch (error) {
      message.error(`${t("auth.loginFailed")}: ${error}`);
    }
  };

  const onRegisterFinish = async (values: RegisterCredentials) => {
    try {
      const result = await signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: (values as any)?.fullName,
            roles: ["admin", "user"] as RoleType[],
          },
        },
      });

      if (result.error) {
        message.error(`${t("auth.registerFailed")}: ${result.error?.message}`);
        return;
      }

      message.success(t("auth.registerSuccess"));
      switchToVerify(values.email);
    } catch (error) {
      message.error(`${t("auth.registerFailed")}: ${error}`);
    }
  };

  return (
    <div className="bg-background-root text-foreground relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <LoginBanner className={cn(isCardHovered ? "scale-y-100" : "scale-y-0")} />

      <motion.div
        className="bg-background/90 text-foreground relative z-10 mx-4 w-[90%] max-w-md rounded-3xl p-6 shadow-2xl backdrop-blur-2xl sm:mx-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          height: currentView === "login" ? 490 : currentView === "register" ? 620 : 580,
        }}
        transition={{
          duration: 0.3,
          height: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.15,
          },
        }}
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

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -30,
                scale: 0.95,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: { duration: 0.3 },
                y: { duration: 0.5 },
                scale: { duration: 0.4 },
              }}
            >
              {currentView === "login" ? (
                <LoginForm loading={isSignInPending} onFinish={onLoginFinish} />
              ) : currentView === "register" ? (
                <RegisterForm loading={isSignUpPending} onFinish={onRegisterFinish} />
              ) : (
                <EmailVerification
                  email={registeredEmail}
                  onVerifySuccess={onVerifySuccess}
                  onBack={switchBackToRegister}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {currentView !== "verify" && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView === "login" ? "switch-to-register" : "switch-to-login"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.1,
                }}
              >
                {currentView === "login" ? (
                  <div>
                    <span className="text-foreground-subtle text-sm">
                      {t("auth.noAccountText")}
                    </span>
                    <Button type="link" onClick={switchToRegister} className="!p-0">
                      {t("auth.register")}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <span className="text-foreground-subtle text-sm">
                      {t("auth.haveAccountText")}
                    </span>
                    <Button type="link" onClick={switchToLogin} className="!p-0">
                      {t("auth.loginButton")}
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div
          className="absolute right-6 bottom-6 left-6 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <ThemeSwitcher />
          <LanguageSwitch />
        </motion.div>
      </motion.div>
    </div>
  );
}
