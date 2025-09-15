import { Table } from "antd";
import { cn } from "@/lib";
import { useTable } from "@/lib/hooks/useTable";
import type { BasicTableProps } from "@/types/table";

export function BasicTable<T = any>({
  apiFunction,
  columns,
  tableOptions = {},
  searchParams = {},
  size = "middle",
  bordered = true,
  className,
  ...restProps
}: BasicTableProps<T>) {
  const { tableProps, tableRef } = useTable<T>(apiFunction, {
    immediate: true,
    searchParams,
    ...tableOptions,
  });

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
