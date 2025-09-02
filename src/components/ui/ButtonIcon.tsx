import { type HTMLAttributes, type ReactNode } from "react";
import { Tooltip } from "@heroui/react";
import { cn } from "@/lib/utils";
import { SvgIcon } from "./SvgIcon";

/**
 * Tooltip 位置类型
 */
type TooltipPlacement = 
  | "top" 
  | "bottom" 
  | "left" 
  | "right" 
  | "top-start" 
  | "top-end" 
  | "bottom-start" 
  | "bottom-end" 
  | "left-start" 
  | "left-end" 
  | "right-start" 
  | "right-end";

interface ButtonIconProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'className'> {
  /** Button class */
  className?: string;
  /** Iconify icon name */
  icon?: string;
  /** Tooltip content */
  tooltipContent?: string;
  /** Tooltip placement */
  tooltipPlacement?: TooltipPlacement;
  /** Hide tooltip */
  hideTooltip?: boolean;
  /** Button children content (used when no icon is provided) */
  children?: ReactNode;
}

export const ButtonIcon = ({
  className = "",
  icon = "",
  tooltipContent = "",
  tooltipPlacement = "bottom",
  hideTooltip = false,
  children,
  ...buttonProps
}: ButtonIconProps) => {
  // 按钮内容
  const buttonContent = (
    <button 
      className={cn('text-xl', className)} 
      {...buttonProps}
    >
      {icon ? <SvgIcon icon={icon} /> : children}
    </button>
  );

  // 如果隐藏tooltip或没有tooltip内容，直接返回按钮
  if (hideTooltip || !tooltipContent) {
    return buttonContent;
  }

  // 使用Hero UI的Tooltip包装按钮
  return (
    <Tooltip
      content={tooltipContent}
      placement={tooltipPlacement}
      showArrow
      closeDelay={200}
      delay={500}
    >
      {buttonContent}
    </Tooltip>
  );
};
