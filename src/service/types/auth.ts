import type { AuthError, Session, User } from "@supabase/supabase-js";

export type RoleType = "super" | "admin" | "user";

export interface LoginParams {
  username: string;
  password: string;
}

// 登录请求参数类型
export interface LoginCredentials {
  email: string;
  password: string;
}

type UserMetadata = {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  roles?: RoleType[];
};

// 注册请求参数类型
export interface RegisterCredentials {
  email: string;
  password: string;
  options?: {
    data?: UserMetadata;
  };
}

// 更新用户信息参数类型
export interface UpdateUserData {
  email?: string;
  password?: string;
  data?: UserMetadata;
}

// API 响应类型
export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error?: AuthError | null;
}
