import { Avatar, Card, Col, Row } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import avatar from "@/assets/images/avatar.jpg";
import { SvgIcon } from "@/components/ui";
import { cn } from "@/lib";
import { useUserStore } from "@/store";

type ProjectItem = {
  name: string;
  localIcon: string;
  description: string;
  link: string;
};

type EntranceItem = {
  name: string;
  icon: string;
  link: string;
  color: string;
};

export const DashboardWorkplace = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const nickname = useMemo(
    () => userStore.userInfo?.user_metadata?.full_name,
    [userStore.userInfo]
  );

  const projectList: ProjectItem[] = useMemo(
    () => [
      {
        name: "Hearem",
        localIcon: "hearit-logo",
        description: "AI智能可定制地将文字转为自然人声",
        link: "https://hearem.cc/en"
      },
      {
        name: "Amoihub",
        localIcon: "amoihub-logo",
        description: "将生成式AI的提示词统一管理",
        link: "https://www.amoihub.com/"
      },
      {
        name: "Kairo Website",
        localIcon: "blog-logo",
        description: "Kairo Website",
        link: "https://kairo-website-livid.vercel.app/"
      }
    ],
    []
  );

  const entranceList: EntranceItem[] = useMemo(
    () => [
      {
        name: "主控台",
        icon: "solar:emoji-funny-square-broken",
        link: "/dashboard/console",
        color:
          "from-blue-50/50 to-blue-50/80 hover:from-blue-50 hover:to-blue-100 text-blue-600 dark:from-blue-900/20 dark:to-blue-800/20 dark:text-blue-400"
      },
      {
        name: "基础列表",
        icon: "solar:checklist-minimalistic-outline",
        link: "/basic-list",
        color:
          "from-green-50/50 to-green-50/80 hover:from-green-50 hover:to-green-100 text-green-600 dark:from-green-900/20 dark:to-green-800/20 dark:text-green-400"
      },
      {
        name: "表单页面",
        icon: "solar:document-add-broken",
        link: "/form/basic-form",
        color:
          "from-purple-50/50 to-purple-50/80 hover:from-purple-50 hover:to-purple-100 text-purple-600 dark:from-purple-900/20 dark:to-purple-800/20 dark:text-purple-400"
      },
      {
        name: "权限管理",
        icon: "solar:shield-user-broken",
        link: "/permissions",
        color:
          "from-orange-50/50 to-orange-50/80 hover:from-orange-50 hover:to-orange-100 text-orange-600 dark:from-orange-900/20 dark:to-orange-800/20 dark:text-orange-400"
      },
      {
        name: "系统设置",
        icon: "solar:settings-outline",
        link: "/setting/system",
        color:
          "from-indigo-50/50 to-indigo-50/80 hover:from-indigo-50 hover:to-indigo-100 text-indigo-600 dark:from-indigo-900/20 dark:to-indigo-800/20 dark:text-indigo-400"
      }
    ],
    []
  );

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const openInNewWindow = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 顶部信息区域 */}
      <Card>
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={12}>
            <div className="flex items-center">
              <div className="relative">
                <Avatar
                  size={80}
                  src={avatar}
                  className="shadow-lg ring-4 ring-blue-100 dark:ring-blue-900"
                />
                <span className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-4 border-white bg-green-500 dark:border-gray-800" />
              </div>
              <div className="text-foreground ml-6">
                <h1 className="mb-2 text-2xl font-bold">早安，{nickname} 👋</h1>
                <p className="flex items-center">
                  <span className="mr-2">🌤️</span>
                  今日多云转晴，20℃ - 30℃，适合出行
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="flex h-full items-center lg:justify-end">
              <div className="grid grid-cols-3 gap-4 text-center sm:gap-8">
                <div className="min-w-[80px] rounded-full p-4">
                  <div className="text-2xl font-bold text-blue-500">12</div>
                  <div className="text-foreground-subtle text-sm">项目数</div>
                </div>
                <div className="min-w-[80px] rounded-full p-4">
                  <div className="text-2xl font-bold text-orange-500">6/21</div>
                  <div className="text-foreground-subtle text-sm">待办</div>
                </div>
                <div className="min-w-[80px] rounded-full p-4">
                  <div className="text-2xl font-bold text-green-500">18</div>
                  <div className="text-foreground-subtle text-sm">消息</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[20, 20]}>
        {/* 左侧区域 */}
        <Col xs={24} lg={12} className="!flex flex-col gap-4">
          <Card className="text-foreground" title="友情链接 👍">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {projectList.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  title={item.description}
                  className="group flex transform cursor-pointer flex-col items-center rounded-2xl bg-gradient-to-b from-gray-50/50 to-gray-50/80 p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:from-blue-50/60 hover:to-blue-50/90 hover:shadow-md dark:from-gray-800/40 dark:to-gray-800/60 dark:hover:from-gray-700/50 dark:hover:to-gray-700/70"
                  onClick={() => openInNewWindow(item.link)}
                >
                  <SvgIcon
                    localIcon={item.localIcon}
                    className="text-foreground group-hover:text-primary h-[60px] w-[60px] text-[60px] transition-all duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-foreground group-hover:text-primary mt-3 mb-1 font-semibold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-foreground-subtle group-hover:text-primary/80 line-clamp-2 text-xs transition-colors duration-300">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          <Card
            className="text-foreground"
            title="最新动态"
            extra={
              <button
                type="button"
                className="text-primary/80 hover:text-primary text-sm font-medium"
              >
                查看全部
              </button>
            }
          >
            <div className="text-foreground space-y-4">
              <div className="bg-background-root flex items-start space-x-4 rounded-2xl p-4 transition-colors">
                <Avatar size={40} src={avatar} className="flex-shrink-0" />
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="font-semibold">Kayoe</span>
                    <span className="text-foreground-subtle text-xs">刚刚</span>
                  </div>
                  <p className="text-foreground-subtle text-sm">
                    完成了工作台页面的重构，新的设计更加现代化 🎉
                  </p>
                </div>
              </div>

              <div className="bg-background-root flex items-start space-x-4 rounded-2xl p-4 transition-colors">
                <Avatar size={40} src={avatar} className="flex-shrink-0" />
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="font-semibold">Kayoe</span>
                    <span className="text-foreground-subtle text-xs">2小时前</span>
                  </div>
                  <p className="text-foreground-subtle text-sm">
                    优化了项目卡片的交互效果，添加了hover动画 ✨
                  </p>
                </div>
              </div>

              <div className="bg-background-root flex items-start space-x-4 rounded-2xl p-4 transition-colors">
                <Avatar size={40} src={avatar} className="flex-shrink-0" />
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="font-semibold">系统通知</span>
                    <span className="text-foreground-subtle text-xs">今天</span>
                  </div>
                  <p className="text-foreground-subtle text-sm">
                    有3个新的任务待处理，请及时查看 📋
                  </p>
                </div>
              </div>

              <div className="bg-background-root flex items-start space-x-4 rounded-2xl p-4 transition-colors">
                <Avatar size={40} src={avatar} className="flex-shrink-0" />
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="font-semibold">团队协作</span>
                    <span className="text-foreground-subtle text-xs">昨天</span>
                  </div>
                  <p className="text-foreground-subtle text-sm">
                    代码审查已完成，可以进行下一步部署 🚀
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 右侧区域 */}
        <Col xs={24} lg={12} className="!flex flex-col gap-4">
          <Card title="快捷入口">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {entranceList.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={cn(
                    "group flex aspect-square transform cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br p-4 transition-all duration-300",
                    item.color
                  )}
                  onClick={() => navigateTo(item.link)}
                >
                  <SvgIcon
                    icon={item.icon}
                    className="text-4xl transition-all duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                </button>
              ))}
            </div>
          </Card>

          <Card className="flex h-[510px] items-center justify-center text-gray-400">
            <div className="flex h-full w-full items-center justify-center">
              <SvgIcon localIcon="logo" className="size-30" />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardWorkplace;
