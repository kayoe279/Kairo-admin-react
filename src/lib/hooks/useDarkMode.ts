import { useIsomorphicLayoutEffect, useLocalStorage, useMediaQuery } from "usehooks-ts";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const LOCAL_STORAGE_KEY = "usehooks-ts-theme-mode";

// 三种模式
export type ThemeMode = "light" | "dark" | "system";

type DarkModeOptions = {
  defaultValue?: ThemeMode;
  localStorageKey?: string;
  initializeWithValue?: boolean;
};

export function useDarkMode(options: DarkModeOptions = {}) {
  const {
    defaultValue = "light",
    localStorageKey = LOCAL_STORAGE_KEY,
    initializeWithValue = true,
  } = options;

  const themeModeMap = {
    light: "light",
    dark: "dark",
    system: "system",
  } as const;

  // 跟随系统
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
    initializeWithValue,
    defaultValue: false,
  });

  // 保存用户选择的模式
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(localStorageKey, defaultValue, {
    initializeWithValue,
  });

  // 计算最终是否 dark
  const isDarkMode = themeMode === "system" ? isDarkOS : themeMode === "dark";

  // 🔥 自动同步到 <html> 上的 class
  useIsomorphicLayoutEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 循环切换模式
  const toggle = () => {
    if (themeMode === "light") setThemeMode("dark");
    else if (themeMode === "dark") setThemeMode("system");
    else setThemeMode("light");
  };

  return {
    themeModeMap,
    theme: isDarkMode ? themeModeMap.dark : themeModeMap.light,
    themeMode,
    isDarkMode,
    setThemeMode,
    toggle,
  };
}
