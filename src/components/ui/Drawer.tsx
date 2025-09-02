import * as React from "react";
import { createContext, useContext } from "react";
import { Button } from "@heroui/react";
import { cva } from "class-variance-authority";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
import { SvgIcon } from "./SvgIcon";

const DrawerDirectionContext = createContext<"left" | "right" | "top" | "bottom">("right");

const useDrawerDirection = () => {
  const context = useContext(DrawerDirectionContext);
  if (!context) {
    throw new Error("useDrawerDirection must be used within a DrawerDirectionContext");
  }
  return context;
};

const drawerVariants = cva(
  "group/drawer fixed z-[60] flex size-full flex-col overflow-hidden bg-background hover:select-auto transition-all duration-300 ease-in-out",
  {
    variants: {
      direction: {
        top: "mt-24 top-0 max-h-[90%] rounded-b-[10px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "bottom-0 mt-24 max-h-[90%] rounded-t-[10px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "bottom-0 left-0 md:max-w-[380px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "bottom-0 right-0 rounded-l-md md:max-w-[380px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },
    defaultVariants: {
      direction: "right",
    },
  }
);

const Drawer = ({
  shouldScaleBackground = true,
  isResponsive,
  direction = "right",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  isResponsive?: boolean;
}) => {
  return (
    <DrawerDirectionContext.Provider value={direction}>
      <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        direction={direction}
        noBodyStyles
        disablePreventScroll
        {...props}
      />
    </DrawerDirectionContext.Provider>
  );
};
Drawer.displayName = "Drawer";

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close> & {
    children?: React.ReactNode;
    className?: string;
  }
>(({ children, className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Close ref={ref} {...props} className={className} asChild={!children}>
      {children ? (
        children
      ) : (
        <Button isIconOnly variant="light">
          <SvgIcon icon="mdi:close" className="text-xl" />
          <span className="sr-only">Close drawer</span>
        </Button>
      )}
    </DrawerPrimitive.Close>
  );
});
DrawerClose.displayName = DrawerPrimitive.Close.displayName;

const DrawerTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger> & {
  className?: string;
}) => (
  <DrawerPrimitive.Trigger className={cn("focus-visible:outline-none", className)} {...props} />
);

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
    enableBlur?: boolean;
  }
>(({ className, enableBlur = true, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[60] bg-black/[0.3]",
      enableBlur && "backdrop-blur-sm backdrop-saturate-300",
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    enableOverlayBlur?: boolean;
  }
>(({ className, children, enableOverlayBlur = true, ...props }, ref) => {
  const direction = useDrawerDirection();

  return (
    <DrawerPortal>
      <DrawerOverlay enableBlur={enableOverlayBlur} />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(drawerVariants({ direction }), className)}
        data-vaul-no-drag={direction !== "bottom" ? true : undefined}
        aria-describedby={undefined}
        {...props}
      >
        {direction === "bottom" ? (
          <div className="mx-auto my-4 h-1.5 w-15 shrink-0 rounded-full bg-gray-300" />
        ) : null}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "border-default-200/50 relative flex flex-row justify-between gap-2 border-b px-4 py-2 text-center",
        className
      )}
      {...props}
    />
  );
};
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse px-4 py-2 sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "mr-2 ml-8 flex w-full flex-1 items-center justify-center text-center text-lg font-medium",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-900", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
