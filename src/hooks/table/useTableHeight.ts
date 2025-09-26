import { useCallback, useEffect, useState, type RefObject } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";

export interface UseTableHeightOptions {
  /**
   * 额外的高度偏移量，用于微调
   */
  offset?: number;
  /**
   * 是否启用高度计算
   */
  enabled?: boolean;
  /**
   * 防抖延迟（毫秒）
   */
  debounce?: number;
  /**
   * 数据变化触发器，当此值变化时重新计算高度
   */
  trigger?: any;
}

// 常量定义
const constants = {
  tableContainerSelector: ".table-container",
  tableContainerOperationSelector: ".table-container-operation",
  tableHeaderSelector: ".ant-table-header",
  paginationSelector: ".ant-pagination",
  containerPadding: 48,
  operationSpacing: 16,
  paginationSpacing: 16,
  minHeight: 500,
} as const;

// 计算表格高度公式：table-container - table-operation - n-data-table-thead - n-data-table__pagination - 12(分页margin)

export function useTableHeight(
  tableContainerRef: RefObject<HTMLDivElement | null>,
  options: UseTableHeightOptions = {}
) {
  const { offset = 0, enabled = true, debounce = 50 } = options;

  const [tableHeight, setTableHeight] = useState<number | undefined>();

  const { height = 0 } = useResizeObserver({
    ref: tableContainerRef as RefObject<HTMLDivElement>,
  });

  // 计算高度的核心逻辑
  const calculateHeight = useCallback(() => {
    if (!enabled) {
      setTableHeight(undefined);
      return;
    }

    try {
      if (!tableContainerRef.current) {
        console.warn("未找到 .table-container 容器");
        return null;
      }

      const tableContainer = tableContainerRef.current;

      // 在表格容器内查找相关元素，避免全局查找
      const tableOperation = tableContainer?.querySelector(
        constants.tableContainerOperationSelector
      ) as HTMLElement;
      const tableHeader = tableContainer.querySelector(
        constants.tableHeaderSelector
      ) as HTMLElement;
      const pagination = tableContainer.querySelector(constants.paginationSelector) as HTMLElement;

      // 计算各部分高度
      const tableOperationHeight = tableOperation?.offsetHeight
        ? tableOperation.offsetHeight + constants.operationSpacing
        : 0;
      const containerHeight = tableContainer.offsetHeight - constants.containerPadding;
      const tableHeaderHeight = tableHeader?.offsetHeight || 0;
      const paginationHeight = pagination?.offsetHeight
        ? pagination?.offsetHeight + constants.paginationSpacing
        : 0;

      // 计算可用高度
      const tableHeight =
        containerHeight - tableOperationHeight - tableHeaderHeight - paginationHeight + offset;
      const finalHeight = Math.max(tableHeight, constants.minHeight);

      setTableHeight(finalHeight);
    } catch (error) {
      console.error("计算表格高度时出错:", error);
      setTableHeight(undefined);
    }
  }, [enabled, offset, tableContainerRef]);

  // 使用防抖 hook
  const debouncedCalculateHeight = useDebounceCallback(calculateHeight, debounce);

  useEffect(() => {
    if (!enabled) return;
    debouncedCalculateHeight();
  }, [height, enabled, debouncedCalculateHeight]);

  useEffect(() => {
    if (!enabled) return;

    // 初始计算
    calculateHeight();

    // 同时保留窗口 resize 事件作为备用
    const handleWindowResize = () => {
      debouncedCalculateHeight();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [enabled, calculateHeight, debouncedCalculateHeight]);

  return {
    tableHeight,
    refreshTableHeight: debouncedCalculateHeight,
  };
}
