import type { TableProps as AntdTableProps, ColumnsType } from "antd/es/table";
import type { UseTableOptions } from "@/lib/hooks/useTable";
import type { User } from "@/types/api/user";

// BasicTable Props
export interface BasicTableProps<T = any>
  extends Omit<AntdTableProps<T>, "dataSource" | "loading" | "pagination" | "onChange"> {
  // API 相关 - alova Method 实例，会返回 Service.ResponseListResult<T>
  apiFunction: (params: Record<string, any>) => any;
  searchParams?: Record<string, any>;

  // 表格配置
  columns: ColumnsType<T>;

  // useTable 选项
  tableOptions?: UseTableOptions;

  // 其他配置
  scroll?: { x?: number; y?: number };
  size?: "small" | "middle" | "large";
  fullHeight?: boolean;
  setLoading?: (loading: boolean) => void;
}

// UserTable Props
export interface UserTableProps extends Omit<BasicTableProps<User>, "apiFunction" | "columns"> {
  onEdit?: (record: User) => void;
  onDelete?: (record: User) => void;
  onView?: (record: User) => void;
  showActions?: boolean;
}

// UserAdvancedTable Props
export interface UserAdvancedTableProps extends Omit<UserTableProps, "searchParams"> {
  showSearchTips?: boolean;
}
