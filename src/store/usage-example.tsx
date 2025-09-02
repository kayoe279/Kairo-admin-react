// 使用示例：如何在 React 组件中使用转换后的 Zustand stores
import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import {
  useAppStore,
  useUserStore, 
  useThemeStore,
  useTabsStore,
  setupStores
} from './index';
import { Button } from '@heroui/react';

// Mock navigation functions for example (replace with actual react-router-dom when available)
const mockNavigate = (path: string) => console.log('Navigate to:', path);
const mockLocation = { 
  pathname: '/current-path', 
  search: '', 
  state: { redirect: '/dashboard' } as { redirect?: string } | null
};

// App 初始化组件示例
export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // 初始化所有 stores
    setupStores();
  }, []);

  return <>{children}</>;
};

// 登录组件使用示例
export const LoginExample: React.FC = () => {
  const { actions } = useUserStore();

  const handleLogin = async () => {
    try {
      // 模拟登录 API 调用
      const result = {
        id: 1,
        username: 'user',
        email: 'user@example.com',
        accessToken: 'token123',
        refreshToken: 'refresh123',
        roles: ['admin'] as Entity.RoleType[]
      };

      // 处理登录成功
      const redirectPath = mockLocation.state?.redirect || '/dashboard';
      await actions.handleLoginInfo(result, mockNavigate, redirectPath);
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>
        登录
      </button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
};

// 主题切换组件示例
export const ThemeToggle: React.FC = () => {
  const { 
    settings,

    actions
  } = useThemeStore();


  return (
    <div>
      <div>主题颜色: {settings.themeColor}</div>
      <div>成功颜色: {settings.successColor}</div>
      <div>警告颜色: {settings.warningColor}</div>
      <div>错误颜色: {settings.errorColor}</div>
      <div>灰色模式: {settings.grayMode ? '开启' : '关闭'}</div>
      
    
      
      <button onClick={() => actions.setThemeColor('primary', '#30B092')}>
        设置主要颜色 (绿色)
      </button>
      <button onClick={() => actions.setThemeColor('primary', '#3b82f6')}>
        设置主要颜色 (蓝色)
      </button>
      <button onClick={() => actions.setThemeColor('success', '#22C55E')}>
        设置成功颜色
      </button>
      <button onClick={() => actions.setThemeColor('warning', '#FAAD14')}>
        设置警告颜色
      </button>
      <button onClick={() => actions.setThemeColor('error', '#F5222D')}>
        设置错误颜色
      </button>
      
      <button onClick={() => actions.toggleGrayMode(!settings.grayMode)}>
        切换灰色模式
      </button>
    </div>
  );
};

// 标签页管理组件示例
export const TabsManager: React.FC = () => {
  const { 
    tabsList, 
    activeTabId,
    actions 
  } = useTabsStore();

  // 当路由变化时添加标签页
  useEffect(() => {
    const currentRoute = {
      name: 'current-page',
      path: mockLocation.pathname,
      fullPath: mockLocation.pathname + mockLocation.search,
      meta: {
        title: '当前页面'
      }
    };
    
    actions.addTab(currentRoute, mockNavigate);
  }, [actions]);

  return (
    <div>
      <div>标签页列表:</div>
      {tabsList.map(tab => (
        <div key={tab.name} style={{ 
          padding: '8px',
          backgroundColor: activeTabId === tab.name ? '#e6f7ff' : 'transparent',
          border: '1px solid #d9d9d9',
          cursor: 'pointer'
        }}>
          <span onClick={() => actions.switchTabItem(tab.name, mockNavigate, mockLocation.pathname)}>
            {tab.meta?.title || tab.name}
          </span>
          <button 
            onClick={() => actions.closeCurrentTab(tab.name, mockNavigate)}
            style={{ marginLeft: '8px' }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

// 应用设置组件示例
export const AppSettings: React.FC = () => {
  const {
    settings,
    locale,
    open,
    fullScreen,
    actions
  } = useAppStore();

  return (
    <div>
      <div>当前语言: {locale}</div>
      <div>导航主题: {settings.navTheme}</div>
      <div>导航模式: {settings.navMode}</div>
      <div>页面动画: {settings.isPageAnimate ? '开启' : '关闭'}</div>
      <div>抽屉状态: {open ? '开启' : '关闭'}</div>
      <div>全屏模式: {fullScreen ? '开启' : '关闭'}</div>
      <div>菜单宽度: {settings.menuSetting.menuWidth}px</div>
      <div>头部高度: {settings.headerSetting.height}px</div>
      
      <button onClick={() => actions.setLocale('zh-CN')}>中文</button>
      <button onClick={() => actions.setLocale('en-US')}>English</button>
      
      <button onClick={() => actions.setNavTheme('dark')}>暗黑导航</button>
      <button onClick={() => actions.setNavTheme('light')}>浅色导航</button>
      
      <button onClick={() => actions.setNavMode('vertical')}>垂直模式</button>
      <button onClick={() => actions.setNavMode('horizontal')}>水平模式</button>
      <button onClick={() => actions.setNavMode('horizontal-mix')}>混合模式</button>
      
      <button onClick={() => actions.toggleDrawer()}>切换抽屉</button>
      <button onClick={() => actions.toggleFullScreen()}>切换全屏</button>
      <button onClick={() => actions.reloadPage()}>刷新页面</button>
    </div>
  );
};

// 用户信息组件示例
export const UserProfile: React.FC = () => {
  const { userInfo, token, actions } = useUserStore();

  const handleLogout = async () => {
    await actions.logout(mockNavigate, mockLocation.pathname);
  };

  if (!userInfo) {
    return <div>未登录</div>;
  }

  return (
    <div>
      <div>用户名: {userInfo.username}</div>
      <div>邮箱: {userInfo.email}</div>
      <div>角色: {userInfo.roles?.join(', ')}</div>
      <div>Token: {token?.substring(0, 10)}...</div>
      
      <button onClick={handleLogout}>登出</button>
    </div>
  );
};

// 完整应用示例
export const AppExample: React.FC = () => {
  return (
    <AppInitializer>
      <div style={{ padding: '20px' }}>
        <h1>Zustand Store 使用示例</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>用户信息</h2>
          <UserProfile />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>主题设置</h2>
          <ThemeToggle />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>应用设置</h2>
          <AppSettings />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>标签页管理</h2>
          <TabsManager />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>登录示例</h2>
          <LoginExample />
        </div>
      </div>
    </AppInitializer>
  );
};
