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
import type { UserInfo } from "@/types";
import { useRouteStore } from "./route";
import { useTabsStore } from "./tabs";

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  isAuthenticated: () => boolean;
}

interface UserActions {
  updateUserInfo: (result: UserInfo) => void;
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

    isAuthenticated: () => {
      const { token } = get();
      const userToken = getUserToken();
      const userInfo = getUserInfo();
      return !!userInfo && !!token && !!userToken && userToken === token;
    },

    actions: {
      updateUserInfo: (result: UserInfo) => {
        const { accessToken, refreshToken } = result;
        setUserToken(accessToken);
        setRefreshToken(refreshToken);
        setUserInfo(result);

        set((state) => {
          state.token = accessToken;
          state.userInfo = result;
        });
      },

      logout: async (navigate?, currentPath = "/", ignoreAuth = false) => {
        const tabsActions = useTabsStore.getState().actions;
        const routeActions = useRouteStore.getState().actions;
        removeUserToken();
        removeRefreshToken();
        removeUserInfo();

        set((state) => {
          state.token = null;
          state.userInfo = null;
        });

        if (!ignoreAuth && navigate) {
          navigate("/auth/login", {
            state: { redirect: currentPath },
          });
        }
        setTimeout(() => {
          routeActions.resetAuthRoute();
          tabsActions.clearAllTabs();
        }, 500);
      },
    },
  }))
);

// Selectors Hooks
export const useIsAuthenticated = () => useUserStore((s) => s.isAuthenticated());
export const useUserInfo = () => useUserStore((s) => s.userInfo);
export const useUserToken = () => useUserStore((s) => s.token);
export const useUserActions = () => useUserStore((s) => s.actions);
