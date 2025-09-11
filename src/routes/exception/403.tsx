import { Button, Result } from "antd";
import { useNavigate } from "react-router";

export default function Exception403() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center">
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您没有权限访问此页面。"
        extra={
          <div className="space-x-2">
            <Button type="primary" onClick={() => navigate("/")}>
              返回首页
            </Button>
            <Button onClick={() => navigate(-1)}>返回上一页</Button>
          </div>
        }
      />
    </div>
  );
}
