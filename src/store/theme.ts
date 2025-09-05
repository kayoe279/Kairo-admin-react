import omit from "lodash-es/omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { generateColorPalette } from "@/lib";
import { themeSetting, type ThemeSettingProps } from "@/lib/settings/theme";

const colorTypes = ["primary", "secondary", "success", "warning", "danger"] as const;

export type ThemeType = (typeof colorTypes)[number];

type ThemeColorProps = {
  type: ThemeType;
  color?: string;
  isDarkMode?: boolean;
};
interface ThemeActions {
  setThemeColor: (props: ThemeColorProps) => void;
  setBaseThemeColor: (props: Partial<ThemeColorProps>) => void;
  setAllThemeColor: (props: Partial<ThemeColorProps>) => void;
  resetThemeColor: (props: Partial<ThemeColorProps>) => void;
  toggleDarkNav: (value?: boolean) => void;
  toggleGrayMode: (value?: boolean) => void;
  resetThemeStore: (isDarkMode: boolean) => void;
}

type ThemeStore = ThemeSettingProps & { actions: ThemeActions };

export const useThemeStore = create<ThemeStore>()(
  persist(
    immer((set, get, store) => ({
      ...themeSetting,

      actions: {
        // 设置基础颜色
        setBaseThemeColor: ({ isDarkMode }: Partial<ThemeColorProps>) => {
          set((state) => {
            if (isDarkMode) {
              state.foregroundColor = "#ffffffd9";
              state.backgroundColor = "#18181c";
            } else {
              state.foregroundColor = "#18181c";
              state.backgroundColor = "#ffffff";
            }
          });
        },
        // 设置颜色主题
        setThemeColor: ({ type, color, isDarkMode }: ThemeColorProps) => {
          set((state) => {
            if (typeof document !== "undefined") {
              const initialColor = themeSetting[`${type}Color`];
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
                state[`${type}Color`] = color;
              }
            }
          });
        },

        // 设置所有主题色
        setAllThemeColor: ({ isDarkMode }: Partial<ThemeColorProps>) => {
          const { setThemeColor } = get().actions;
          colorTypes.forEach((type) => {
            setThemeColor({ type, isDarkMode });
          });
        },

        // 设置灰色模式
        toggleGrayMode: (value?: boolean) => {
          if (typeof document !== "undefined") {
            if (value) {
              document.body.classList.add("gray-mode");
            } else {
              document.body.classList.remove("gray-mode");
            }
          }

          set((state) => {
            state.grayMode = value !== undefined ? value : !state.grayMode;
          });
        },
        // 设置暗黑模式
        toggleDarkNav: (value?: boolean) => {
          set((state) => {
            state.darkNav = value !== undefined ? value : !state.darkNav;
          });
        },

        // 重置主题色
        resetThemeColor: ({ type, isDarkMode }: Partial<ThemeColorProps>) => {
          const { setThemeColor, setAllThemeColor, setBaseThemeColor } = get().actions;
          setBaseThemeColor({ isDarkMode });
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
      partialize: (state) => omit(state, ["actions"]),
    }
  )
);

// Selectors Hooks
export const useThemeSettings = () => useThemeStore((state) => state);
export const useThemeActions = () => useThemeStore((state) => state.actions);
