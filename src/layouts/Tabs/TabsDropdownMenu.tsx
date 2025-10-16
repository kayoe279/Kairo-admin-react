import { type DropDownProps, Dropdown, type MenuProps } from "antd";
import { type ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { SvgIcon } from "@/components/ui";
import { useAppActions } from "@/store";
import { useTabsActions, useTabsList } from "@/store/tabs";

export type DropdownKey =
  | "reloadCurrent"
  | "closeCurrent"
  | "closeLeft"
  | "closeRight"
  | "closeOther"
  | "closeAll";

type TabsContextMenuProps = DropDownProps & {
  tabId?: string;
  excludeKeys?: DropdownKey[];
  children: ReactNode;
  className?: string;
};

export const TabsDropdownMenu = ({
  tabId,
  excludeKeys = [],
  children,
  className,
  trigger = ["contextMenu"],
  ...props
}: TabsContextMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const tabsList = useTabsList();
  const { refreshPage } = useAppActions();
  const { closeCurrentTab, closeOtherTabs, closeAllTabs, closeLeftTabs, closeRightTabs } =
    useTabsActions();

  const [items, setItems] = useState([
    {
      key: "reloadCurrent",
      label: t("common.reload", "重新加载"),
      icon: <SvgIcon icon="solar:refresh-outline" className="size-4" />
    },
    {
      key: "closeCurrent",
      label: t("common.close", "关闭"),
      icon: <SvgIcon icon="pajamas:close" className="size-4" />
    },
    {
      key: "closeLeft",
      label: t("tabs.contextMenu.closeLeft", "关闭左侧"),
      icon: <SvgIcon icon="mdi:format-horizontal-align-left" className="size-4" />
    },
    {
      key: "closeRight",
      label: t("tabs.contextMenu.closeRight", "关闭右侧"),
      icon: <SvgIcon icon="mdi:format-horizontal-align-right" className="size-4" />
    },
    {
      key: "closeOther",
      label: t("tabs.contextMenu.closeOther", "关闭其他"),
      icon: <SvgIcon icon="ant-design:column-width-outlined" className="size-4" />
    },
    {
      key: "closeAll",
      label: t("tabs.contextMenu.closeAll", "关闭全部"),
      icon: <SvgIcon icon="ant-design:line-outlined" className="size-4" />
    }
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: biome ignore
  useEffect(() => {
    if (!tabId) return;

    const isItemDisabled = (key: DropdownKey) => {
      const disabledKeys: string[] = [];
      const tabItemIndex = tabsList.findIndex((item) => item.name === tabId);
      if (tabItemIndex === tabsList.length - 1) {
        disabledKeys.push("closeRight");
      }
      if (tabItemIndex === 0) {
        disabledKeys.push("closeLeft");
      }

      const isFixed = tabsList.find((item) => item.name === tabId)?.meta?.affix ?? false;
      if (isFixed) {
        disabledKeys.push(...["closeCurrent", "closeLeft"]);
        if (tabsList.length <= 1) {
          disabledKeys.push(...["closeRight", "closeOther", "closeAll"]);
        }
      }
      if (disabledKeys.includes(key)) return true;
      if (key === "reloadCurrent" && tabId !== location.pathname) {
        return true;
      }
      return false;
    };

    const newItems = items
      .map((item) => ({
        ...item,
        disabled: isItemDisabled(item.key as DropdownKey)
      }))
      .filter((item) => !excludeKeys.includes(item.key as DropdownKey));

    setItems(newItems);
  }, [location.pathname, tabsList, tabId]);

  const handleDropdownClick: MenuProps["onClick"] = (e) => {
    const key = e.key;
    if (!tabId) return;

    switch (key) {
      case "reloadCurrent":
        refreshPage();
        break;
      case "closeCurrent":
        closeCurrentTab(tabId, navigate);
        break;
      case "closeLeft":
        closeLeftTabs(tabId, navigate);
        break;
      case "closeRight":
        closeRightTabs(tabId, navigate);
        break;
      case "closeOther":
        closeOtherTabs(tabId, navigate);
        break;
      case "closeAll":
        closeAllTabs(navigate);
        break;
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleDropdownClick }}
      trigger={trigger}
      className={className}
      {...props}
    >
      {children}
    </Dropdown>
  );
};
