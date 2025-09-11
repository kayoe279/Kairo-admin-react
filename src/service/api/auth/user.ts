import { mockRequest } from "@/service";
import type { UserListParams, UserListResponse } from "@/types/api";

export const getUserList = (params: UserListParams) =>
  mockRequest.Get<UserListResponse>("/api/table/list", { params });

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return mockRequest.Get("/admin_info", {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

/**
 * @description: 用户登录
 */
export function login(params: Record<string, any>) {
  return mockRequest.Post(
    "/login",
    {
      params,
    },
    {
      meta: {
        isReturnNativeResponse: true,
      },
    }
  );
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params: Record<string, any>, uid: string) {
  return mockRequest.Post(`/user/u${uid}/changepw`, { params });
}

/**
 * @description: 用户登出
 */
export function logout(params: Record<string, any>) {
  return mockRequest.Post("/login/logout", {
    params,
  });
}
