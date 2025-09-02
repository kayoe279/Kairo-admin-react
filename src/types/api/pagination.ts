export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

export type PaginationResponse<T> = Pagination & {
  list: T;
};
