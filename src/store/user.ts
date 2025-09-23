import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getAccessToken, getUserInfo, removeUserInfo } from "@/lib/cookie";
import { useRouteStore } from "./route";
import { useTabsStore } from "./tabs";

interface UserState {
  userInfo: User | null;
  token: string | null;
  isAuthenticated: () => boolean;
}

interface UserActions {
  updateUserInfo: (result: User) => void;
  logout: (
    navigate?: (path: string, options?: any) => void,
    currentPath?: string,
    ignoreAuth?: boolean
  ) => Promise<void>;
}

type UserStore = UserState & { actions: UserActions };

export const useUserStore = create<UserStore>()(
  immer((set) => ({
    userInfo: getUserInfo(),
    token: getAccessToken() || null,

    isAuthenticated: () => {
      const userInfo = getUserInfo();
      const accessToken = getAccessToken();
      return !!userInfo && !!accessToken;
    },

    actions: {
      updateUserInfo: (result: User) => {
        set((state) => {
          state.userInfo = result;
        });
      },

      logout: async (navigate?, currentPath = "/", ignoreAuth = false) => {
        const tabsActions = useTabsStore.getState().actions;
        const routeActions = useRouteStore.getState().actions;
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
