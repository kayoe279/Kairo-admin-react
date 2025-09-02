declare global {
  declare type Locale = "zh-CN" | "en-US";

  interface DictMap {
    [key: string]: Entity.Dict[];
  }

  declare namespace Storage {
    interface Session {
      dict: DictMap;
    }

    interface Local {
      /* 存储用户信息 */
      userInfo: Api.Login.Info;
      /* 存储登录账号 */
      loginAccount: any;
      /* 存储当前语言 */
      locale: Locale;
    }
  }

  declare namespace Cookie {
    interface Key {
      /* 存储访问token */
      accessToken: string;
      /* 存储刷新token */
      refreshToken: string;
    }
  }

  type Recordable = Record<string, any>;
  type Fn = (...args: any[]) => any;

  // 应用信息类型定义
  interface AppInfo {
    pkg: {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
      name: string;
      version: string;
    };
    lastBuildTime: string;
  }

  // 全局变量声明
  declare const __APP_INFO__: AppInfo;
  declare const __APP_ENV__: string;
}

export {};
