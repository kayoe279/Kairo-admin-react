/** 默认实例的Alova配置 */
export const DEFAULT_ALOVA_OPTIONS = {
  timeout: 15 * 1000,
};

/** 默认实例的后端字段配置 */
export const DEFAULT_BACKEND_OPTIONS = {
  codeKey: "code",
  dataKey: "data",
  msgKey: "message",
  successCode: 200,
} as const;

/** 请求不成功各种状态的错误 */
export const ERROR_STATUS = {
  default: "请求错误",
  400: "请求出现语法错误",
  401: "用户未授权",
  403: "服务器拒绝请求",
  404: "请求的资源不存在",
  405: "请求方法未允许",
  408: "网络请求超时",
  500: "服务器内部错误",
  501: "服务器不支持请求的功能",
  502: "错误网关",
  503: "服务器不可用",
  504: "网关超时",
  505: "HTTP版本不受支持",
};

/** 没有错误提示的code */
export const ERROR_NO_TIP_STATUS = [10000];
