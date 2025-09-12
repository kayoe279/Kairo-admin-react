import React from "react";
import { useRequest } from "alova/client";
import { App, Button, Card, Space, Spin, Typography } from "antd";
import { usePermission } from "@/lib/hooks/usePermission";
import { defaultLoginParams } from "@/lib/settings/app";
import { login } from "@/service/api";
import { useAuthRoute, useUserActions, useUserInfo } from "@/store";
import type { RoleType } from "@/types";

const { Title } = Typography;

// 权限指令的React版本 - 作为高阶组件
const WithPermission: React.FC<{
  permissions: RoleType[];
  children: React.ReactNode;
}> = ({ permissions, children }) => {
  const { hasPermission } = usePermission();

  if (!hasPermission(permissions)) {
    return null;
  }

  return <>{children}</>;
};

export default function PermissionExample() {
  const userInfo = useUserInfo();
  const { updateUserInfo } = useUserActions();
  const { refreshRoutes } = useAuthRoute({ immediate: false });
  const { hasPermission } = usePermission();
  const { message } = App.useApp();

  const role = userInfo?.roles?.[0] || "";

  const { loading, send } = useRequest(login, {
    immediate: false,
  });

  const roleList: RoleType[] = ["super", "admin", "user"];

  const toggleUserRole = async (targetRole: RoleType) => {
    try {
      const result = await send({ ...defaultLoginParams, username: targetRole });
      if (result.data) {
        updateUserInfo(result.data);
        await refreshRoutes(result.data);
        message.success(`已切换到 ${targetRole} 角色`);
      }
    } catch (error) {
      message.error("角色切换失败");
    }
  };

  return (
    <Card title="权限示例" className="p-4">
      <Title level={1}>当前权限：{role}</Title>
      <Spin spinning={loading}>
        <Space wrap className="mb-6">
          {roleList.map((item) => (
            <Button
              key={item}
              type={role === item ? "primary" : "default"}
              onClick={() => toggleUserRole(item)}
            >
              {item}
            </Button>
          ))}
        </Space>
      </Spin>

      <Title level={2}>权限指令用法</Title>
      <Space wrap className="mb-6">
        <WithPermission permissions={["super"]}>
          <Button type="primary">仅super可见</Button>
        </WithPermission>
        <WithPermission permissions={["admin"]}>
          <Button variant="filled" color="blue">
            admin可见
          </Button>
        </WithPermission>
        <WithPermission permissions={["admin", "user"]}>
          <Button variant="filled" color="gold">
            admin和user可见
          </Button>
        </WithPermission>
        <WithPermission permissions={["user"]}>
          <Button variant="filled" color="danger">
            user可见
          </Button>
        </WithPermission>
      </Space>

      <Title level={2}>usePermission 函数用法</Title>
      <Space wrap>
        {hasPermission(["super"]) && (
          <Button variant="dashed" color="green">
            仅super可见
          </Button>
        )}
        {hasPermission(["admin"]) && (
          <Button variant="dashed" color="blue">
            admin可见
          </Button>
        )}
        {hasPermission(["admin", "user"]) && (
          <Button variant="dashed" color="gold">
            admin和user可见
          </Button>
        )}
        {hasPermission(["user"]) && (
          <Button variant="dashed" color="danger">
            user可见
          </Button>
        )}
      </Space>
    </Card>
  );
}
