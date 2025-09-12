/**
 * 后台服务的环境类型
 * - development: 开发环境
 * - production: 生产环境
 */
type ServiceEnvType = "development" | "production";

interface ImportMetaEnv {
  /** 端口 */
  readonly VITE_PORT: number;
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** API 地址 */
  readonly VITE_API_ENDPOINT: string;
  /** mock API 地址 */
  readonly VITE_MOCK_API_ENDPOINT: string;
  /** 是否启用mock */
  readonly VITE_USE_MOCK: boolean;
  /** 是否启用logger mock */
  readonly VITE_LOGGER_MOCK: boolean;
  /** APP标题 */
  readonly VITE_GLOB_APP_TITLE: string;
  /** 应用简称 */
  readonly VITE_GLOB_APP_SHORT_NAME: string;
  /** 图标前缀 */
  readonly VITE_ICON_PREFIX: string;
  /** 本地svg图标前缀 */
  readonly VITE_ICON_LOCAL_PREFIX: string;
  /** 是否自动刷新token */
  readonly VITE_AUTO_REFRESH_TOKEN: "Yes" | "No";
  /** 路由加载模式 */
  readonly VITE_ROUTE_LOAD_MODE: "static" | "dynamic";
  /** 缓存过期时间 */
  readonly VITE_CACHE_EXPIRE: string;
  /** 默认语言 */
  readonly VITE_DEFAULT_LOCALE: "zh-CN" | "en-US";
  /** 后端服务的环境类型 */
  readonly MODE: ServiceEnvType;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
