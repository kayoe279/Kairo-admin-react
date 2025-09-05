import { useCallback } from "react";
import { ColorPicker as AntColorPicker } from "antd";
import type { ColorPickerProps } from "antd";
import { ErrorBoundary } from "react-error-boundary";

type Presets = Required<ColorPickerProps>["presets"][number];
type OnChange = Required<ColorPickerProps>["onChange"];
interface Props {
  color: string;
  palettes?: Presets[];
  disabled?: boolean;
  onColorChange?: (color: string) => void;
}

const defaultPalettes = [
  {
    label: "Colors",
    colors: [
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#0ea5e9",
      "#06b6d4",
      "#f43f5e",
      "#ef4444",
      "#d946ef",
      "#f97316",
      "#f59e0b",
      "#eab308",
      "#84cc16",
      "#22c55e",
      "#10b981",
      "#30B092",
    ],
  },
] as Presets[];

const ColorPickerBase = ({
  color,
  palettes,
  disabled = false,
  onColorChange,
}: Props & ColorPickerProps) => {
  const palettesList = palettes || defaultPalettes;

  const handleChange: OnChange = useCallback(
    (color) => {
      onColorChange?.(color.toHexString());
    },
    [onColorChange]
  );

  return (
    <AntColorPicker
      disabled={disabled}
      presets={palettesList}
      value={color}
      onChange={handleChange}
    />
  );
};

export const ColorPicker = (props: Props) => {
  return (
    <ErrorBoundary fallback={null}>
      <ColorPickerBase {...props} />
    </ErrorBoundary>
  );
};
