import { type ComponentProps, type ReactNode } from "react";
import { Button } from "@heroui/react";
import { Drawer as AntdDrawer } from "antd";
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
    content: "rounded-l-lg",
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
        <Button isIconOnly variant="light" size="sm" onPress={(e) => props.onClose?.(e as any)}>
          <SvgIcon icon="majesticons:close-line" className="text-xl" />
        </Button>
      }
      {...props}
    >
      {children}
    </AntdDrawer>
  );
};
