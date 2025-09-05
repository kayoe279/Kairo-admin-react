import { useRef } from "react";
import { useLocation, useOutlet } from "react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { cn } from "@/lib";
import { useAppSettings } from "@/store";

export const PageMain = ({ className }: { className?: string }) => {
  const location = useLocation();
  const { isPageAnimate, pageAnimateType } = useAppSettings();
  const nodeRef = useRef<HTMLDivElement>(null);
  const outlet = useOutlet();

  if (!isPageAnimate) {
    return <div className="size-full overflow-y-auto p-4">{outlet}</div>;
  }

  return (
    <main className={cn("text-foreground bg-background-root relative overflow-y-auto", className)}>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames={`page-${pageAnimateType}`}
          unmountOnExit
        >
          <div ref={nodeRef} className="absolute inset-0 size-full overflow-y-auto p-4">
            {outlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
};
