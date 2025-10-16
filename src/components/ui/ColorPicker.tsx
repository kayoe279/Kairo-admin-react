import type { ColorPickerProps } from "antd";
import { ColorPicker as AntColorPicker } from "antd";
import { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { appThemeList } from "@/lib/settings/theme";

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
    colors: appThemeList
  }
] as Presets[];

const ColorPickerBase = ({
  color,
  palettes,
  disabled = false,
  onColorChange
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
