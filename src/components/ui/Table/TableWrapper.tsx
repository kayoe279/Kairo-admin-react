import { Children, type ReactNode } from "react";
import { cn } from "@/lib";

const Root = ({ children, fixedHeight = true }: { children: ReactNode; fixedHeight?: boolean }) => {
  const childrenArray = Children.toArray(children);
  const [top, main] = childrenArray;

  const onlyOneChild = childrenArray.length === 1;

  const classNames = cn(
    "h-full",
    fixedHeight && "table-wrapper min-h-0 flex-1 [&_.ant-card]:h-full [&_.ant-card-body]:h-full"
  );

  return (
    <div className={cn("flex flex-col gap-4", fixedHeight && "h-full overflow-hidden")}>
      {onlyOneChild ? (
        <div className={classNames}>{top}</div>
      ) : (
        <>
          <div className={cn("shrink-0")}>{top}</div>
          <div className={classNames}>{main}</div>
        </>
      )}
    </div>
  );
};

const Top = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const Main = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const TableWrapper = Object.assign(Root, { Top, Main });
