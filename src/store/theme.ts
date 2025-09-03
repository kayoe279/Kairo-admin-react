import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { generateColorPalette } from "@/lib";
import { themeSetting, type ThemeSettingProps } from "@/lib/settings/theme";

export type ThemeType = "primary" | "secondary" | "success" | "warning" | "danger";
export type ThemeMode = "light" | "dark" | "auto";
interface ThemeState {
  settings: ThemeSettingProps;
}
type ThemeColorProps = {
  type: ThemeType;
  color?: string;
  isDarkMode?: boolean;
};
interface ThemeActions {
  setThemeColor: (props: ThemeColorProps) => void;
  setAllThemeColor: (props: Partial<ThemeColorProps>) => void;
  resetThemeColor: (props: Partial<ThemeColorProps>) => void;
  toggleGrayMode: (value: boolean) => void;
  resetThemeStore: (isDarkMode: boolean) => void;
}

type ThemeStore = ThemeState & { actions: ThemeActions };

const colorTypes = ["primary", "secondary", "success", "warning", "danger"] as ThemeType[];

export const useThemeStore = create<ThemeStore>()(
  persist(
    immer((set, get, store) => ({
      settings: { ...themeSetting },

      actions: {
        // 设置 app 颜色主题
        setThemeColor: ({ type, color, isDarkMode }: ThemeColorProps) => {
          set((state) => {
            if (typeof document !== "undefined") {
              const initialColor = state.settings[`${type}Color`];
              const colorPalette = generateColorPalette(type, color || initialColor);
              if (color === initialColor) return;
              const processedColors = Object.entries(colorPalette);
              if (isDarkMode) {
                // 如果是暗色模式，反转颜色调色板
                processedColors.forEach(([_, color], index) => {
                  const revertIndex = processedColors.length - (index + 1);
                  const revertShade = processedColors[revertIndex][0];
                  document.documentElement.style.setProperty(`--${type}-${revertShade}`, color);
                });
              } else {
                processedColors.forEach(([shade, color]) => {
                  document.documentElement.style.setProperty(`--${type}-${shade}`, color);
                });
              }

              if (color) {
                state.settings[`${type}Color`] = color;
              }
            }
          });
        },

        // 设置所有主题色
        setAllThemeColor: ({ isDarkMode }: Partial<ThemeColorProps>) => {
          colorTypes.forEach((type) => {
            get().actions.setThemeColor({ type, isDarkMode });
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

        // 重置主题色
        resetThemeColor: ({ type, isDarkMode }: Partial<ThemeColorProps>) => {
          set((state) => {
            state.settings = { ...themeSetting };
          });
          const { setThemeColor, setAllThemeColor } = get().actions;
          if (type) {
            setThemeColor({ type, isDarkMode });
          } else {
            setAllThemeColor({ isDarkMode });
          }
        },

        // 重置store
        resetThemeStore: (isDarkMode: boolean) => {
          set(store.getInitialState());
          get().actions.resetThemeColor({ isDarkMode });
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
export const useThemeActions = () => useThemeStore((s) => s.actions);
