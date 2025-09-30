import { type ComponentProps, type ReactNode } from "react";
import { Drawer as AntdDrawer, Button } from "antd";
import type { DrawerClassNames } from "antd/es/drawer/DrawerPanel";
import { SvgIcon } from "@/components/ui";

export const Drawer = ({
  children,
  classNames,
  blurMask = true,
  ...props
}: { children: ReactNode; blurMask?: boolean } & ComponentProps<typeof AntdDrawer>) => {
  const drawerClassNames: DrawerClassNames = {
    header: "text-center !py-2",
    content: props.placement === "left" ? "rounded-r-lg" : "rounded-l-lg",
    mask: blurMask ? "backdrop-blur-sm backdrop-saturate-300" : "",
    body: "flex flex-col",
    footer: "!py-4",
    ...classNames,
  };

  return (
    <AntdDrawer
      classNames={drawerClassNames}
      closeIcon={false}
      extra={
        <Button
          color="default"
          variant="text"
          size="small"
          className="!size-8 !p-0"
          onClick={(e) => props.onClose?.(e as any)}
        >
          <SvgIcon icon="pajamas:close" className="text-xl" />
        </Button>
      }
      {...props}
    >
      {children}
    </AntdDrawer>
  );
};
