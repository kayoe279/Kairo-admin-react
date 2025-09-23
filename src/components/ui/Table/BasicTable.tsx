import { useEffect } from "react";
import { Table } from "antd";
import { useTable } from "@/hooks/useTable";
import { cn } from "@/lib";
import type { BasicTableProps } from "@/types/table";

export function BasicTable<T = any>({
  apiFunction,
  columns,
  tableOptions = {},
  searchParams = {},
  size = "middle",
  bordered = true,
  className,
  setLoading,
  ...restProps
}: BasicTableProps<T>) {
  const { tableProps, tableRef, loading } = useTable<T>(apiFunction, {
    immediate: true,
    searchParams,
    ...tableOptions,
  });

  useEffect(() => {
    setLoading?.(loading);
  }, [loading, setLoading]);

  return (
    <Table<T>
      ref={tableRef}
      {...tableProps}
      {...restProps}
      columns={columns}
      size={size}
      bordered={bordered}
      className={cn(className)}
    />
  );
}
