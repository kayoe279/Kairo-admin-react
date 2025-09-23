import type { Session } from "@supabase/supabase-js";
import { STORAGE_USER_INFO } from "./constants";
import { local } from "./storage";

// const CACHE_EXPIRE = Number(import.meta.env.VITE_CACHE_EXPIRE) as number; // 7天

// 用户信息
export const getSession = () => {
  return local.get(STORAGE_USER_INFO) as Session;
};
export const getUserInfo = () => {
  return getSession()?.user;
};
export const removeUserInfo = () => {
  local.remove(STORAGE_USER_INFO);
};

// 校验是否过期
export const isExpired = (expires_at: number) => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const isExpired = nowInSeconds >= expires_at;
  return isExpired;
};

// 获取 supabase access token
export const getAccessToken = () => {
  const data = getSession();
  if (data) {
    if (isExpired(data.expires_at || 0)) {
      return null;
    }
    return data.access_token;
  }
  return null;
};
