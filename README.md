# Kairo Admin React

一个基于 React 19、TypeScript 和 Vite 构建的现代化管理后台系统。

测试账号: kayoe279@qq.com  密码: Qwe123456+

## ✨ 特性

- 🚀 **现代技术栈** - React 19 + TypeScript + Vite + Bun + Tailwind CSS
- 🎨 **精美 UI** - 基于 Ant Design 5.x 组件库
- 🌍 **国际化** - 内置中英文支持，基于 react-i18next
- 🔐 **权限管理** - 完整的路由守卫和权限控制系统
- 📱 **响应式设计** - 支持桌面端和移动端
- 🎯 **TypeScript** - 全面的类型安全保障
- 🔥 **热重载** - Vite 提供快速的开发体验
- 📊 **数据可视化** - 集成 ECharts 图表组件
- 🌐 **现代请求库** - 基于 Alova 的类型安全 HTTP 客户端
- 🛠️ **工程化** - ESLint + Prettier + TypeScript 配置
- 🎭 **动画效果** - 基于 Framer Motion 的流畅动画

## 🚀 技术栈

- **前端框架**: React 19.1
- **开发语言**: TypeScript 5.8
- **构建工具**: Vite 7.1
- **包管理器**: Bun
- **UI 组件库**: Ant Design 5.27
- **样式方案**: Tailwind CSS 4.1
- **路由管理**: React Router 7.8
- **状态管理**: Zustand
- **HTTP 请求**: Alova 3.3
- **国际化**: react-i18next
- **图表库**: ECharts (echarts-for-react)
- **动画库**: Framer Motion 12.23
- **工具库**: Lodash-ES、date-fns、usehooks-ts
- **代码规范**: ESLint + Prettier

## 📦 主要模块

### 🏢 业务管理

- **客户管理** - 客户信息、分组、服务记录
- **订单管理** - 订单列表、详情、退款、发货
- **商品管理** - 商品列表、分类、品牌、库存

### 📊 数据分析

- **工作台** - 数据概览和工作区
- **分析页** - 详细数据分析和图表
- **监控页** - 系统监控和性能指标

### ⚙️ 系统管理

- **用户管理** - 用户列表、详情、权限分配
- **角色管理** - 角色配置、权限管理
- **部门管理** - 组织架构管理
- **菜单管理** - 菜单配置和权限控制

### 🛠️ 示例页面

- **表格示例** - 基础表格、高级表格、可编辑表格、虚拟滚动
- **表单示例** - 基础表单、高级表单、分步表单、表单验证
- **图表示例** - 各类数据可视化图表
- **文件上传** - 文件上传组件示例

## 🚀 快速开始

### 安装依赖

```bash
# 推荐使用 bun（项目默认）
bun install

# 或者使用其他包管理器
npm install
yarn install
pnpm install
```

### 开发

```bash
bun run dev
```

### 构建

```bash
bun run build
```

### 预览

```bash
bun run preview
```

## 📜 可用脚本

- `bun run dev` - 启动开发服务器
- `bun run build` - 构建生产版本
- `bun run preview` - 预览生产构建
- `bun run lint` - 运行 ESLint 检查
- `bun run format` - 格式化代码
- `bun run format:check` - 检查代码格式
- `bun run typecheck` - TypeScript 类型检查

## 📁 项目结构

```
src/
├── assets/          # 静态资源
│   ├── icons/       # 图标文件
│   └── images/      # 图片文件
├── components/      # 公共组件
│   ├── features/    # 功能组件
│   └── ui/          # UI 组件
├── layouts/         # 布局组件
├── lib/             # 工具库
│   ├── hooks/       # 自定义 Hooks
│   ├── i18n/        # 国际化配置
│   └── utils/       # 工具函数
├── router/          # 路由配置
├── routes/          # 页面组件
│   ├── auth/        # 认证相关
│   ├── business/    # 业务管理
│   ├── dashboard/   # 仪表板
│   ├── examples/    # 示例页面
│   ├── setting/     # 设置页面
│   └── system/      # 系统管理
├── service/         # API 服务
├── store/           # 状态管理
├── styles/          # 样式文件
└── types/           # TypeScript 类型定义
```

## 🔧 开发指南

### 环境要求

- Node.js >= 18.0.0
- Bun >= 1.0.0 (推荐) 或其他包管理器

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范化：

```bash
# 检查代码规范
bun run lint

# 自动修复代码格式
bun run format
```

### 类型检查

```bash
# 运行 TypeScript 类型检查
bun run typecheck
```

## 📄 许可证

本项目基于 MIT 许可证开源。

## 👥 维护者

[@Kayoe](https://github.com/kayoe279)

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
