import type { TableProps as AntdTableProps, ColumnsType } from "antd/es/table";
import type { UseTableOptions } from "@/hooks/table";

// BasicTable Props
export interface BasicTableProps<T = any>
  extends Omit<AntdTableProps<T>, "dataSource" | "loading" | "pagination" | "onChange"> {
  searchParams?: Record<string, any>;

  // 表格配置
  columns?: ColumnsType<T>;

  // useTable 选项
  tableOptions?: UseTableOptions;

  // 其他配置
  scroll?: { x?: number; y?: number };
  size?: "small" | "middle" | "large";
  fullHeight?: boolean;
  setLoading?: (loading: boolean) => void;
}
