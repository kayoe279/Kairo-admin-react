import { type HTMLAttributes, type ReactNode } from "react";
import { Tooltip, type TooltipProps } from "antd";
import { cn } from "@/lib/utils";
import { SvgIcon } from "./SvgIcon";

type ButtonIconProps = Omit<HTMLAttributes<HTMLButtonElement>, "className"> &
  TooltipProps & {
    className?: string;
    icon?: string;
    hideTooltip?: boolean;
    children?: ReactNode;
  };

export const ButtonIcon = ({
  className = "",
  icon = "",
  title = "",
  placement = "bottom",
  hideTooltip = false,
  children,
  ...buttonProps
}: ButtonIconProps) => {
  // 按钮内容
  const buttonContent = (
    <button className={cn("flex items-center justify-center text-xl", className)} {...buttonProps}>
      {icon ? <SvgIcon icon={icon} /> : children}
    </button>
  );

  // 如果隐藏tooltip或没有tooltip内容，直接返回按钮
  if (hideTooltip || !title) {
    return buttonContent;
  }

  // 使用Hero UI的Tooltip包装按钮
  return (
    <Tooltip title={title} placement={placement}>
      {buttonContent}
    </Tooltip>
  );
};
