import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ResourceKey } from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ButtonIcon, SvgIcon } from "@/components/ui";
import { useBetterScroll, useMedia, useRouteMatch } from "@/hooks";
import { cn, TAB_DATA_ID } from "@/lib";
import {
  useActiveTabId,
  useAppActions,
  useAppSettings,
  useAuthRouteState,
  useTabsActions,
  useTabsList,
} from "@/store";
import { TabsDropdownMenu } from "./TabsDropdownMenu";

export const Tabs = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { matchedRoute } = useRouteMatch();
  const { multiTabsSetting, refreshing, fullScreen } = useAppSettings();
  const { refreshPage, toggleFullScreen } = useAppActions();
  const { getHomeRoute } = useAuthRouteState();
  const activeTabId = useActiveTabId();
  const tabsList = useTabsList();
  const { initTabs, addTab, closeCurrentTab, switchTabItem } = useTabsActions();

  const { wrapperRef, bs, scrollByClientX, bsRefresh } = useBetterScroll({
    scrollX: true,
    scrollY: false,
    click: true,
    bounce: true,
  });

  const tabsRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useMedia();

  // 滚动状态
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
    isScrollable: false,
  });

  // 滚动到活动标签页
  const scrollToActiveTab = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!tabsRef.current) return;

    const { children } = tabsRef.current;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const tabId = child.getAttribute(TAB_DATA_ID);

      if (tabId === activeTabId) {
        const { left, width } = child.getBoundingClientRect();
        const clientX = left + width / 2;
        setTimeout(() => {
          scrollByClientX(clientX);
        }, 50);
        break;
      }
    }
  }, [activeTabId, scrollByClientX]);

  // 初始化标签页
  useEffect(() => {
    initTabs(getHomeRoute());
  }, [initTabs, getHomeRoute]);

  // 添加当前路由到标签页
  useEffect(() => {
    if (matchedRoute?.meta?.name) {
      addTab(matchedRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedRoute]);

  useEffect(() => {
    setTimeout(() => {
      bsRefresh();
    }, 1000);
  }, [bsRefresh]);

  useEffect(() => {
    if (!bs) return;
    const handleScroll = () => {
      if (!bs || !wrapperRef.current || !tabsRef.current) return;
      const { x, maxScrollX } = bs;
      const wrapperWidth = wrapperRef.current.clientWidth;
      const tabsWidth = tabsRef.current.scrollWidth;
      const isScrollable = tabsWidth > wrapperWidth;
      const canScrollLeft = x < 0;
      const canScrollRight = x > maxScrollX;

      setScrollState({
        isScrollable,
        canScrollLeft,
        canScrollRight,
      });
    };

    handleScroll();

    bs.on("scroll", handleScroll);
    bs.on("scrollEnd", handleScroll);

    return () => {
      bs.off("scroll", handleScroll);
      bs.off("scrollEnd", handleScroll);
    };
  }, [bs, wrapperRef, tabsRef]);

  // 监听活动标签页变化，自动滚动到可见区域
  useEffect(() => {
    if (activeTabId) {
      setTimeout(scrollToActiveTab, 100);
    }
  }, [activeTabId, scrollToActiveTab]);

  // 处理标签页切换
  const handleTabSwitch = (event: React.MouseEvent, tabName: string) => {
    event.preventDefault();
    switchTabItem(tabName, navigate);
  };

  // 处理标签页关闭
  const handleTabClose = (event: React.MouseEvent, tabName: string) => {
    event.stopPropagation();
    closeCurrentTab(tabName, navigate);
  };

  // 全屏
  const handleFullScreen = () => {
    toggleFullScreen();
  };

  return (
    <AnimatePresence mode="wait">
      {multiTabsSetting.show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: multiTabsSetting.height,
            opacity: 1,
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className={cn(
            "bg-background flex w-full gap-x-2 overflow-hidden px-2 py-1.5 sm:gap-x-4 sm:px-4 sm:py-2",
            className
          )}
        >
          <div className="relative flex min-w-0 flex-1 items-center">
            {/* 左侧滚动遮罩 */}
            {scrollState.isScrollable && scrollState.canScrollLeft && (
              <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r to-transparent dark:from-gray-900" />
            )}

            <div ref={wrapperRef} className="min-w-0 flex-1 overflow-hidden">
              <div className="inline-block">
                <div
                  ref={tabsRef}
                  className={cn("flex h-full items-center gap-x-1.5 whitespace-nowrap sm:gap-x-2")}
                  style={{ minWidth: "max-content" }}
                >
                  {tabsList.map((tab) => (
                    <TabsDropdownMenu key={`${tab.name}-${tab.path}`} tabId={tab.name}>
                      <button
                        className={cn(
                          "relative flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg",
                          "h-7 px-3 py-1 text-xs",
                          "sm:h-8 sm:max-h-12 sm:px-3 sm:py-1.5 sm:text-sm sm:leading-8",
                          activeTabId === tab.name
                            ? "bg-primary/20 text-primary"
                            : "bg-default-100 text-foreground hover:bg-default-200/70"
                        )}
                        type="button"
                        {...{ [TAB_DATA_ID]: tab.name }}
                        onClick={(e) => handleTabSwitch(e, tab.name)}
                      >
                        {t(`route.${tab.name}` as ResourceKey) as string}
                        {tab?.meta?.affix ? (
                          <SvgIcon
                            icon="la:thumbtack"
                            className={cn("ml-0.5 text-sm opacity-60 sm:ml-1 sm:text-base")}
                          />
                        ) : (
                          <SvgIcon
                            icon="pajamas:close"
                            className="text-xs sm:text-sm"
                            onClick={(e) => handleTabClose(e, tab.name)}
                          />
                        )}
                      </button>
                    </TabsDropdownMenu>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧滚动遮罩 */}
            {scrollState.isScrollable && scrollState.canScrollRight && (
              <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l to-transparent dark:from-gray-900" />
            )}
          </div>

          <div className={cn("flex items-center gap-x-2 sm:gap-x-4")}>
            {/* 刷新按钮 - 在移动端隐藏 */}
            {!isMobile && (
              <ButtonIcon
                title={t("common.reload")}
                icon="ant-design:reload-outlined"
                className={cn({ "pointer-events-none animate-spin opacity-50": refreshing })}
                onClick={() => refreshPage()}
              />
            )}

            {/* 全屏按钮 */}
            <ButtonIcon
              title={t("app.fullScreen")}
              icon={
                fullScreen
                  ? "ant-design:fullscreen-exit-outlined"
                  : "ant-design:fullscreen-outlined"
              }
              onClick={handleFullScreen}
            />

            {/* 标签页操作菜单按钮 */}
            <TabsDropdownMenu tabId={activeTabId} trigger={["hover"]}>
              <ButtonIcon icon="icon-park-outline:more-app" className="text-lg" />
            </TabsDropdownMenu>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
