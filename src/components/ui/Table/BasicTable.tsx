import { useEffect, useMemo, useRef } from "react";
import { Card, Table } from "antd";
import { DynamicForm } from "@/components/ui/Form";
import { useSearchQuery, useTableHeight } from "@/hooks";
import { cn } from "@/lib";
import { useAppSettings } from "@/store";
import type { BasicTableProps } from "./type";

export function BasicTable<T>({
  filters,
  searchQuery,
  loading,
  tableRef,
  prefix,
  operation,
  cardTitle,
  fixedHeight = true,
  className,
  ...tableProps
}: BasicTableProps<T>) {
  const { headerSetting } = useAppSettings();
  const { noQuery, setSearchQuery, resetSearchQuery } = useSearchQuery({
    prefix,
  });

  const fixed = useMemo(
    () => fixedHeight && headerSetting.fixed,
    [fixedHeight, headerSetting.fixed]
  );

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { tableHeight, refreshTableHeight } = useTableHeight(tableContainerRef, {
    enabled: fixed,
  });

  const isLoading = useMemo(() => loading && !noQuery, [loading, noQuery]);

  const onSearch = (values: Record<string, any>) => {
    setSearchQuery(values);
  };

  const onReset = () => {
    resetSearchQuery();
  };

  useEffect(() => {
    if (!loading) {
      refreshTableHeight();
    }
  }, [refreshTableHeight, loading]);

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col gap-4", className)}>
      {filters.length ? (
        <Card title={cardTitle} className="shrink-0">
          <DynamicForm
            fields={filters}
            searchQuery={searchQuery}
            loading={isLoading}
            onSubmit={onSearch}
            onReset={onReset}
          />
        </Card>
      ) : null}
      <div
        ref={tableContainerRef}
        className={cn(
          "table-container flex min-h-0 flex-1 flex-col gap-4",
          fixed ? "[&_.ant-card]:h-full [&_.ant-card-body]:h-full" : ""
        )}
      >
        <Card className="h-full min-h-0 flex-1">
          {operation ? <div className="table-container-operation mb-4">{operation}</div> : null}

          <Table
            ref={tableRef}
            loading={loading}
            scroll={tableHeight ? { y: tableHeight, x: "max-content" } : { x: "max-content" }}
            {...tableProps}
          />
        </Card>
      </div>
    </div>
  );
}
