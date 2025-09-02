import { Header } from "./Header/Header";
import { Main } from "./Main";
import { Menu } from "./Menu/Menu";

export const AdminLayout = () => {
  return (
    <div className="text-foreground bg-background flex h-screen transition-colors duration-300">
      {/* 菜单栏 */}
      <Menu />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <Header />

        {/* 页面内容 */}
        <Main />
      </div>
    </div>
  );
};
