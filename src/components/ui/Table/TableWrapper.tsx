import { Children, useMemo, type ReactNode } from "react";
import { cn } from "@/lib";
import { useAppSettings } from "@/store";

const Root = ({ children, fixedHeight = true }: { children: ReactNode; fixedHeight?: boolean }) => {
  const childrenArray = Children.toArray(children);
  const [top, main] = childrenArray;
  const { headerSetting } = useAppSettings();

  const onlyOneChild = childrenArray.length === 1;

  const fixed = useMemo(
    () => fixedHeight && headerSetting.fixed,
    [fixedHeight, headerSetting.fixed]
  );

  const classNames = cn(
    "h-full",
    fixed && "table-wrapper shrink-0 min-h-0 flex-1 [&_.ant-card]:h-full [&_.ant-card-body]:h-full"
  );

  return (
    <div className={cn("group/table flex flex-col gap-4", fixed && "h-full overflow-hidden")}>
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

const Operation = ({ children }: { children: ReactNode }) => {
  return <div className="table-wrapper-operation mb-4">{children}</div>;
};

export const TableWrapper = Object.assign(Root, {
  Operation,
});
