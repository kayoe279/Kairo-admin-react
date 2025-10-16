import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enUsTrans from "./locales/en-US.json";
import zhCnTrans from "./locales/zh-CN.json";

export const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE;

export type Locale = "zh-CN" | "en-US";

export const locales: Locale[] = ["zh-CN", "en-US"];

export const resources = {
  "zh-CN": {
    translation: zhCnTrans
  },
  "en-US": {
    translation: enUsTrans
  }
} as const;

export type Resources = typeof resources;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false
    },
    debug: false,
    detection: {
      // 👇 配置优先级
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"] // 存储到 localStorage
    }
  });

export function setI18nLocale(locale: Locale) {
  i18n.changeLanguage(locale);
}

export const $t = i18n.t;

export default i18n;
