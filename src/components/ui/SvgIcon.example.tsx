import { SvgIcon } from "./SvgIcon";

/**
 * SvgIcon 使用示例
 */
export const SvgIconExample = () => {
  return (
    <div className="space-y-4 p-6">
      <h2 className="mb-4 text-2xl font-bold">SvgIcon 组件示例</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Iconify 图标</h3>
        <div className="flex items-center space-x-4">
          <SvgIcon icon="mdi:home" />
          <SvgIcon icon="mdi:user" />
          <SvgIcon icon="mdi:settings" />
          <SvgIcon icon="mdi:heart" className="text-red-500" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">本地 SVG 图标</h3>
        <div className="flex items-center space-x-4">
          <SvgIcon localIcon="menu" />
          <SvgIcon localIcon="close" />
          <SvgIcon localIcon="search" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">大小控制</h3>
        <div className="flex items-center space-x-4">
          <SvgIcon icon="mdi:star" style={{ fontSize: "16px" }} />
          <SvgIcon icon="mdi:star" style={{ fontSize: "24px" }} />
          <SvgIcon icon="mdi:star" style={{ fontSize: "32px" }} />
          <SvgIcon icon="mdi:star" style={{ fontSize: "48px" }} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">自定义样式</h3>
        <div className="flex items-center space-x-4">
          <SvgIcon icon="mdi:palette" className="text-blue-500" style={{ fontSize: "24px" }} />
          <SvgIcon icon="mdi:palette" className="text-green-500" style={{ fontSize: "24px" }} />
          <SvgIcon icon="mdi:palette" className="text-purple-500" style={{ fontSize: "24px" }} />
        </div>
      </div>
    </div>
  );
};
