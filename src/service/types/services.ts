// 分页参数类型
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface RequestParams extends PaginationParams {
  [key: string]: any;
}

export interface ResponseListResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  status?: number;
  statusText?: string;
  error?: any | null;
}
