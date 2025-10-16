import type React from "react";
import { BaseChart, type BaseChartProps } from "./BaseChart";
import {
  CHART_COLORS,
  DEFAULT_AXIS,
  DEFAULT_GRID,
  DEFAULT_LEGEND,
  DEFAULT_TITLE,
  DEFAULT_TOOLTIP,
  getFlatStyle,
  getGradientColor
} from "./chartConfig";

export interface BarChartData {
  name: string;
  value: number;
}

export interface BarChartProps extends Omit<BaseChartProps, "option"> {
  /** 图表标题 */
  title?: string;
  /** 数据 */
  data: BarChartData[];
  /** X轴标签 */
  xAxisData?: string[];
  /** 是否显示数值标签 */
  showLabel?: boolean;
  /** 是否使用渐变色 */
  useGradient?: boolean;
  /** 柱子宽度 */
  barWidth?: string | number;
  /** 是否水平显示 */
  horizontal?: boolean;
}

/**
 * 柱状图组件
 * 支持垂直和水平柱状图，具有现代扁平化设计风格
 */
export const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  xAxisData,
  showLabel = true,
  useGradient = true,
  barWidth = "60%",
  horizontal = false,
  ...chartProps
}) => {
  // 构建图表配置
  const option = {
    title: title
      ? {
          ...DEFAULT_TITLE,
          text: title
        }
      : undefined,

    tooltip: {
      ...DEFAULT_TOOLTIP,
      formatter: (params: any) => {
        const { name, value, seriesName } = params;
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${name}</div>
            <div style="color: ${CHART_COLORS.primary[0]};">
              ${seriesName || "数值"}: <strong>${value}</strong>
            </div>
          </div>
        `;
      }
    },

    legend: data.length > 1 ? DEFAULT_LEGEND : undefined,

    grid: DEFAULT_GRID,

    // 根据是否水平显示配置坐标轴
    ...(horizontal
      ? {
          xAxis: {
            ...DEFAULT_AXIS,
            type: "value",
            splitLine: {
              ...DEFAULT_AXIS.splitLine,
              show: true
            }
          },
          yAxis: {
            ...DEFAULT_AXIS,
            type: "category",
            data: xAxisData || data.map((item) => item.name),
            splitLine: {
              show: false
            }
          }
        }
      : {
          xAxis: {
            ...DEFAULT_AXIS,
            type: "category",
            data: xAxisData || data.map((item) => item.name),
            splitLine: {
              show: false
            }
          },
          yAxis: {
            ...DEFAULT_AXIS,
            type: "value",
            splitLine: {
              ...DEFAULT_AXIS.splitLine,
              show: true
            }
          }
        }),

    series: [
      {
        name: "数据",
        type: "bar",
        data: data.map((item) => item.value),
        barWidth,

        // 扁平化样式配置
        ...getFlatStyle(),

        // 颜色配置
        itemStyle: {
          ...getFlatStyle().itemStyle,
          color: useGradient ? getGradientColor(0) : CHART_COLORS.primary[0]
        },

        // 数值标签配置
        label: showLabel
          ? {
              show: true,
              position: horizontal ? "right" : "top",
              color: CHART_COLORS.text,
              fontSize: 11,
              fontWeight: 500,
              formatter: "{c}"
            }
          : undefined,

        // 动画配置
        animationDuration: 1000,
        animationEasing: "cubicOut"
      }
    ]
  };

  return <BaseChart option={option} {...chartProps} />;
};
