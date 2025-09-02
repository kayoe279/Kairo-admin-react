import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PAGE } from "@/lib/constants";

// Types for route-like objects in React
interface RouteInfo {
  name: string;
  path: string;
  meta?: {
    title?: string;
    affix?: boolean;
    hidden?: boolean;
    withoutTab?: boolean;
    [key: string]: any;
  };
  hash?: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
  fullPath: string;
}

export interface TabItem extends RouteInfo {
  isFixed?: boolean;
}

interface TabsState {
  // State
  activeTabId: string;
  tabsList: TabItem[];

  // Utility methods
  getTabByRoute: (route: RouteInfo) => TabItem;
  filterTabsByIds: (tabIds: string[], tabs: TabItem[]) => TabItem[];
  retainAffixRoute: (tabs: TabItem[]) => TabItem[];
}

interface TabsActions {
  setActiveTabId: (id: string) => void;
  addTab: (route: RouteInfo, navigate?: (path: string) => void) => void;
  initTabs: (homeRoute?: RouteInfo) => void;
  closeLeftTabs: (tabId: string) => void;
  closeRightTabs: (tabId: string) => void;
  closeOtherTabs: (tabId: string, navigate?: (path: string) => void) => void;
  closeCurrentTab: (
    tabId: string,
    navigate?: (path: string) => void,
    callback?: () => void
  ) => void;
  closeAllTabs: () => void;
  switchTabItem: (
    tabId: string,
    navigate?: (path: string) => void,
    currentRouteName?: string
  ) => void;
  clearAllTabs: () => void;
}

type TabsStore = TabsState & { actions: TabsActions };

export const useTabsStore = create<TabsStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      activeTabId: "",
      tabsList: [],

      // Utility: Filter tabs by IDs
      filterTabsByIds: (tabIds: string[], tabs: TabItem[]) => {
        return tabs.filter((tab) => !tabIds.includes(tab.name));
      },

      // Utility: Retain affix (pinned) routes
      retainAffixRoute: (tabs: TabItem[]) => {
        return tabs.filter((item) => item?.meta?.affix ?? false);
      },

      // Utility: Convert route to tab
      getTabByRoute: (route: RouteInfo) => {
        const { name, fullPath, hash, meta, params, path, query } = route;
        return {
          fullPath,
          hash,
          meta,
          name,
          params,
          path,
          query,
          isFixed: (meta?.affix as boolean) ?? false,
        };
      },

      // Actions
      actions: {
        // Set active tab ID
        setActiveTabId: (id: string) => {
          set((state) => {
            state.activeTabId = id;
          });
        },

        // Initialize tabs with home tab
        initTabs: (homeRoute?: RouteInfo) => {
          if (!homeRoute) return;

          const { tabsList, getTabByRoute } = get();
          const homeTab = tabsList.some((item) => item.name === PAGE.HOME_NAME_REDIRECT);

          if (!homeTab) {
            set((state) => {
              const homeTabItem = getTabByRoute(homeRoute);
              state.tabsList.unshift(homeTabItem);
            });
          }
        },

        // Add new tab
        addTab: (route: RouteInfo, _navigate?: (path: string) => void) => {
          const { meta } = route;
          if (meta?.withoutTab || meta?.hidden) return;

          const { tabsList, getTabByRoute, actions } = get();
          const name = route.name;
          const isExists = tabsList.some((item) => item.name === name);

          if (!isExists) {
            set((state) => {
              state.tabsList.push(getTabByRoute(route));
            });
          }

          actions.setActiveTabId(name);
        },

        // Close left tabs
        closeLeftTabs: (tabId: string) => {
          const { tabsList } = get();
          const index = tabsList.findIndex((item) => item.name === tabId);

          set((state) => {
            state.tabsList = state.tabsList.filter(
              (item, i) => i >= index || (item?.meta?.affix ?? false)
            );
          });
        },

        // Close right tabs
        closeRightTabs: (tabId: string) => {
          const { tabsList } = get();
          const index = tabsList.findIndex((item) => item.name === tabId);

          set((state) => {
            state.tabsList = state.tabsList.filter(
              (item, i) => i <= index || (item?.meta?.affix ?? false)
            );
          });
        },

        // Close other tabs
        closeOtherTabs: (tabId: string, navigate?) => {
          const { actions } = get();

          set((state) => {
            state.tabsList = state.tabsList.filter(
              (item) => item.name === tabId || (item?.meta?.affix ?? false)
            );
          });

          actions.setActiveTabId(tabId);

          if (navigate) {
            // Find the tab to get its path
            const { tabsList } = get();
            const targetTab = tabsList.find((tab) => tab.name === tabId);
            if (targetTab) {
              navigate(targetTab.path);
            }
          }
        },

        // Close current tab
        closeCurrentTab: (tabId: string, navigate?, callback?) => {
          const { tabsList, activeTabId, filterTabsByIds, actions } = get();

          if (tabsList.length === 1) {
            return;
          }

          const isRemoveActiveTab = activeTabId === tabId;

          set((state) => {
            state.tabsList = filterTabsByIds([tabId], state.tabsList);
          });

          if (isRemoveActiveTab) {
            const { tabsList: updatedTabsList } = get();
            const currentRoute = updatedTabsList[Math.max(0, updatedTabsList.length - 1)];

            if (currentRoute) {
              actions.setActiveTabId(currentRoute.name);

              if (navigate) {
                navigate(currentRoute.path);
              }
            }
          }

          callback?.();
        },

        // Close all tabs
        closeAllTabs: () => {
          const { retainAffixRoute } = get();

          set((state) => {
            state.tabsList = retainAffixRoute(state.tabsList);
          });
        },

        // Switch to tab
        switchTabItem: (tabId: string, navigate?, currentRouteName?) => {
          if (tabId === currentRouteName) return;

          const { tabsList, actions } = get();
          const currentTab = tabsList.find((item) => item.name === tabId);

          if (!currentTab) return;

          actions.setActiveTabId(tabId);

          if (navigate) {
            navigate(currentTab.path);
          }
        },

        // Clear all tabs
        clearAllTabs: () => {
          set((state) => {
            state.activeTabId = "";
            state.tabsList = [];
          });
        },
      },
    })),
    {
      name: "tabs-store",
      partialize: (state) => ({
        activeTabId: state.activeTabId,
        tabsList: state.tabsList,
      }),
    }
  )
);

// Selectors Hooks
export const useActiveTabId = () => useTabsStore((s) => s.activeTabId);
export const useTabsList = () => useTabsStore((s) => s.tabsList);
export const useTabsActions = () => useTabsStore((s) => s.actions);
