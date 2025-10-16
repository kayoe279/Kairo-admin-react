const colorVars = {
  primary: "--primary-500",
  secondary: "--secondary-500",
  success: "--success-500",
  warning: "--warning-500",
  error: "--error-500"
} as const;

// 生成颜色调色板的辅助函数
export const generateColorPalette = (
  type: keyof typeof colorVars,
  value?: string
): Record<string, string> => {
  const root = document.documentElement;
  const baseColor = value || getComputedStyle(root).getPropertyValue(colorVars[type]).trim();
  // 将 hex 颜色转换为 HSL
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  // HSL 转换为 hex
  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  };

  const [h, s, l] = hexToHsl(baseColor);

  // 根据基础颜色生成完整的调色板
  return {
    "50": hslToHex(h, Math.max(s - 30, 10), Math.min(l + 40, 97)),
    "100": hslToHex(h, Math.max(s - 20, 15), Math.min(l + 30, 94)),
    "200": hslToHex(h, Math.max(s - 10, 20), Math.min(l + 20, 87)),
    "300": hslToHex(h, s, Math.min(l + 10, 77)),
    "400": hslToHex(h, s, Math.max(l - 5, 60)),
    "500": baseColor,
    "600": hslToHex(h, Math.min(s + 5, 100), Math.max(l - 10, 45)),
    "700": hslToHex(h, Math.min(s + 10, 100), Math.max(l - 20, 35)),
    "800": hslToHex(h, Math.min(s + 15, 100), Math.max(l - 30, 25)),
    "900": hslToHex(h, Math.min(s + 20, 100), Math.max(l - 40, 15))
  };
};

// 将 hex 颜色转换为 rgba 颜色
export const hexToRgba = (hex: string, alpha = 1): string => {
  // 去掉开头的 #
  hex = hex.replace(/^#/, "");

  // 处理简写形式 (#abc)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
