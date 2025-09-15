import { createAlovaMockAdapter } from "@alova/mock";
import { createAlova } from "alova";
import { createServerTokenAuthentication } from "alova/client";
import adapterFetch from "alova/fetch";
import ReactHook, { type ReactHookType } from "alova/react";
import { message } from "antd";
import { getUserToken } from "@/lib/cookie";
import { DEFAULT_ALOVA_OPTIONS, DEFAULT_BACKEND_OPTIONS } from "./config";
import {
  handleBusinessError,
  handleRefreshToken,
  handleResponseError,
  handleServiceResult,
} from "./handle";
import { mocks } from "./mocks";

const { VITE_USE_MOCK, VITE_LOGGER_MOCK } = import.meta.env;

const mockAdapter = createAlovaMockAdapter(mocks, {
  // 全局控制是否启用mock接口，默认为true
  enable: VITE_USE_MOCK,

  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: adapterFetch(),

  // mock接口响应延迟，单位毫秒
  delay: 1000,

  // 自定义打印mock接口请求信息
  mockRequestLogger: (res) => {
    if (VITE_LOGGER_MOCK) {
      console.log(`Mock Request ${res.url}`, res);
    }
  },
  onMockError(error, currentMethod) {
    console.error("🚀 ~ onMockError ~ currentMethod:", currentMethod);
    console.error("🚀 ~ onMockError ~ error:", error);
  },
});

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<ReactHookType>({
  // 服务端判定token过期
  refreshTokenOnSuccess: {
    // 当服务端返回401时，表示token过期
    isExpired: (response, method) => {
      const isExpired = method.meta && method.meta.isExpired;
      return response.status === 401 && !isExpired;
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async (_response, method) => {
      // 此处采取限制，防止过期请求无限循环重发
      if (!method.meta) method.meta = { isExpired: true };
      else method.meta.isExpired = true;

      await handleRefreshToken();
    },
  },
  // 添加token到请求头
  assignToken: (method) => {
    const token = getUserToken();
    method.config.headers.Authorization = `Bearer ${token}`;
  },
});

// docs path of alova.js https://alova.js.org/
export function createAlovaInstance(
  alovaConfig: Service.AlovaConfig,
  backendConfig?: Service.BackendConfig
) {
  const _alovaConfig = { ...DEFAULT_ALOVA_OPTIONS, ...alovaConfig };
  const _backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig };

  return createAlova({
    ...alovaConfig,
    baseURL: _alovaConfig.baseURL,
    statesHook: ReactHook,
    requestAdapter: mockAdapter,
    timeout: _alovaConfig.timeout,
    cacheLogger: process.env.NODE_ENV === "development",

    beforeRequest: onAuthRequired((method) => {
      if (method.meta?.isFormPost) {
        method.config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        method.data = new URLSearchParams(method.data as URLSearchParams).toString();
      }
      alovaConfig.beforeRequest?.(method);
    }),
    responded: onResponseRefreshToken({
      // 请求成功的拦截器
      onSuccess: async (response, method) => {
        const { status } = response;

        if (status === 200) {
          // 返回blob数据
          if (method.meta?.isBlob) return response.blob();

          // 返回json数据
          const apiData = (response.json && (await response.json())) || response.body;
          // 请求成功
          if (apiData[_backendConfig.codeKey] === _backendConfig.successCode) {
            return handleServiceResult(apiData);
          }

          // 业务请求失败
          const errorResult = handleBusinessError(apiData, _backendConfig);
          return handleServiceResult(errorResult, false);
        }

        // 接口请求失败
        const errorResult = handleResponseError(response);
        return handleServiceResult(errorResult, false);
      },
      onError: (error, method) => {
        const tip = `[${method.type}] - [${method.url}]  ${error?.message ? "-" + error.message : ""}`;
        message.warning(tip);
      },

      onComplete: async () => {
        // 处理请求完成逻辑
      },
    }),
  });
}

export const request = createAlovaInstance({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export const mockRequest = createAlovaInstance({
  baseURL: import.meta.env.VITE_MOCK_API_ENDPOINT,
});
