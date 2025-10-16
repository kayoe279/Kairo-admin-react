export const DRAWER_WIDTH = 360;

export const PAGE = {
  LOGIN_NAME: "login",
  LOGIN_PATH: "/auth/login",
  REDIRECT_NAME: "redirect",
  REDIRECT_PATH: "/redirect",
  ERROR_PAGE_NAME: "404",
  HOME_NAME: "dashboard",
  HOME_NAME_REDIRECT: "dashboardWorkplace",
  HOME_NAME_REDIRECT_PATH: "/dashboard/workplace",
  FORBIDDEN_PATH: "/403"
} as const;

export const IS_SCREEN_LOCKED = "IS-SCREEN-LOCKED"; // 是否锁屏
export const TABS_ROUTES = "TABS-ROUTES"; // 标签页
export const TAB_DATA_ID = "tab-data-id";

export const STORAGE_USER_INFO = "sb-tchgfivcmqemssvxxagk-auth-token";

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;
export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50, 100];
export const PAGE_NAME = "page";
export const PAGE_SIZE_NAME = "pageSize";
export const SORT_BY_NAME = "sortBy";
export const SORT_ORDER_NAME = "sortOrder";
