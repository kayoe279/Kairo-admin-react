import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spin indicator={<LoadingOutlined spin />} size="large" className={className} />
    </div>
  );
};
