import React from "react";
import { appThemeList } from "@/lib/settings/theme";
import { useThemeStore } from "@/store/theme";

export const ColorPalette: React.FC = () => {
  const { settings, actions } = useThemeStore();

  const primaryShades = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Primary 颜色调色板</h3>

      {/* 当前主题颜色 */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium">当前主题色: {settings.primaryColor}</h4>
        <div className="grid grid-cols-11 gap-2">
          {primaryShades.map((shade) => (
            <div key={shade} className="text-center">
              <div
                className={`mb-2 h-16 w-16 rounded-lg border border-gray-200`}
                style={{ backgroundColor: `var(--primary-${shade})` }}
              />
              <span className="text-xs text-gray-600">{shade}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 预设颜色选择 */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium">预设主题色</h4>
        <div className="grid grid-cols-7 gap-3">
          {appThemeList.map((color) => (
            <button
              key={color}
              onClick={() => actions.setThemeColor({ type: "primary", color })}
              className={`h-12 w-12 rounded-lg border-2 hover:scale-110 ${
                settings.primaryColor === color
                  ? "border-gray-900 ring-2 ring-gray-400"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* 使用示例 */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium">使用示例</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <button className="bg-primary hover:bg-primary-600 text-foreground rounded-lg px-4 py-2">
              Primary Button
            </button>
            <span className="text-primary font-medium">Primary Text</span>
            <div className="bg-primary-50 text-primary-700 rounded-md px-3 py-1">Primary Badge</div>
          </div>

          <div className="text-sm text-gray-600">
            <p>• bg-primary: 使用 primary-500</p>
            <p>• text-primary: 使用 primary-500</p>
            <p>• bg-primary-50: 使用 primary-50 (浅色背景)</p>
            <p>• text-primary-700: 使用 primary-700 (深色文字)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
