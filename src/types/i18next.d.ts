import "i18next";
import type { Resources } from "../lib/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    // 定义 resources 类型
    resources: Resources["en-US"];
  }
}
