import { useRef } from "react";
import { useLocation, useOutlet } from "react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { cn } from "@/lib";
import { useAppSettings } from "@/store";

export const PageMain = ({ className }: { className?: string }) => {
  const location = useLocation();
  const { isPageAnimate, pageAnimateType, refreshKey, headerSetting } = useAppSettings();
  const nodeRef = useRef<HTMLDivElement>(null);
  const outlet = useOutlet();

  if (!isPageAnimate) {
    return (
      <main
        className={cn(
          "text-foreground relative p-4",
          headerSetting.fixed && "min-h-0 flex-1 overflow-y-auto",
          className
        )}
      >
        {outlet}
      </main>
    );
  }

  return (
    <main className={cn("text-foreground flex min-h-0 flex-1 flex-col", className)}>
      <SwitchTransition>
        <CSSTransition
          key={`${location.pathname}-${refreshKey}`}
          nodeRef={nodeRef}
          timeout={300}
          classNames={`page-${pageAnimateType}`}
          unmountOnExit
        >
          <div
            ref={nodeRef}
            className={cn(
              "relative flex flex-col gap-4 p-4",
              headerSetting.fixed && "min-h-0 flex-1 overflow-y-auto"
            )}
          >
            {outlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
};
