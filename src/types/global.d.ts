declare global {
  // 应用信息类型定义
  interface AppInfo {
    pkg: {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
      name: string;
      version: string;
      author:
        | {
            name: string;
            email: string;
          }
        | string;
    };
    lastBuildTime: string;
  }

  // 全局变量声明
  declare const appInfo: AppInfo;
}

export {};
