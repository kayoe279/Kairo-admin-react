import type { Rule } from "antd/es/form";
import type { TFunction } from "i18next";

/**
 * 密码强度验证
 * 要求包含：小写字母、大写字母、数字
 */
export const validatePasswordStrength = (password: string): boolean => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasLowercase && hasUppercase && hasNumber;
};

/**
 * 获取密码验证规则
 */
export const getPasswordRules = (t: TFunction<"translation", undefined>): Rule[] => [
  { required: true, message: t("auth.passwordRequired") },
  { min: 6, message: t("auth.passwordMinLength") },
  {
    validator: (_, value) => {
      if (!value) return Promise.resolve();

      if (!validatePasswordStrength(value)) {
        return Promise.reject(new Error(t("auth.passwordStrengthError")));
      }

      return Promise.resolve();
    }
  }
];

/**
 * 获取确认密码验证规则
 */
export const getConfirmPasswordRules = (t: TFunction<"translation", undefined>): Rule[] => [
  { required: true, message: t("auth.checkPasswordRequired") },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(t("auth.passwordMismatch")));
    }
  })
];

/**
 * 获取邮箱验证规则
 */
export const getEmailRules = (t: TFunction<"translation", undefined>): Rule[] => [
  { required: true, message: t("auth.emailRequired") },
  { type: "email", message: t("auth.emailValidation") }
];

/**
 * 获取姓名验证规则
 */
export const getFullNameRules = (t: TFunction<"translation", undefined>): Rule[] => [
  { min: 2, message: t("auth.fullNameMinLength") }
];
