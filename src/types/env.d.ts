/**
 *后台服务的环境类型
 * - dev: 后台开发环境
 * - test: 后台测试环境
 * - prod: 后台生产环境
 */
type ServiceEnvType = "dev" | "test" | "prod";

interface ImportMetaEnv {
  /** 端口 */
  readonly VITE_PORT: number;
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** 项目公共路径 */
  readonly VITE_PUBLIC_PATH: string;
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: "Y" | "N";
  /** 是否开启打包压缩 */
  readonly VITE_BUILD_COMPRESS?: "Y" | "N";
  /** 压缩算法类型 */
  readonly VITE_COMPRESS_TYPE?: "gzip" | "brotliCompress" | "deflate" | "deflateRaw";
  /** 路由模式 */
  readonly VITE_ROUTE_MODE?: "hash" | "web";
  /** 路由加载模式 */
  readonly VITE_ROUTE_LOAD_MODE: "static" | "dynamic";
  /** 首次加载页面 */
  readonly VITE_HOME_PATH: string;
  /** 版权信息 */
  readonly VITE_COPYRIGHT_INFO: string;
  /** 是否自动刷新token */
  readonly VITE_AUTO_REFRESH_TOKEN: "Yes" | "No";
  /** 默认语言 */
  readonly VITE_DEFAULT_LOCALE: "zh-CN" | "en-US";
  /** 后端服务的环境类型 */
  readonly MODE: ServiceEnvType;
  /** API 地址 */
  readonly VITE_API_ENDPOINT: string;
  /** mock API 地址 */
  readonly VITE_MOCK_API_ENDPOINT: string;
  /** 路由加载模式 */
  readonly VITE_ROUTER_LOAD_MODE: "static" | "dynamic";
  /** 缓存过期时间 */
  readonly VITE_CACHE_EXPIRE: number;
  /** 本地svg图标前缀 */
  readonly VITE_ICON_LOCAL_PREFIX: string;
  /** 本地svg图标前缀 */
  readonly VITE_ICON_PREFIX: string;
  /** APP标题 */
  readonly VITE_GLOB_APP_TITLE: string;
  /** 应用简称 */
  readonly VITE_GLOB_APP_SHORT_NAME: string;
  /** 请求代理 */
  readonly VITE_PROXY: Array<[string, string]>;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
