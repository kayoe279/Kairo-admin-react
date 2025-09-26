import type { ReactNode, RefObject } from "react";
import type { TableProps as AntdTableProps, TableRef } from "antd/es/table";
import type { DynamicFormField } from "@/components/ui/Form";

export interface BasicTableProps<T = any> extends AntdTableProps<T> {
  filters: DynamicFormField[];
  searchQuery: Record<string, string | undefined>;
  tableRef?: RefObject<TableRef>;
  // 其他配置
  prefix?: string;
  cardTitle?: string;
  operation?: ReactNode;
  fixedHeight?: boolean;
  showActions?: boolean;
}
