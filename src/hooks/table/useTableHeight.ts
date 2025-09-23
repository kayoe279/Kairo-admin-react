import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import type { TableRef } from "./useTable";

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
const CONSTANTS = {
  TABLE_WRAPPER_SELECTOR: ".table-wrapper",
  TABLE_WRAPPER_OPERATION_SELECTOR: ".table-wrapper-operation",
  TABLE_HEADER_SELECTOR: ".ant-table-header",
  PAGINATION_SELECTOR: ".ant-pagination",
  CONTAINER_PADDING: 48,
  PAGINATION_SPACING: 16,
  MIN_HEIGHT: 200,
} as const;

export function useTableHeight(tableRef: TableRef, options: UseTableHeightOptions = {}) {
  const { offset = 0, enabled = true, debounce = 100, trigger } = options;

  const [tableHeight, setTableHeight] = useState<number | undefined>();
  const tableContainerRef = useRef<HTMLElement | null>(null);

  // 获取表格容器的工具函数
  const getTableContainer = useCallback((): HTMLElement | null => {
    if (!tableContainerRef.current) {
      tableContainerRef.current = document.querySelector(CONSTANTS.TABLE_WRAPPER_SELECTOR);
    }
    return tableContainerRef.current;
  }, []);

  // 验证必要元素的工具函数
  const validateElements = useCallback(() => {
    const tableElement = tableRef && "current" in tableRef ? tableRef.current : null;
    const tableContainer = getTableContainer();

    if (!tableElement) {
      console.warn("表格 ref 未找到");
      return null;
    }

    if (!tableContainer) {
      console.warn("未找到 .table-wrapper 容器");
      return null;
    }

    return { tableElement, tableContainer };
  }, [tableRef, getTableContainer]);

  // 计算高度的核心逻辑
  const calculateHeight = useCallback(() => {
    if (!enabled) {
      setTableHeight(undefined);
      return;
    }

    try {
      const elements = validateElements();
      if (!elements) {
        setTableHeight(undefined);
        return;
      }

      const { tableContainer } = elements;

      // 在表格容器内查找相关元素，避免全局查找
      const tableOperation = tableContainer?.querySelector(
        CONSTANTS.TABLE_WRAPPER_OPERATION_SELECTOR
      ) as HTMLElement;
      const tableHeader = tableContainer.querySelector(
        CONSTANTS.TABLE_HEADER_SELECTOR
      ) as HTMLElement;
      const pagination = tableContainer.querySelector(CONSTANTS.PAGINATION_SELECTOR) as HTMLElement;
      const tableOperationHeight = tableOperation?.offsetHeight
        ? tableOperation.offsetHeight + 16
        : 0;

      // 计算各部分高度
      const containerHeight = tableContainer.offsetHeight - CONSTANTS.CONTAINER_PADDING;
      const tableHeaderHeight = tableHeader?.offsetHeight || 0;
      const paginationHeight = (pagination?.offsetHeight || 0) + CONSTANTS.PAGINATION_SPACING;

      // 计算可用高度
      const availableHeight =
        containerHeight - tableOperationHeight - tableHeaderHeight - paginationHeight + offset;
      const finalHeight = Math.max(availableHeight, CONSTANTS.MIN_HEIGHT);

      setTableHeight(finalHeight);

      console.info("高度计算结果:", {
        containerHeight,
        tableHeaderHeight,
        paginationHeight,
        offset,
        availableHeight,
        finalHeight,
      });
    } catch (error) {
      console.error("计算表格高度时出错:", error);
      setTableHeight(undefined);
    }
  }, [enabled, offset, validateElements]);

  const refreshTableHeight = useCallback(() => {
    setTimeout(() => {
      calculateHeight();
    }, 50);
  }, [calculateHeight]);

  // 使用 usehooks-ts 的防抖 hook
  const debouncedCalculateHeight = useDebounceCallback(calculateHeight, debounce);

  // 初始化 ResizeObserver 的工具函数
  const initResizeObserver = useCallback(
    (callback: () => void) => {
      const tableContainer = getTableContainer();

      if (!tableContainer) {
        console.warn("未找到 .table-wrapper 容器，无法设置 ResizeObserver");
        return null;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // 检查是否是高度变化
          if (entry.contentRect.height > 0) {
            callback();
          }
        }
      });

      // 监听表格容器和文档根元素的尺寸变化
      resizeObserver.observe(tableContainer);
      resizeObserver.observe(document.documentElement);

      return resizeObserver;
    },
    [getTableContainer]
  );

  useEffect(() => {
    if (!enabled) return;

    // 初始计算
    calculateHeight();

    let resizeObserver: ResizeObserver | null = null;

    // 延迟初始化，确保 DOM 已经渲染
    const timer = setTimeout(() => {
      resizeObserver = initResizeObserver(debouncedCalculateHeight);
    }, 0);

    // 同时保留窗口 resize 事件作为备用
    const handleWindowResize = () => {
      debouncedCalculateHeight();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", handleWindowResize);
      // 清理容器引用
      tableContainerRef.current = null;
    };
  }, [enabled, calculateHeight, debouncedCalculateHeight, initResizeObserver]);

  // 当触发器变化时重新计算高度（用于数据变化等情况）
  useEffect(() => {
    if (enabled && trigger !== undefined) {
      debouncedCalculateHeight();
    }
  }, [trigger, enabled, debouncedCalculateHeight]);

  return {
    tableHeight,
    refreshTableHeight,
  };
}
