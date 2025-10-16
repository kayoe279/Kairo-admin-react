/**
 * ECharts 通用配置和主题
 */

// 通用颜色配置 - 扁平化设计风格
export const CHART_COLORS = {
  primary: ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
  gradient: [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  ],
  background: "#ffffff",
  text: "#374151",
  textSecondary: "#6B7280",
  border: "#E5E7EB"
};

// 通用网格配置
export const DEFAULT_GRID = {
  top: 60,
  left: 60,
  right: 40,
  bottom: 60,
  containLabel: true
};

// 通用标题配置
export const DEFAULT_TITLE = {
  textStyle: {
    color: CHART_COLORS.text,
    fontSize: 18,
    fontWeight: 600
  },
  left: "center",
  top: 20
};

// 通用提示框配置
export const DEFAULT_TOOLTIP = {
  trigger: "axis" as const,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderColor: CHART_COLORS.border,
  borderWidth: 1,
  textStyle: {
    color: CHART_COLORS.text,
    fontSize: 12
  },
  extraCssText: "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px;"
};

// 通用图例配置
export const DEFAULT_LEGEND = {
  top: "bottom",
  left: "center",
  textStyle: {
    color: CHART_COLORS.textSecondary,
    fontSize: 12
  },
  itemWidth: 12,
  itemHeight: 8,
  itemGap: 20
};

// 通用坐标轴配置
export const DEFAULT_AXIS = {
  axisLine: {
    lineStyle: {
      color: CHART_COLORS.border,
      width: 1
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: CHART_COLORS.textSecondary,
    fontSize: 11
  },
  splitLine: {
    lineStyle: {
      color: CHART_COLORS.border,
      type: "dashed" as const,
      width: 1
    }
  }
};

/**
 * 获取渐变色配置
 */
export const getGradientColor = (colorIndex: number) => {
  const colors = CHART_COLORS.primary;
  const color1 = colors[colorIndex % colors.length];

  return {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: color1 },
      { offset: 1, color: `${color1}40` } // 添加透明度
    ]
  };
};

/**
 * 获取扁平化样式配置
 */
export const getFlatStyle = () => ({
  emphasis: {
    focus: "series",
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, 0.1)"
    }
  },
  itemStyle: {
    borderRadius: [4, 4, 0, 0], // 圆角
    borderWidth: 0
  }
});
