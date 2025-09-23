import { useMemo, useRef, useState } from "react";
import { useWatcher } from "alova/client";
import type { GetProp, Table, TableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import { useTableHeight, type UseTableHeightOptions } from "./useTableHeight";

type TablePaginationConfig = Exclude<GetProp<TableProps, "pagination">, boolean>;

export type TableRef = Parameters<typeof Table>[0]["ref"];

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

export interface UseTableOptions {
  immediate?: boolean;
  defaultPageSize?: number;
  defaultCurrent?: number;
  searchParams?: Record<string, any>;
  /**
   * 高度计算选项
   */
  heightOptions?: UseTableHeightOptions;
}

export interface UseTableResult<T = any> {
  tableRef: TableRef;
  data: T[];
  loading: boolean;
  tableParams: TableParams;
  tableProps: TableProps<T> & { ref?: TableRef };
  pagination?: TablePaginationConfig;
  refresh: (params?: Record<string, any>) => void;
  tableHeight?: number;
  refreshHeight: () => void;
}

const getApiParams = (tableParams: TableParams, searchParams: Record<string, any> = {}) => {
  const { pagination, filters, sortField, sortOrder } = tableParams;
  const result: Record<string, any> = {};

  // 分页参数
  result.pageSize = pagination?.pageSize;
  result.page = pagination?.current;

  // 筛选参数
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        result[key] = value;
      }
    });
  }

  // 排序参数
  if (sortField) {
    result.sortField = sortField;
    result.sortOrder = sortOrder === "ascend" ? "asc" : "desc";
  }

  // 搜索参数
  Object.entries(searchParams || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      result[key] = value;
    }
  });

  return result;
};

export function useTable<T = any>(
  apiFunction: (params: Record<string, any>) => any,
  options: UseTableOptions = {}
): UseTableResult<T> {
  const { immediate = true, defaultPageSize = 20, defaultCurrent = 1, heightOptions } = options;

  const tableRef: TableRef = useRef(null);
  // 使用 useMemo 和深度比较稳定化 searchParams 引用，避免无限重新渲染
  const prevSearchParamsRef = useRef<Record<string, any>>({});

  const searchParams = useMemo(() => {
    const newParams = options.searchParams || {};
    if (JSON.stringify(prevSearchParamsRef.current) === JSON.stringify(newParams)) {
      return prevSearchParamsRef.current;
    }
    prevSearchParamsRef.current = newParams;
    return newParams;
  }, [options.searchParams]);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: defaultCurrent,
      pageSize: defaultPageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      size: "default",
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
    },
  });

  // 使用高度计算 hook
  const { tableHeight, refresh: refreshHeight } = useTableHeight(tableRef, heightOptions);

  // 使用 useWatcher 监听参数变化并自动发送请求
  const {
    data: response,
    loading,
    send: fetchData,
    onSuccess,
  } = useWatcher(
    () => apiFunction(getApiParams(tableParams, searchParams)),
    [
      tableParams.pagination?.current,
      tableParams.pagination?.pageSize,
      tableParams.sortField,
      tableParams.sortOrder,
      tableParams.filters,
      searchParams,
    ],
    {
      immediate,
      debounce: 300,
    }
  );

  const data = useMemo(() => response?.data?.list || [], [response]);

  onSuccess((response) => {
    const result = response?.data?.data;
    if (result) {
      const { page, pageSize, total } = result;
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          current: page || 1,
          pageSize: pageSize || defaultPageSize,
          total: total || 0,
        },
      }));

      // 数据更新后重新计算高度
      setTimeout(() => {
        refreshHeight();
      }, 100);
    }
  });

  const handleTableChange: TableProps<T>["onChange"] = (pagination, filters, sorter) => {
    setTableParams({
      pagination: {
        ...pagination,
        current: pagination.pageSize !== tableParams.pagination?.pageSize ? 1 : pagination.current,
      },
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  const refresh = (params?: Record<string, any>) => {
    const newParams = getApiParams(tableParams, params);
    fetchData(newParams);
  };

  const tableProps = {
    ref: tableRef,
    dataSource: data,
    loading,
    pagination: tableParams.pagination,
    onChange: handleTableChange,
    rowKey: (record: any) => record.id,
    scroll: tableHeight ? { y: tableHeight } : undefined,
  };

  return {
    tableRef,
    data,
    loading,
    tableParams,
    tableProps,
    pagination: tableParams.pagination,
    refresh,
    tableHeight,
    refreshHeight,
  };
}
