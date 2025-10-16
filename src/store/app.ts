import omit from "lodash-es/omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { setValueByPath } from "@/lib";
import { type AppSettingProps, appSetting } from "@/lib/settings/app";
import type { NestedKeyOf, PathValue } from "@/types";

interface AppState extends AppSettingProps {
  collapsed: boolean; // 菜单是否收缩
  fullScreen: boolean; // 是否全屏
  refreshing: boolean; // 是否刷新
  refreshKey: number; // 刷新键
}

interface AppActions {
  updateAppSetting: <P extends NestedKeyOf<AppSettingProps>>(
    path: P,
    value: PathValue<AppSettingProps, P>
  ) => void;
  toggleCollapsed: (value?: boolean) => void;
  toggleRefreshing: (value?: boolean) => void;
  toggleFullScreen: (value?: boolean) => void;
  refreshPage: (duration?: number, cb?: () => void) => Promise<void>;
  resetAppSetting: () => void;
}

type AppStore = AppState & { actions: AppActions };

export const useAppStore = create<AppStore>()(
  persist(
    immer<AppStore>((set, get, store) => ({
      ...appSetting,
      collapsed: false,
      refreshing: false,
      fullScreen: false,
      refreshKey: 0,

      // Actions
      actions: {
        // 路径设置方法：通过路径字符串设置值，如 "headerSetting.height"
        updateAppSetting: (path, value) =>
          set((state) => {
            if (value == null) return;
            setValueByPath(state, path, value);
          }),

        toggleCollapsed: (value) =>
          set((state) => {
            state.collapsed = value !== undefined ? value : !state.collapsed;
          }),

        toggleRefreshing: (value) =>
          set((state) => {
            state.refreshing = value !== undefined ? value : !state.refreshing;
          }),

        toggleFullScreen: (value) =>
          set((state) => {
            state.fullScreen = value !== undefined ? value : !state.fullScreen;
          }),

        refreshPage: async (duration = 500, cb?) => {
          set((state) => {
            state.refreshKey = state.refreshKey + 1;
          });
          const { isPageAnimate, refreshing, actions } = get();
          if (refreshing) return;
          actions.toggleRefreshing(true);
          const d = isPageAnimate ? duration : 40;
          await new Promise((resolve) => {
            setTimeout(resolve, d);
          });
          actions.toggleRefreshing(false);
          cb?.();
        },

        resetAppSetting: () => set(store.getInitialState())
      }
    })),
    {
      name: "app-store",
      partialize: (state) => omit(state, ["actions"])
    }
  )
);

// Selectors Hooks
export const useAppSettings = () => useAppStore((state) => state);
export const useAppActions = () => useAppStore((state) => state.actions);
