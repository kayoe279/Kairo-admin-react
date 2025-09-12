import { message } from "antd";
import { getRefreshToken, setRefreshToken, setUserToken } from "@/lib/cookie";
import { refreshToken } from "@/service/api";
import { useUserStore } from "@/store";
import { ERROR_NO_TIP_STATUS, ERROR_STATUS } from "./config";

type ErrorStatus = keyof typeof ERROR_STATUS;

export const showError = (error: Service.RequestError) => {
  // 如果error不需要提示,则跳过
  const code = Number(error.code);
  if (ERROR_NO_TIP_STATUS.includes(code)) return;

  message.error(error.message);
};

/**
 * @description: 处理请求成功，但返回后端服务器报错
 * @param {Response} response
 */
export const handleResponseError = (response: Response) => {
  const error: Service.RequestError = {
    errorType: "Response Error",
    code: 0,
    message: ERROR_STATUS.default,
    data: null,
  };
  const errorCode: ErrorStatus = response.status as ErrorStatus;
  const message = ERROR_STATUS[errorCode] || ERROR_STATUS.default;
  Object.assign(error, { code: errorCode, message });

  showError(error);

  return error;
};

/**
 * @description:
 * @param {Record} data 接口返回的后台数据
 * @param {Service} config 后台字段配置
 */
export const handleBusinessError = (
  data: Record<string, any>,
  config: Required<Service.BackendConfig>
) => {
  const { codeKey, msgKey } = config;
  const error: Service.RequestError = {
    errorType: "Business Error",
    code: data[codeKey],
    message: data[msgKey],
    data: data.data,
  };

  showError(error);

  return error;
};

/**
 * @description: 统一成功和失败返回类型
 * @param {any} data
 * @param {boolean} isSuccess
 */
export const handleServiceResult = (data: any, isSuccess: boolean = true) => {
  const result = {
    isSuccess,
    errorType: null,
    ...data,
  };
  return result;
};

export const handleRefreshToken = async () => {
  const logout = useUserStore.getState().actions.logout;
  const isAutoRefresh = import.meta.env.VITE_AUTO_REFRESH_TOKEN === "Yes";
  if (!isAutoRefresh) {
    await logout();
    return;
  }
  // 刷新token
  const { data } = await refreshToken({ refreshToken: getRefreshToken() });
  if (data) {
    setUserToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  } else {
    // 刷新失败，退出
    await logout();
  }
};
