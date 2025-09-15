import { useCallback, useEffect, useState } from "react";
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

export function useTableHeight(tableRef: TableRef, options: UseTableHeightOptions = {}) {
  const { offset = 0, enabled = true, debounce = 100, trigger } = options;

  const [tableHeight, setTableHeight] = useState<number | undefined>();

  const calculateHeight = useCallback(() => {
    if (!enabled) {
      setTableHeight(undefined);
      return;
    }

    try {
      // 通过 tableRef 获取表格的 DOM 元素
      const tableElement = tableRef && "current" in tableRef ? tableRef.current : null;

      if (!tableElement) {
        console.warn("表格 ref 未找到");
        setTableHeight(undefined);
        return;
      }

      const tableContainer = document.querySelector(".table-wrapper") as HTMLElement;

      if (!tableContainer) {
        console.warn("未找到 .table-wrapper 容器");
        setTableHeight(undefined);
        return;
      }

      // 在表格容器内查找相关元素，避免全局查找
      const tableHeader = tableContainer.querySelector(".ant-table-header") as HTMLElement;
      const pagination = tableContainer.querySelector(".ant-pagination") as HTMLElement;

      const containerHeight = tableContainer.offsetHeight - 48; // 减去容器padding
      const tableHeaderHeight = tableHeader?.offsetHeight || 0;
      const paginationHeight = (pagination?.offsetHeight || 0) + 16; // 加上间距

      // 计算可用高度
      const availableHeight = containerHeight - tableHeaderHeight - paginationHeight + offset;

      // 设置最小高度，避免高度过小
      const minHeight = 200;
      const finalHeight = Math.max(availableHeight, minHeight);

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
  }, [enabled, offset, tableRef]);

  // 使用 usehooks-ts 的防抖 hook
  const debouncedCalculateHeight = useDebounceCallback(calculateHeight, debounce);

  useEffect(() => {
    if (!enabled) return;

    // 初始计算
    calculateHeight();

    // 监听窗口大小变化
    const handleResize = () => {
      debouncedCalculateHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled, calculateHeight, debouncedCalculateHeight]);

  // 当触发器变化时重新计算高度（用于数据变化等情况）
  useEffect(() => {
    if (enabled && trigger !== undefined) {
      debouncedCalculateHeight();
    }
  }, [trigger, enabled, debouncedCalculateHeight]);

  return {
    tableHeight,
    refresh: calculateHeight,
  };
}
