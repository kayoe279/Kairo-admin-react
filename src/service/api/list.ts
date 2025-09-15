import { mockRequest } from "@/service";

export const getTableList = <T = any>(params: Record<string, any>) =>
  mockRequest.Get<Service.ResponseListResult<T>>("/api/table/list", { params });
