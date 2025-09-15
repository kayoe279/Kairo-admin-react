import React from "react";
import { BaseChart, type BaseChartProps } from "./BaseChart";
import { CHART_COLORS, DEFAULT_LEGEND, DEFAULT_TITLE, DEFAULT_TOOLTIP } from "./chartConfig";

export interface PieChartData {
  name: string;
  value: number;
}

export interface PieChartProps extends Omit<BaseChartProps, "option"> {
  /** 图表标题 */
  title?: string;
  /** 数据 */
  data: PieChartData[];
  /** 是否显示标签 */
  showLabel?: boolean;
  /** 是否显示标签线 */
  showLabelLine?: boolean;
  /** 内半径（环形图） */
  innerRadius?: string | number;
  /** 外半径 */
  outerRadius?: string | number;
  /** 中心位置 */
  center?: [string | number, string | number];
  /** 玫瑰图类型 */
  roseType?: "radius" | "area" | false;
}

/**
 * 饼状图组件
 * 支持饼图和环形图，具有现代扁平化设计风格
 */
export const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  showLabel = true,
  showLabelLine = true,
  innerRadius = 0,
  outerRadius = "70%",
  center = ["50%", "50%"],
  roseType = false,
  ...chartProps
}) => {
  // 构建图表配置
  const option = {
    title: title
      ? {
          ...DEFAULT_TITLE,
          text: title,
        }
      : undefined,

    tooltip: {
      ...DEFAULT_TOOLTIP,
      trigger: "item",
      formatter: (params: any) => {
        const { name, value, percent } = params;
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${name}</div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="color: ${CHART_COLORS.textSecondary};">数值: <strong style="color: ${CHART_COLORS.text};">${value}</strong></span>
              <span style="color: ${CHART_COLORS.textSecondary};">占比: <strong style="color: ${CHART_COLORS.primary[0]};">${percent}%</strong></span>
            </div>
          </div>
        `;
      },
    },

    legend: {
      ...DEFAULT_LEGEND,
      data: data.map((item) => item.name),
    },

    series: [
      {
        name: "数据",
        type: "pie",
        radius: [innerRadius, outerRadius],
        center,
        data: data.map((item, index) => ({
          ...item,
          itemStyle: {
            color: CHART_COLORS.primary[index % CHART_COLORS.primary.length],
            borderRadius: 6,
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        })),

        // 玫瑰图配置
        roseType,

        // 标签配置
        label: showLabel
          ? {
              show: true,
              position: "outside",
              formatter: "{b}: {c} ({d}%)",
              fontSize: 12,
              color: CHART_COLORS.text,
              fontWeight: 500,
            }
          : {
              show: false,
            },

        // 标签线配置
        labelLine:
          showLabelLine && showLabel
            ? {
                show: true,
                length: 15,
                length2: 20,
                smooth: true,
                lineStyle: {
                  color: CHART_COLORS.border,
                  width: 1,
                },
              }
            : {
                show: false,
              },

        // 强调样式
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.2)",
            borderWidth: 3,
          },
          label: {
            fontSize: 14,
            fontWeight: "bold",
          },
        },

        // 动画配置
        animationType: "scale",
        animationDuration: 1500,
        animationEasing: "elasticOut",
        animationDelay: (idx: number) => idx * 100,
      },
    ],
  };

  return <BaseChart option={option} {...chartProps} />;
};
