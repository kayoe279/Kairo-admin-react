import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "./constants";
import Cookies from "js-cookie";

const CACHE_EXPIRE = import.meta.env.VITE_CACHE_EXPIRE; // 7天

// 用户token
export const getUserToken = () => {
  return Cookies.get(COOKIE_ACCESS_TOKEN);
};

export const setUserToken = (token: string) => {
  Cookies.set(COOKIE_ACCESS_TOKEN, token, {
    expires: new Date(new Date().getTime() + CACHE_EXPIRE * 1000)
  });
};

export const removeUserToken = () => {
  Cookies.remove(COOKIE_ACCESS_TOKEN);
};
// 刷新token
export const getRefreshToken = () => {
  return Cookies.get(COOKIE_REFRESH_TOKEN);
};
export const setRefreshToken = (refreshToken: string) => {
  Cookies.set(COOKIE_REFRESH_TOKEN, refreshToken, {
    expires: new Date(new Date().getTime() + CACHE_EXPIRE * 1000)
  });
};
export const removeRefreshToken = () => {
  Cookies.remove(COOKIE_REFRESH_TOKEN);
};
