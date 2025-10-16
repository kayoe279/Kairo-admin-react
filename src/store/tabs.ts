import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PAGE } from "@/lib/constants";
import type { AppRouteObject } from "@/types";

export type TabItem = {
  name: string;
  path: string;
  isFixed?: boolean;
  meta: AppRouteObject["meta"];
};

interface TabsState {
  activeTabId: string;
  tabsList: TabItem[];
  getTabByRoute: (route: AppRouteObject | undefined) => TabItem | null;
  filterTabsByIds: (tabIds: string[], tabs: TabItem[]) => TabItem[];
  retainAffixRoute: (tabs: TabItem[]) => TabItem[];
}

interface TabsActions {
  setActiveTabId: (id: string) => void;
  addTab: (route: AppRouteObject | null) => void;
  initTabs: (homeRoute: AppRouteObject | undefined) => void;
  closeLeftTabs: (tabId: string, navigate?: (path: string) => void) => void;
  closeRightTabs: (tabId: string, navigate?: (path: string) => void) => void;
  closeOtherTabs: (tabId: string, navigate?: (path: string) => void) => void;
  closeCurrentTab: (tabId: string, navigate?: (path: string) => void) => void;
  closeAllTabs: (navigate?: (path: string) => void) => void;
  switchTabItem: (tabId: string, navigate?: (path: string) => void) => void;
  clearAllTabs: () => void;
}

type TabsStore = TabsState & { actions: TabsActions };

export const useTabsStore = create<TabsStore>()(
  persist(
    immer((set, get) => ({
      activeTabId: "",
      tabsList: [],

      filterTabsByIds: (tabIds: string[], tabs: TabItem[]) => {
        return tabs.filter((tab) => !tabIds.includes(tab.name));
      },

      retainAffixRoute: (tabs: TabItem[]) => {
        return tabs.filter((item) => item?.meta?.affix ?? false);
      },

      getTabByRoute: (route) => {
        if (!route) return null;

        const { meta, path } = route;

        return {
          name: meta?.name || "",
          path: path || "",
          meta,
          isFixed: (meta?.affix as boolean) ?? false
        };
      },

      actions: {
        // 设置当前激活的标签页
        setActiveTabId: (id: string) => {
          set((state) => {
            state.activeTabId = id;
          });
        },

        // 初始化路由
        initTabs: (homeRoute: AppRouteObject | undefined) => {
          const { tabsList, getTabByRoute } = get();
          const homeTab = tabsList.some((item) => item.name === PAGE.HOME_NAME_REDIRECT);
          if (!homeTab) {
            set((state) => {
              const homeTabItem = getTabByRoute(homeRoute);
              if (homeTabItem) state.tabsList.unshift(homeTabItem);
            });
          }
        },

        // 添加新路由标签页
        addTab: (route: AppRouteObject | null) => {
          if (!route) return;

          const { meta } = route;
          if (meta?.hidden) return;

          const { tabsList, activeTabId, getTabByRoute, actions } = get();
          const name = meta?.name || "";
          if (activeTabId === name) return;
          const isExists = tabsList.some((item) => item.name === name);
          actions.setActiveTabId(name);

          if (isExists) return;

          set((state) => {
            const tab = getTabByRoute(route);
            if (tab) {
              state.tabsList.push(tab);
            }
          });
        },

        // 关闭左侧标签页
        closeLeftTabs: (tabId: string, navigate?) => {
          const { activeTabId, tabsList } = get();
          const index = tabsList.findIndex((item) => item.name === tabId);
          const activeIndex = tabsList.findIndex((item) => item.name === activeTabId);

          set((state) => {
            state.tabsList = state.tabsList.filter(
              (item, i) => i >= index || (item?.meta?.affix ?? false)
            );
          });

          const { tabsList: updatedTabsList } = get();
          if (activeIndex < index) {
            const shouldRoute = updatedTabsList.filter((item) => !item.meta?.affix)?.[0];
            if (shouldRoute) {
              navigate?.(shouldRoute.path);
            }
          }
        },

        // 关闭右侧标签页
        closeRightTabs: (tabId: string, navigate?) => {
          const { activeTabId, tabsList } = get();
          const index = tabsList.findIndex((item) => item.name === tabId);
          const activeIndex = tabsList.findIndex((item) => item.name === activeTabId);

          set((state) => {
            state.tabsList = state.tabsList.filter(
              (item, i) => i <= index || (item?.meta?.affix ?? false)
            );
          });

          const { tabsList: updatedTabsList } = get();
          if (activeIndex > index) {
            const shouldRoute = updatedTabsList[Math.max(0, updatedTabsList.length - 1)];
            if (shouldRoute) {
              navigate?.(shouldRoute.path);
            }
          }
        },

        // 关闭其他标签页
        closeOtherTabs: (tabId: string, navigate?) => {
          const { activeTabId } = get();

          set((state) => {
            state.tabsList = state.tabsList.filter(
              (item) => item.name === tabId || (item?.meta?.affix ?? false)
            );
          });

          if (activeTabId !== tabId) {
            const { tabsList: updatedTabsList } = get();
            const targetTab = updatedTabsList.find((tab) => tab.name === tabId);
            if (targetTab) {
              navigate?.(targetTab.path);
            }
          }
        },

        // 关闭当前标签页
        closeCurrentTab: (tabId: string, navigate?) => {
          const { tabsList, activeTabId, filterTabsByIds } = get();

          if (tabsList.length === 1) return;

          const isRemoveActiveTab = activeTabId === tabId;

          set((state) => {
            state.tabsList = filterTabsByIds([tabId], state.tabsList);
          });

          if (isRemoveActiveTab) {
            const { tabsList: updatedTabsList } = get();
            const shouldRoute = updatedTabsList[Math.max(0, updatedTabsList.length - 1)];
            if (shouldRoute) {
              navigate?.(shouldRoute.path);
            }
          }
        },

        // 关闭所有标签页
        closeAllTabs: (navigate?) => {
          const { retainAffixRoute } = get();
          set((state) => {
            const updatedTabsList = retainAffixRoute(state.tabsList);
            state.tabsList = updatedTabsList;
            navigate?.(updatedTabsList[0].path);
          });
        },

        // 切换到标签页
        switchTabItem: (tabId: string, navigate?) => {
          const { tabsList, activeTabId, actions } = get();
          if (tabId === activeTabId) return;
          const currentTab = tabsList.find((item) => item.name === tabId);
          if (!currentTab) return;

          actions.setActiveTabId(tabId);

          if (navigate) {
            navigate(currentTab.path);
          }
        },

        // 清空所有标签页
        clearAllTabs: () => {
          set((state) => {
            state.activeTabId = "";
            state.tabsList = [];
          });
        }
      }
    })),
    {
      name: "tabs-store",
      partialize: (state) => ({
        activeTabId: state.activeTabId,
        tabsList: state.tabsList
      })
    }
  )
);

// Selectors Hooks
export const useActiveTabId = () => useTabsStore((s) => s.activeTabId);
export const useTabsList = () => useTabsStore((s) => s.tabsList);
export const useTabsActions = () => useTabsStore((s) => s.actions);
