import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GetProp, Table, TableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import { useSearchParams } from "react-router";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_NAME,
  PAGE_SIZE_NAME,
  PAGE_SIZE_OPTIONS,
  validValue,
} from "@/lib";

type TablePaginationConfig = Exclude<GetProp<TableProps, "pagination">, boolean>;

export type TableRef = Parameters<typeof Table>[0]["ref"];

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

export interface UseTableOptions<T = []> {
  data: T[] | undefined;
  prefix?: string;
  page?: number;
  pageSize?: number;
  total?: number;
  searchParams?: Record<string, any>;
  isLoading?: boolean;
}

const getPrefixedKey = (key: string, prefix?: string) => (prefix ? `${prefix}_${key}` : key);

export function useTable<T extends Record<string, any>>(
  options: UseTableOptions<T>,
  tableOptions: TableProps<T> = {}
) {
  const { prefix, total } = options;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageKey = getPrefixedKey(PAGE_NAME, prefix);
  const pageSizeKey = getPrefixedKey(PAGE_SIZE_NAME, prefix);
  const page = searchParams.get(pageKey);
  const pageSize = searchParams.get(pageSizeKey);

  const tableRef: TableRef = useRef(null);
  const [tableData, setTableData] = useState<T[]>(options.data || []);

  const tableParams = useRef<TableParams>({
    pagination: {
      current: page ? Number(page) : options.page || DEFAULT_PAGE,
      pageSize: pageSize ? Number(pageSize) : options.pageSize || DEFAULT_PAGE_SIZE,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      total: total,
      showSizeChanger: true,
      showQuickJumper: true,
      size: "default",
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
    },
  });

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: TableParams["filters"],
      sorter: SorterResult<T> | SorterResult<T>[]
    ) => {
      const isChangePageSize = pagination.pageSize !== tableParams.current?.pagination?.pageSize;

      tableParams.current = {
        ...tableParams.current,
        pagination: {
          ...tableParams.current.pagination,
          ...pagination,
          current: isChangePageSize ? 1 : pagination.current,
        },
        filters,
        sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        sortField: Array.isArray(sorter) ? undefined : sorter.field,
      };

      setSearchParams((prev) => {
        const newSearch = new URLSearchParams(prev);

        const newParams = {
          page: isChangePageSize ? 1 : pagination.current,
          pageSize: isChangePageSize ? pagination.pageSize : undefined,
          sortBy: Array.isArray(sorter) ? undefined : sorter.field,
          sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        } as Record<string, any>;

        for (const key of Object.keys(newParams)) {
          const value = newParams[key];
          const prefixedKey = getPrefixedKey(key, prefix);
          if (newSearch.has(prefixedKey) && !value) {
            newSearch.delete(prefixedKey);
          }
          if (key === pageKey && !newSearch.get(pageKey) && Number(newParams.page) === 1) {
            continue;
          }
          if (validValue(value)) {
            newSearch.set(prefixedKey, String(value));
          }
        }

        return newSearch;
      });
    },
    [prefix, pageKey, setSearchParams]
  );

  useEffect(() => {
    if (!options.isLoading) {
      setTableData(options.data || []);

      tableParams.current = {
        ...tableParams.current,
        pagination: {
          ...tableParams.current.pagination,
          total: total,
          current: page ? Number(page) : options.page || DEFAULT_PAGE,
          pageSize: pageSize ? Number(pageSize) : options.pageSize || DEFAULT_PAGE_SIZE,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
        },
      };
    }
  }, [page, pageSize, total, options.page, options.pageSize, options.data, options.isLoading]);

  const tableProps = useMemo(
    () =>
      ({
        ref: tableRef,
        dataSource: tableData,
        pagination: tableParams.current.pagination,
        size: "middle",
        bordered: true,
        onChange: handleTableChange,
        rowKey: (record: T) => record.id,
        ...tableOptions,
      }) as TableProps<T>,
    [tableRef, tableData, tableOptions, handleTableChange]
  );

  return {
    tableRef,
    tableParams,
    tableProps,
    pagination: tableParams.current.pagination,
  };
}
