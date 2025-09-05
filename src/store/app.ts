import omit from "lodash-es/omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { setValueByPath } from "@/lib";
import { defaultLocale, setI18nLocale } from "@/lib/i18n";
import { appSetting, type AppSettingProps } from "@/lib/settings/app";
import { getCurrentLocale, setCurrentLocale } from "@/lib/storage";
import type { NestedKeyOf, PathValue } from "@/types";

interface AppState extends AppSettingProps {
  locale: Locale;
  reloadFlag: boolean;
  collapsed: boolean;
  fullScreen: boolean;
}

interface AppActions {
  setNavTheme: (value: string) => void;
  setNavMode: (value: AppSettingProps["navMode"]) => void;
  setSettingByPath: <P extends NestedKeyOf<AppSettingProps>>(
    path: P,
    value: PathValue<AppSettingProps, P>
  ) => void;
  setLocale: (value: Locale) => void;
  toggleCollapsed: (value?: boolean) => void;
  toggleReloadFlag: (value?: boolean) => void;
  toggleFullScreen: (value?: boolean) => void;
  resetAppSetting: () => void;
  reloadPage: (duration?: number) => void;
}

type AppStore = AppState & { actions: AppActions };

export const useAppStore = create<AppStore>()(
  persist(
    immer<AppStore>((set, get, store) => ({
      ...appSetting,
      locale: getCurrentLocale() || defaultLocale,
      collapsed: false,
      reloadFlag: true,
      fullScreen: false,

      // Actions
      actions: {
        setNavTheme: (value) =>
          set((state) => {
            state.navTheme = value;
          }),

        setNavMode: (value) =>
          set((state) => {
            state.navMode = value;
          }),

        // 路径设置方法：通过路径字符串设置值，如 "headerSetting.height"
        setSettingByPath: (path, value) =>
          set((state) => {
            if (value == null) return;
            setValueByPath(state, path, value);
          }),

        setLocale: (value) => {
          setI18nLocale(value);
          setCurrentLocale(value);
          set((state) => {
            state.locale = value;
          });
        },

        toggleCollapsed: (value) =>
          set((state) => {
            state.collapsed = value !== undefined ? value : !state.collapsed;
          }),

        toggleReloadFlag: (value) =>
          set((state) => {
            state.reloadFlag = value !== undefined ? value : !state.reloadFlag;
          }),

        toggleFullScreen: (value) =>
          set((state) => {
            state.fullScreen = value !== undefined ? value : !state.fullScreen;
          }),

        resetAppSetting: () => set(store.getInitialState()),

        reloadPage: async (duration = 300) => {
          const { isPageAnimate, actions } = get();
          actions.toggleReloadFlag(false);
          const d = isPageAnimate ? duration : 40;
          await new Promise((resolve) => {
            setTimeout(resolve, d);
          });
          actions.toggleReloadFlag(true);
        },
      },
    })),
    {
      name: "app-store",
      partialize: (state) => omit(state, ["actions"]),
    }
  )
);

// Selectors Hooks
export const useAppSettings = () => useAppStore((state) => state);
export const useAppActions = () => useAppStore((state) => state.actions);
