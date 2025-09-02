import type { PaginationResponse } from "./pagination";

export interface UserListParams extends Service.RequestParams {
  keyword?: string;
}

export type User = {
  avatar: string;
  city: string;
  createDate: string;
  email: string;
  name: string;
  sex: string;
  status: string;
  type: string;
};

export type UserData = PaginationResponse<User[]>;

export type UserListResponse = Service.ResponseResult<UserData>;
