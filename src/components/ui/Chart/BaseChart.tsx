import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import ReactEChartsCore from "echarts-for-react/lib/core";
import type React from "react";

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer
]);

export interface BaseChartProps {
  /** 图表配置选项 */
  option: any;
  /** 图表样式 */
  style?: React.CSSProperties;
  /** 图表类名 */
  className?: string;
  /** 是否显示加载动画 */
  showLoading?: boolean;
  /** 加载动画配置 */
  loadingOption?: any;
  /** 图表主题 */
  theme?: string;
  /** 响应式配置 */
  notMerge?: boolean;
  /** 延迟更新 */
  lazyUpdate?: boolean;
  /** 事件处理 */
  onEvents?: Record<string, (params: any) => void>;
}

/**
 * ECharts 基础组件封装
 * 提供统一的图表渲染能力和通用配置
 */
export const BaseChart: React.FC<BaseChartProps> = ({
  option,
  style = { height: "400px" },
  className = "",
  showLoading = false,
  loadingOption,
  theme,
  notMerge = false,
  lazyUpdate = false,
  onEvents = {}
}) => {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      style={style}
      className={className}
      showLoading={showLoading}
      loadingOption={loadingOption}
      theme={theme}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      onEvents={onEvents}
    />
  );
};
