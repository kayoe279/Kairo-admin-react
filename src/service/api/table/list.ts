import { mockRequest } from "@/service";

export const getTableList = (params: Recordable) => mockRequest.Get("/api/table/list", { params });
