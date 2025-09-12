import React, { useCallback } from "react";
import { Button, Card, Progress } from "antd";
import { useDarkMode } from "@/lib/hooks";
import { useThemeActions, useThemeSettings, type ThemeType } from "@/store/theme";

export const AllColorsDemo: React.FC = () => {
  const settings = useThemeSettings();
  const { resetThemeColor, setThemeColor } = useThemeActions();
  const { isDarkMode } = useDarkMode();

  const colorTypes = [
    {
      name: "Primary",
      type: "primary" as const,
      value: settings.primaryColor,
      presets: ["#30B092", "#3b82f6", "#8b5cf6", "#22C55E", "#FAAD14", "#F5222D"],
    },
    {
      name: "Success",
      type: "success" as const,
      value: settings.successColor,
      presets: ["#17c964", "#22C55E", "#10b981", "#059669", "#16a34a", "#15803d"],
    },
    {
      name: "Warning",
      type: "warning" as const,
      value: settings.warningColor,
      presets: ["#f5a524", "#FAAD14", "#f59e0b", "#d97706", "#ca8a04", "#a16207"],
    },
    {
      name: "Error",
      type: "error" as const,
      value: settings.errorColor,
      presets: ["#f31260", "#F5222D", "#ef4444", "#dc2626", "#b91c1c", "#991b1b"],
    },
  ];

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const handleResetThemeColor = useCallback(
    (type: ThemeType) => {
      resetThemeColor({ type, isDarkMode });
    },
    [resetThemeColor, isDarkMode]
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">完整的动态颜色系统</h2>
        <p>基于图片提供的精确颜色值，完全匹配设计规范的动态主题系统</p>
      </div>

      {/* 颜色对比图 */}
      <div className="grid grid-cols-1 gap-8">
        {colorTypes.map((colorType) => {
          const buttonColor = colorType.type === "error" ? "danger" : (colorType.type as any);
          const showButtons = colorType.type === "primary" || colorType.type === "error";
          return (
            <Card key={colorType.type} className="overflow-hidden">
              <div className="flex w-full items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{colorType.name}</h3>
                  <div
                    className="h-6 w-6 rounded border border-gray-200"
                    style={{ backgroundColor: colorType.value }}
                  />
                  <span className="font-mono text-sm text-gray-500">{colorType.value}</span>
                </div>
                <Button
                  variant="filled"
                  color="green"
                  onClick={() => handleResetThemeColor(colorType.type)}
                >
                  重置
                </Button>
              </div>

              <div className="space-y-4">
                {/* 完整色阶展示 */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">完整色阶调色板</h4>
                  <div className="grid grid-cols-11 gap-1">
                    {shades.map((shade) => (
                      <div key={shade} className="text-center">
                        <div
                          className="mb-1 h-12 w-full rounded border border-gray-200"
                          style={{ backgroundColor: `var(--${colorType.type}-${shade})` }}
                        />
                        <span className="text-xs text-gray-500">{shade}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 预设颜色快速切换 */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">预设颜色</h4>
                  <div className="flex flex-wrap gap-2">
                    {colorType.presets.map((color) => (
                      <button
                        key={color}
                        onClick={() => setThemeColor({ type: colorType.type, color, isDarkMode })}
                        className={`h-8 w-8 rounded border-2 hover:scale-110 ${
                          colorType.value === color
                            ? "border-gray-900 ring-2 ring-gray-400"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* 组件示例 */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Antd 组件示例</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    {showButtons && (
                      <>
                        <Button color={buttonColor} variant="solid">
                          Solid
                        </Button>
                        <Button color={buttonColor} variant="outlined">
                          Outlined
                        </Button>
                        <Button color={buttonColor} variant="text">
                          Text
                        </Button>
                        <Button color={buttonColor} variant="filled">
                          Filled
                        </Button>
                      </>
                    )}
                    <Progress strokeColor={colorType.value as any} percent={75} className="w-24" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tailwind CSS 使用示例 */}
      <Card>
        <h3 className="text-xl font-semibold">Tailwind CSS 实际效果</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Base</h4>
              <div className="space-y-2">
                <div className="bg-background text-foreground rounded border border-amber-100 px-3 py-2 text-sm">
                  bg-background
                </div>
                <div className="text-foreground border-primary rounded border px-3 py-2 text-sm">
                  text-foreground
                </div>
                <div className="bg-background text-foreground-subtle rounded border border-amber-100 px-3 py-2 text-sm">
                  text-foreground-subtle
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Primary</h4>
              <div className="space-y-2">
                <div className="bg-primary rounded px-3 py-2 text-sm text-white">bg-primary</div>
                <div className="bg-primary-100 text-primary-900 rounded px-3 py-2 text-sm">
                  bg-primary-100
                </div>
                <div className="text-primary border-primary rounded border px-3 py-2 text-sm">
                  text-primary
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Success</h4>
              <div className="space-y-2">
                <div className="bg-success rounded px-3 py-2 text-sm text-white">bg-success</div>
                <div className="bg-success-100 text-success-900 rounded px-3 py-2 text-sm">
                  bg-success-100
                </div>
                <div className="text-success border-success rounded border px-3 py-2 text-sm">
                  text-success
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Warning</h4>
              <div className="space-y-2">
                <div className="bg-warning rounded px-3 py-2 text-sm text-white">bg-warning</div>
                <div className="bg-warning-100 text-warning-900 rounded px-3 py-2 text-sm">
                  bg-warning-100
                </div>
                <div className="text-warning border-warning rounded border px-3 py-2 text-sm">
                  text-warning
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Error</h4>
              <div className="space-y-2">
                <div className="bg-error rounded px-3 py-2 text-sm text-white">bg-error</div>
                <div className="bg-error-100 text-error-900 rounded px-3 py-2 text-sm">
                  bg-error-100
                </div>
                <div className="text-error border-error rounded border px-3 py-2 text-sm">
                  text-error
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4">
            <h4 className="mb-2 text-sm font-medium">✨ 特性亮点</h4>
            <ul className="text-foreground-subtle space-y-2 text-sm">
              <li>• 完全匹配设计规范的精确颜色值</li>
              <li>• 支持 50-900 的完整色阶系统</li>
              <li>• 自动适配亮色/暗色模式</li>
              <li>• 实时动态主题切换</li>
              <li>• Tailwind CSS 和 HeroUI 完全同步</li>
              <li>• 基于 CSS 变量的高性能实现</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
