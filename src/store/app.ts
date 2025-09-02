import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { defaultLocale, setI18nLocale } from "@/lib/i18n";
import { appSetting, type AppSettingProps } from "@/lib/settings/app";
import { getCurrentLocale, setCurrentLocale } from "@/lib/storage";

interface AppState {
  settings: AppSettingProps;
  locale: Locale;
  reloadFlag: boolean;
  open: boolean;
  fullScreen: boolean;
}

interface AppActions {
  setNavTheme: (value: string) => void;
  setNavMode: (value: AppSettingProps["navMode"]) => void;
  setLocale: (value: Locale) => void;
  toggleDrawer: (value?: boolean) => void;
  toggleReloadFlag: (value?: boolean) => void;
  toggleFullScreen: (value?: boolean) => void;
  resetAppSetting: () => void;
  reloadPage: (duration?: number) => void;
}

type AppStore = AppState & { actions: AppActions };

export const useAppStore = create<AppStore>()(
  persist(
    immer<AppStore>((set, get, store) => ({
      // Initial state
      settings: { ...appSetting },
      locale: getCurrentLocale() || defaultLocale,
      open: false,
      reloadFlag: true,
      fullScreen: false,

      // Actions
      actions: {
        setNavTheme: (value) =>
          set((state) => {
            state.settings.navTheme = value;
          }),

        setNavMode: (value) =>
          set((state) => {
            state.settings.navMode = value;
          }),

        setLocale: (value) => {
          setI18nLocale(value);
          setCurrentLocale(value);
          set((state) => {
            state.locale = value;
          });
        },

        toggleDrawer: (value) =>
          set((state) => {
            state.open = value !== undefined ? value : !state.open;
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
          const { settings, actions } = get();
          actions.toggleReloadFlag(false);
          const d = settings.isPageAnimate ? duration : 40;
          await new Promise((resolve) => {
            setTimeout(resolve, d);
          });
          actions.toggleReloadFlag(true);
        },
      },
    })),
    {
      name: "app-store",
      // ✅ 只持久化必要字段，避免存储临时状态
      partialize: (state) => ({
        settings: state.settings,
        locale: state.locale,
      }),
    }
  )
);

// Selectors Hooks
export const useAppLocale = () => useAppStore((s) => s.locale);
export const useAppSettings = () => useAppStore((s) => s.settings);
export const useAppDrawerOpen = () => useAppStore((s) => s.open);
export const useAppFullScreen = () => useAppStore((s) => s.fullScreen);
export const useAppReloadFlag = () => useAppStore((s) => s.reloadFlag);
export const useAppActions = () => useAppStore((s) => s.actions);
