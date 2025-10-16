import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { ButtonIcon } from "@/components/ui";
import { type Locale, locales, setI18nLocale } from "@/lib/i18n";

export const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const localeOptions: MenuProps["items"] = locales.map((localeKey) => ({
    key: localeKey,
    label: t(`app.${localeKey}`)
  }));

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    setI18nLocale(key as Locale);
  };

  return (
    <Dropdown
      menu={{
        items: localeOptions,
        onClick: handleMenuClick,
        selectedKeys: [locale]
      }}
      trigger={["hover"]}
      placement="bottom"
    >
      <ButtonIcon icon="heroicons:language" hideTooltip />
    </Dropdown>
  );
};
