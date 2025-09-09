import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { ButtonIcon, SvgIcon } from "@/components/ui";
import { TAB_DATA_ID } from "@/lib/constants";
import { useBetterScroll, useRouteInfo } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import {
  useActiveTabId,
  useAppActions,
  useAppSettings,
  useTabsActions,
  useTabsList,
} from "@/store";
import { TabsDropdownMenu } from "./TabsDropdownMenu";

export const Tabs = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentRoute } = useRouteInfo();
  const { multiTabsSetting, refreshing } = useAppSettings();
  const { refreshPage } = useAppActions();
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

  // 移动端检测
  const isMobile = useMediaQuery("(max-width: 768px)");

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
    initTabs();
  }, [initTabs]);

  // 添加当前路由到标签页
  useEffect(() => {
    if (currentRoute.name) {
      addTab(currentRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);

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
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div
      className={cn(
        "bg-background border-default-100 transition-height flex w-full border-b duration-500 ease-in-out",
        isMobile ? "gap-x-2 px-2 py-1.5" : "gap-x-4 px-4 py-2",
        className
      )}
      style={{ height: multiTabsSetting.height + "px" }}
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
              className={cn(
                "flex h-full items-center whitespace-nowrap",
                isMobile ? "gap-x-1.5" : "gap-x-2"
              )}
              style={{ minWidth: "max-content" }}
            >
              {tabsList.map((tab) => (
                <TabsDropdownMenu key={`${tab.name}-${tab.path}`} tabId={tab.name}>
                  <button
                    className={cn(
                      "relative flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg",
                      isMobile
                        ? "h-7 px-3 py-1 text-xs"
                        : "h-8 max-h-12 px-3 py-1.5 text-sm leading-8",
                      activeTabId === tab.name
                        ? "bg-primary/20 text-primary"
                        : "bg-default-100 text-foreground hover:bg-default-200/70"
                    )}
                    type="button"
                    {...{ [TAB_DATA_ID]: tab.name }}
                    onClick={(e) => handleTabSwitch(e, tab.name)}
                  >
                    {t(`route.${tab.name}`, tab?.meta?.title || tab.name)}
                    {tab?.meta?.affix ? (
                      <SvgIcon
                        icon="la:thumbtack"
                        className={cn("opacity-60", isMobile ? "ml-0.5 text-sm" : "ml-1 text-base")}
                      />
                    ) : (
                      !isMobile && (
                        <SvgIcon
                          icon="pajamas:close"
                          className="text-sm"
                          onClick={(e) => handleTabClose(e, tab.name)}
                        />
                      )
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

      <div className={cn("flex items-center", isMobile ? "gap-x-1" : "gap-x-4")}>
        {/* 刷新按钮 - 在移动端隐藏 */}
        {!isMobile && (
          <ButtonIcon
            title={t("common.reload")}
            icon="ant-design:reload-outlined"
            className={cn({ "pointer-events-none animate-spin opacity-50": refreshing })}
            onClick={() => refreshPage()}
          />
        )}

        {/* 全屏按钮 - 在移动端隐藏 */}
        {!isMobile && (
          <ButtonIcon
            title={t("app.fullScreen")}
            icon="ant-design:fullscreen-outlined"
            onClick={handleFullScreen}
          />
        )}

        {/* 标签页操作菜单按钮 */}
        <TabsDropdownMenu tabId={activeTabId} trigger={["hover"]}>
          <ButtonIcon icon="icon-park-outline:more-app" className="text-lg" />
        </TabsDropdownMenu>
      </div>
    </div>
  );
};
