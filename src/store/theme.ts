import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { themeSetting, type ThemeSettingProps } from "@/lib/settings/theme";
import { lighten } from "@/lib/utils";

// Types
export type ThemeType = "primary" | "info" | "success" | "warning" | "error";
export type ThemeMode = "light" | "dark" | "auto";

interface ThemeState {
  settings: ThemeSettingProps;
  getThemeOverrides: () => Record<string, any>;
}

interface ThemeActions {
  setThemeColor: (type: ThemeType, value: string) => void;
  toggleGrayMode: (value: boolean) => void;
  setAppThemeVariable: (value?: string) => void;
  resetDesignSetting: () => void;
}

type ThemeStore = ThemeState & { actions: ThemeActions };

export const useThemeStore = create<ThemeStore>()(
  persist(
    immer((set, get, store) => ({
      // Initial state
      settings: { ...themeSetting },

      // Get theme overrides for UI libraries (adjust according to your needs)
      getThemeOverrides: () => {
        const { settings } = get();
        const { themeColor, infoColor, successColor, warningColor, errorColor } = settings;

        const primaryLight = lighten(themeColor, 6);
        const infoLight = lighten(infoColor, 6);
        const successLight = lighten(successColor, 6);
        const warningLight = lighten(warningColor, 6);
        const errorLight = lighten(errorColor, 6);

        return {
          common: {
            primaryColor: themeColor,
            primaryColorHover: primaryLight,
            primaryColorPressed: primaryLight,
            primaryColorSuppl: themeColor,

            infoColor: infoColor,
            infoColorHover: infoLight,
            infoColorPressed: infoLight,
            infoColorSuppl: infoColor,

            successColor: successColor,
            successColorHover: successLight,
            successColorPressed: successLight,
            successColorSuppl: successColor,

            warningColor: warningColor,
            warningColorHover: warningLight,
            warningColorPressed: warningLight,
            warningColorSuppl: warningColor,

            errorColor: errorColor,
            errorColorHover: errorLight,
            errorColorPressed: errorLight,
            errorColorSuppl: errorColor,

            borderRadius: "5px",
          },
          LoadingBar: {
            colorLoading: themeColor,
          },
          Menu: {
            borderRadius: "12px",
          },
          Dropdown: {
            borderRadius: "8px",
          },
          Card: {
            borderRadius: "12px",
          },
          Dialog: {
            borderRadius: "8px",
          },
        };
      },

      actions: {
        // 设置 app 颜色主题变量
        setAppThemeVariable: (value?: string) => {
          const { settings } = get();
          const themeColor = value || settings.themeColor;
          if (typeof document !== "undefined") {
            document.documentElement.style.setProperty("--fg-primary", themeColor);
          }
        },

        // 设置 app 颜色主题
        setThemeColor: (type: ThemeType, value: string) => {
          set((state) => {
            if (type === "primary") {
              state.settings.themeColor = value;
            } else if (type === "info") {
              state.settings.infoColor = value;
            } else if (type === "success") {
              state.settings.successColor = value;
            } else if (type === "warning") {
              state.settings.warningColor = value;
            } else if (type === "error") {
              state.settings.errorColor = value;
            }
          });
        },

        // 设置灰色模式
        toggleGrayMode: (value: boolean) => {
          if (typeof document !== "undefined") {
            if (value) {
              document.body.classList.add("gray-mode");
            } else {
              document.body.classList.remove("gray-mode");
            }
          }

          set((state) => {
            state.settings.grayMode = value;
          });
        },

        // 重置store
        resetDesignSetting: () => {
          set(store.getInitialState());
        },
      },
    })),
    {
      name: "theme-store",
      partialize: (state) => ({
        settings: state.settings,
      }),
    }
  )
);

// Selectors Hooks
export const useThemeSettings = () => useThemeStore((s) => s.settings);
export const useThemeOverrides = () => useThemeStore((s) => s.getThemeOverrides());
export const useThemeActions = () => useThemeStore((s) => s.actions);

// Initialize theme on store creation
// if (typeof window !== "undefined") {
//   // Set initial theme variable
//   useThemeStore.getState().actions.setAppThemeVariable();

//   // Listen for system theme changes
//   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//   mediaQuery.addEventListener("change", () => {
//     useThemeStore.getState().actions.updateSystemTheme();
//   });
// }
