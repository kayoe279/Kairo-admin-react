import { useRef } from "react";
import { useLocation, useOutlet } from "react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { cn } from "@/lib";
import { useAppSettings } from "@/store";

export const PageMain = ({ className }: { className?: string }) => {
  const location = useLocation();
  const { isPageAnimate, pageAnimateType, refreshKey } = useAppSettings();
  const nodeRef = useRef<HTMLDivElement>(null);
  const outlet = useOutlet();

  if (!isPageAnimate) {
    return (
      <main className={cn("text-foreground bg-background-root p-4", className)}>{outlet}</main>
    );
  }

  return (
    <main className={cn("text-foreground bg-background-root relative p-4", className)}>
      <SwitchTransition>
        <CSSTransition
          key={`${location.pathname}-${refreshKey}`}
          nodeRef={nodeRef}
          timeout={300}
          classNames={`page-${pageAnimateType}`}
          unmountOnExit
        >
          <div ref={nodeRef}>{outlet}</div>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
};
