import { ButtonIcon } from "@/components/ui";
import { useAppActions, useAppSettings } from "@/store";

export const Collapsed = () => {
  const { navMode, collapsed } = useAppSettings();
  const { toggleCollapsed } = useAppActions();

  // 只在垂直菜单模式和混合模式下显示折叠按钮
  const shouldShow = navMode === "vertical" || navMode === "horizontal-mix";

  if (!shouldShow) {
    return null;
  }

  return (
    <ButtonIcon
      icon={collapsed ? "ri:menu-fold-4-fill" : "ri:menu-fold-3-fill"}
      hideTooltip
      onClick={() => toggleCollapsed()}
    />
  );
};
