import { request } from "@/service";
import type { DynamicRouteConfig, UserInfo } from "@/types";

interface LoginParams {
  username: string;
  password: string;
}

export const login = (data: LoginParams) => {
  const methodInstance = request.Post<Service.ResponseResult<UserInfo>>("/login", data);
  methodInstance.meta = {
    authRole: null,
  };
  return methodInstance;
};

export const refreshToken = (data: any) => {
  const method = request.Post<Service.ResponseResult<UserInfo>>("/updateToken", data);
  method.meta = {
    authRole: "refreshToken",
  };
  return method;
};

export const getUserRoutes = async (params: { id: number }) => {
  const res = await request.Get<Service.ResponseResult<DynamicRouteConfig[]>>(
    "/getUserRoutes-react",
    {
      params,
    }
  );
  return res;
};
