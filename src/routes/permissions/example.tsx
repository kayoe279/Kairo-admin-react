import { Alert, App, Button, Card, Space, Spin, Typography } from "antd";
import type React from "react";
import { usePermission } from "@/hooks/usePermission";
import { tryParseJson } from "@/lib";
import { type RoleType, useSignIn } from "@/service";
import { useAuthRoute, useUserActions, useUserInfo } from "@/store";

const { Title } = Typography;

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

  const role = userInfo?.user_metadata?.roles?.[0] || "";

  const { isPending, mutateAsync } = useSignIn();

  const roleList: RoleType[] = ["super", "admin", "user"];
  const accounts = tryParseJson(import.meta.env.VITE_EXAMPLE_ACCOUNT, []);
  const password = import.meta.env.VITE_EXAMPLE_PASSWORD;

  const roleMap = {
    super: accounts[0],
    admin: accounts[1],
    user: accounts[2]
  };

  const toggleUserRole = async (targetRole: RoleType) => {
    if (targetRole === role) {
      message.warning("当前角色与目标角色相同");
      return;
    }
    try {
      const result = await mutateAsync({
        email: roleMap[targetRole],
        password: password
      });
      if (result.user) {
        updateUserInfo(result.user);
        await refreshRoutes(result.user);
        message.success(`已切换到 ${targetRole} 角色`);
      }
    } catch {
      message.error("角色切换失败");
    }
  };

  if (accounts.length === 0 || !password) {
    return (
      <Card title="权限示例">
        <Alert
          message="警告"
          description="请先在 .env.local 文件中配置示例账号和密码"
          type="warning"
        />
      </Card>
    );
  }

  return (
    <Card title="权限示例" className="p-4">
      <Title level={2}>当前权限：{role}</Title>
      <Spin spinning={isPending}>
        <Space wrap className="mb-6">
          {roleList.map((item) => (
            <Button
              key={item}
              size="large"
              variant="filled"
              color={role === item ? "primary" : "default"}
              onClick={() => toggleUserRole(item)}
            >
              {item}
            </Button>
          ))}
        </Space>
      </Spin>

      <Title level={3}>权限指令用法</Title>
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

      <Title level={3}>usePermission 函数用法</Title>
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
