# React Zustand Store 迁移说明

本文档说明如何使用从 Vue Pinia store 转换而来的 React Zustand stores。

## 📁 文件结构

```
src/
├── store/
│   ├── index.ts              # 主入口文件
│   ├── app.ts               # 应用设置 store
│   ├── user.ts              # 用户认证 store
│   ├── theme.ts             # 主题设置 store
│   ├── tabs.ts              # 标签页管理 store
│   ├── route.ts             # 路由管理 store
│   ├── connections.ts       # Store 间连接配置
│   ├── usage-example.tsx    # 使用示例
│   └── README.md           # 本文档
└── lib/settings/
    ├── app.ts               # 应用配置文件
    ├── theme.ts             # 主题配置文件
    └── component.ts         # 组件配置文件
```

## 🚀 快速开始

### 1. 在应用根部初始化

```tsx
import React from "react";
import { setupStores } from "./store";

function App() {
  React.useEffect(() => {
    // 初始化所有 stores 和它们之间的连接
    setupStores();
  }, []);

  return <YourAppContent />;
}
```

### 2. 在组件中使用 Store

```tsx
import React from "react";
import { useThemeStore, useUserStore } from "./store";

function MyComponent() {
  const { userInfo, logout } = useUserStore();
  const { themeMode, setThemeMode } = useThemeStore();

  return (
    <div>
      <p>用户: {userInfo?.username}</p>
      <p>主题: {themeMode()}</p>
      <button onClick={() => setThemeMode("dark")}>暗黑模式</button>
      <button onClick={() => logout()}>登出</button>
    </div>
  );
}
```

## 📚 各个 Store 详细说明

### 🔧 App Store (`useAppStore`)

管理应用级别设置，从 `@/lib/settings/app` 导入默认配置。

```tsx
const {
  settings, // 应用设置（包含导航、头部、菜单等所有配置）
  locale, // 当前语言
  open, // 抽屉开关状态
  fullScreen, // 全屏状态
  reloadFlag, // 页面重载标记

  setNavTheme, // 设置导航主题
  setNavMode, // 设置导航模式 (vertical/horizontal/horizontal-mix)
  setLocale, // 设置语言
  toggleDrawer, // 切换抽屉
  toggleFullScreen, // 切换全屏
  reloadPage, // 重载页面
  resetAppSetting, // 重置应用设置
} = useAppStore();

// 访问详细设置
console.log(settings.menuSetting.menuWidth); // 菜单宽度
console.log(settings.headerSetting.height); // 头部高度
console.log(settings.multiTabsSetting.show); // 是否显示多标签
```

### 👤 User Store (`useUserStore`)

管理用户认证状态和信息。

```tsx
const {
  userInfo, // 用户信息
  token, // 认证令牌

  handleLoginInfo, // 处理登录成功
  logout, // 登出
} = useUserStore();

// 登录示例
await handleLoginInfo(loginResult, navigate, "/dashboard");

// 登出示例
await logout(navigate, currentPath, false);
```

### 🎨 Theme Store (`useThemeStore`)

管理主题设置，从 `@/lib/settings/theme` 导入默认配置，包含预设颜色列表。

```tsx
const {
  settings, // 主题设置（来自 themeSetting）
  storeTheme, // 存储的主题模式
  system, // 系统主题

  themeMode, // 当前生效主题模式 (computed)
  isDark, // 是否暗黑模式 (computed)

  setThemeColor, // 设置主题颜色
  setThemeMode, // 设置主题模式
  toggleGrayMode, // 切换灰色模式
  resetDesignSetting, // 重置主题设置
  getThemeOverrides, // 获取UI库主题配置
} = useThemeStore();

// 使用预设主题色
setThemeColor("primary", "#30B092"); // 使用预设绿色
setThemeColor("primary", "#3b82f6"); // 使用预设蓝色
setThemeColor("success", "#22C55E"); // 成功色
setThemeColor("warning", "#FAAD14"); // 警告色
setThemeColor("error", "#F5222D"); // 错误色

setThemeMode("dark");
toggleGrayMode(!settings.grayMode);

// 访问主题色列表
console.log(settings.appThemeList); // 可用主题色数组
```

### 📑 Tabs Store (`useTabsStore`)

管理标签页状态。

```tsx
const {
  activeTabId, // 当前激活标签ID
  tabsList, // 标签列表

  addTab, // 添加标签
  closeCurrentTab, // 关闭当前标签
  closeLeftTabs, // 关闭左侧标签
  closeRightTabs, // 关闭右侧标签
  closeOtherTabs, // 关闭其他标签
  closeAllTabs, // 关闭所有标签
  switchTabItem, // 切换标签
  initTabs, // 初始化标签
  clearAllTabs, // 清空所有标签
} = useTabsStore();

// 使用示例
addTab(routeInfo, navigate);
closeCurrentTab("tab-id", navigate, callback);
switchTabItem("tab-id", navigate, currentRouteName);
```

### 🛣️ Route Store (`useRouteStore`)

管理路由和权限。

```tsx
const {
  rowRoutes, // 原始路由列表
  cacheRoutes, // 缓存路由列表
  isInitAuthRoute, // 是否已初始化认证路由

  homeRoute, // 首页路由 (computed)

  initAuthRoute, // 初始化认证路由
  resetRoutes, // 重置路由
  addRoute, // 添加路由
  removeRoute, // 移除路由
  hasRoute, // 检查路由是否存在
  filterRoutes, // 按权限过滤路由
} = useRouteStore();

// 初始化路由示例
await initAuthRoute(logoutCallback, errorCallback);
```

## 🔗 Store 间连接

stores 之间的依赖关系通过 `connections.ts` 文件处理：

```tsx
import { resetAllStores, useStores } from "./store";

// 使用多个 store
const { app, user, theme, tabs, route } = useStores();

// 重置所有 store (登出时使用)
resetAllStores();
```

## 💾 数据持久化

以下 stores 支持数据持久化到 localStorage：

- ✅ **App Store**: 应用设置、语言、全屏状态
- ❌ **User Store**: 使用单独的 token/userInfo 管理
- ✅ **Theme Store**: 主题设置、颜色配置
- ✅ **Tabs Store**: 标签列表、当前激活标签
- ❌ **Route Store**: 路由数据不持久化

## 🚨 迁移注意事项

### 与 Vue 版本的主要区别：

1. **路由管理**: React 无法像 Vue Router 那样动态添加路由，改为存储路由数据供路由组件使用
2. **响应式数据**: Zustand 使用 getter 函数代替 Vue 的 computed
3. **跨组件通信**: 通过 store connections 处理原 Vue 中 store 间的依赖
4. **生命周期**: React 中需手动调用 `setupStores()` 初始化

## ⚙️ 配置文件集成

stores 现在已集成 `src/lib/settings/` 目录中的配置文件：

### 📋 App 配置 (`lib/settings/app.ts`)

```tsx
export const appSetting = {
  navMode: "vertical", // 导航模式
  navTheme: "light", // 导航主题
  headerSetting: {
    fixed: true,
    height: 64,
    isReload: true,
  },
  menuSetting: {
    menuWidth: 220,
    minMenuWidth: 64,
    mobileWidth: 768,
    accordion: false,
  },
  // ... 更多配置
};
```

### 🎨 主题配置 (`lib/settings/theme.ts`)

```tsx
export const appThemeList = [
  "#30B092",
  "#22C55E",
  "#3b82f6",
  "#8b5cf6",
  "#FAAD14",
  "#F5222D",
  // ... 更多预设颜色
];

export const themeSetting = {
  themeColor: appThemeList[0],
  successColor: "#22C55E",
  warningColor: "#FAAD14",
  errorColor: "#F5222D",
  grayMode: false,
  // ... 更多主题配置
};
```

### 📦 组件配置 (`lib/settings/component.ts`)

```tsx
export const componentSetting = {
  table: {
    defaultPageSize: 20,
    pageSizes: [10, 20, 30, 40, 50],
    // API 字段映射配置
  },
  upload: {
    maxSize: 2, // MB
    fileType: ["image/png", "image/jpg", ...]
  }
};
```

### 需要适配的功能：

- 🔧 **国际化**: 需集成 react-i18next 或类似库
- 🎨 **颜色工具**: 已集成基础颜色处理，建议使用 chroma-js 等库增强
- 🛣️ **路由权限**: 需结合 React Router 实现路由守卫
- 📱 **响应式检测**: 需手动监听 media query 变化

## 📝 使用建议

1. **初始化顺序**: 确保在 App 根组件中调用 `setupStores()`
2. **错误处理**: 为 API 调用添加适当的错误处理
3. **类型安全**: 根据项目需要调整 TypeScript 类型定义
4. **性能优化**: 合理使用 Zustand 的 selector 避免不必要的重渲染

## 🔍 完整示例

查看 `usage-example.tsx` 文件获取完整的使用示例，包括：

- 应用初始化
- 登录/登出流程
- 主题切换
- 标签页管理
- 应用设置

## 🐛 故障排除

### 常见问题：

1. **Store 未初始化**: 确保调用了 `setupStores()`
2. **路由跳转失败**: 检查 React Router 配置和 navigate 函数
3. **主题不生效**: 确保 CSS 变量和主题类正确应用
4. **数据不持久化**: 检查 localStorage 权限和数据格式

如有问题请查看控制台错误信息或参考使用示例。
