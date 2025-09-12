import { mockRequest } from "@/service";

export const getTableList = (params: Record<string, any>) =>
  mockRequest.Get("/api/table/list", { params });
