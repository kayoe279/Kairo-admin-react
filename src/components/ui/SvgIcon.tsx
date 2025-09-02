import type { HTMLAttributes } from "react";
import { Icon } from "@iconify/react";

/**
 * SvgIcon 组件
 * - 支持 iconify 和本地 svg 图标
 * - 如果同时传递 icon 和 localIcon，优先渲染 localIcon
 */
interface Props extends HTMLAttributes<HTMLElement> {
  /** Iconify 图标名称 */
  icon?: string;
  /** 本地 svg 图标名称 */
  localIcon?: string;
  /** 自定义类名 */
  className?: string;
}

export const SvgIcon = ({ icon, localIcon, className = "", style = {}, ...restProps }: Props) => {
  // 获取环境变量中的本地图标前缀
  const localPrefix = import.meta.env.VITE_ICON_LOCAL_PREFIX || "icon";
  const defaultLocalIcon = "no-icon";

  const symbolId = `#${localPrefix}-${localIcon || defaultLocalIcon}`;

  const renderLocalIcon = localIcon || !icon;

  const mergedClassName = `inline-block ${className}`.trim();

  const mergedStyle = {
    width: "1em",
    height: "1em",
    ...style,
  };

  return (
    <i {...restProps}>
      {renderLocalIcon ? (
        <svg
          aria-hidden="true"
          width="1em"
          height="1em"
          className={mergedClassName}
          style={mergedStyle}
        >
          <use xlinkHref={symbolId} fill="currentColor" />
        </svg>
      ) : (
        icon && (
          <Icon
            icon={icon}
            width="1em"
            height="1em"
            className={mergedClassName}
            style={mergedStyle}
          />
        )
      )}
    </i>
  );
};
