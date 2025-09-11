import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  getUserToken,
  removeRefreshToken,
  removeUserToken,
  setRefreshToken,
  setUserToken,
} from "@/lib/cookie";
import { getUserInfo, removeUserInfo, setUserInfo } from "@/lib/storage";

interface UserState {
  userInfo: Api.Login.Info | null;
  token: string | null;
  initRoutes?: () => Promise<void>;
  clearTabs?: () => void;
  isAuthenticated: () => boolean;
}

interface UserActions {
  handleLoginInfo: (
    result: Api.Login.Info,
    navigate?: (path: string) => void,
    redirectPath?: string
  ) => Promise<void>;
  logout: (
    navigate?: (path: string, options?: any) => void,
    currentPath?: string,
    ignoreAuth?: boolean
  ) => Promise<void>;
}

type UserStore = UserState & { actions: UserActions };

export const useUserStore = create<UserStore>()(
  immer((set, get) => ({
    userInfo: getUserInfo(),
    token: getUserToken() || null,
    initRoutes: undefined,
    clearTabs: undefined,
    isAuthenticated: () => {
      const { token } = get();
      const userToken = getUserToken();
      const userInfo = getUserInfo();
      return !!userInfo && !!token && !!userToken && userToken === token;
    },

    actions: {
      handleLoginInfo: async (result: Api.Login.Info, navigate?, redirectPath = "/") => {
        const { accessToken, refreshToken } = result;
        setUserToken(accessToken);
        setRefreshToken(refreshToken);
        setUserInfo(result);

        set((state) => {
          state.token = accessToken;
          state.userInfo = result;
        });

        // TODO: 初始化路由
        // const { initRoutes } = get();
        // if (initRoutes) {
        //   await initRoutes();
        // }
        if (navigate) {
          const toPath = decodeURIComponent(redirectPath);
          navigate(toPath);
        }
      },

      logout: async (navigate?, currentPath = "/", ignoreAuth = false) => {
        removeUserToken();
        removeRefreshToken();
        removeUserInfo();

        const { clearTabs } = get();
        if (clearTabs) {
          clearTabs();
        }
        set((state) => {
          state.token = null;
          state.userInfo = null;
        });

        if (!ignoreAuth && navigate) {
          navigate("/auth/login", {
            state: { redirect: currentPath },
          });
        }
      },
    },
  }))
);

// Selectors Hooks
export const useIsAuthenticated = () => useUserStore((s) => s.isAuthenticated());
export const useUserInfo = () => useUserStore((s) => s.userInfo);
export const useUserToken = () => useUserStore((s) => s.token);
export const useUserActions = () => useUserStore((s) => s.actions);
