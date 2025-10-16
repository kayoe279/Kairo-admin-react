// app theme preset color
export const appThemeList: string[] = [
  "#68a1f2",
  "#0077b6",
  "#3b82f6",
  "#30B092",
  "#22C55E",
  "#a7c957",
  "#8FD14F",
  "#8b5cf6",
  "#9c27b0",
  "#a855f7",
  "#6366f1",
  "#FAAD14",
  "#ff9800",
  "#FC5404",
  "#db5a6b",
  "#F5222D"
];

export const themeSetting = {
  // 暗色侧边栏
  darkNav: false,
  // 灰度模式
  grayMode: false,
  // 前景色
  foregroundColor: "#ffffffd9",
  // 背景色
  backgroundColor: "#18181c",
  // 根背景色
  rootBackgroundColor: "#101014",
  //系统主题色
  primaryColor: appThemeList[0],
  // 成功颜色
  successColor: "#17c964",
  // 警告颜色
  warningColor: "#f5a524",
  // 错误颜色
  errorColor: "#f31260",
  //系统内置主题色列表
  appThemeList
};

export type ThemeSettingProps = typeof themeSetting;
