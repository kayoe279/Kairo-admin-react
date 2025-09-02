import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUsTrans from "./locales/en-US.json";
import zhCnTrans from "./locales/zh-CN.json";

export const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE;

export const $t = i18n.t;

i18n.use(initReactI18next).init({
  resources: {
    "en-US": {
      translation: enUsTrans,
    },
    "zh-CN": {
      translation: zhCnTrans,
    },
  },
  fallbackLng: defaultLocale,
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export function setI18nLocale(locale: Locale) {
  i18n.changeLanguage(locale);
}

export default i18n;
