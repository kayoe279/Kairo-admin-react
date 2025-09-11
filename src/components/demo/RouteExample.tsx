import { Alert, Card, Divider, Tag, Typography } from "antd";
import { useRequireAuth, useRequireRoles, useRouteMetaMeta } from "@/lib/hooks/useRouteMatch";

const { Text } = Typography;

export const RouteMetaExample = () => {
  const routeMeta = useRouteMetaMeta();
  const requireAuth = useRequireAuth();
  const requiredRoles = useRequireRoles();

  return (
    <div className="space-y-6 p-6">
      <Card title="路由 Meta 配置示例" className="shadow-sm">
        <Alert
          message="这个页面演示了如何根据路由的 meta 配置自动应用权限验证"
          description="现在权限验证完全由路由的 meta 配置控制，无需手动包装组件。"
          type="info"
          showIcon
          className="mb-4"
        />

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">当前路由权限信息</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Text strong>需要登录:</Text>
                <Tag color={requireAuth ? "red" : "green"}>{requireAuth ? "是" : "否"}</Tag>
              </div>
              <div className="flex items-center space-x-2">
                <Text strong>需要角色:</Text>
                {requiredRoles.length > 0 ? (
                  requiredRoles.map((role) => (
                    <Tag key={role} color="blue">
                      {role}
                    </Tag>
                  ))
                ) : (
                  <Tag color="gray">无</Tag>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Text strong>便捷 Hook 使用:</Text>
              <pre className="mt-2 rounded bg-gray-100 p-3 text-sm">
                {`import { 
  useRouteMatch, 
  useRouteMetaMeta, 
  useRequireAuth, 
  useRequireRoles 
} from "@/lib/hooks/useRouteMatch";

// 无需传参，自动使用 rootRoutes
const requireAuth = useRequireAuth();
const requiredRoles = useRequireRoles();
const routeMeta = useRouteMetaMeta();`}
              </pre>
            </div>
            <div className="mt-4">
              <Text strong>完整 Meta 信息:</Text>
              <div className="mt-2 rounded bg-gray-50 p-4">
                <pre className="text-sm">{JSON.stringify(routeMeta, null, 2)}</pre>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="mb-2 text-lg font-semibold">路由配置示例</h3>
            <div className="space-y-4">
              <div>
                <Text strong>1. 公开页面（不需要登录）:</Text>
                <pre className="mt-2 rounded bg-gray-100 p-3 text-sm">
                  {`{
  path: "/public",
  element: <PublicPage />,
  meta: {
    name: "public",
    icon: "solar:globe-broken",
    ignoreAuth: true // 忽略权限验证
  }
}`}
                </pre>
              </div>

              <div>
                <Text strong>2. 需要登录的页面:</Text>
                <pre className="mt-2 rounded bg-gray-100 p-3 text-sm">
                  {`{
  path: "/dashboard",
  element: <DashboardPage />,
  meta: {
    name: "dashboard",
    icon: "solar:chart-broken",
    requireAuth: true // 需要登录验证
  }
}`}
                </pre>
              </div>

              <div>
                <Text strong>3. 需要特定角色的页面:</Text>
                <pre className="mt-2 rounded bg-gray-100 p-3 text-sm">
                  {`{
  path: "/admin",
  element: <AdminPage />,
  meta: {
    name: "admin",
    icon: "solar:settings-broken",
    requireAuth: true,
    roles: ["admin"] // 需要 admin 角色
  }
}`}
                </pre>
              </div>

              <div>
                <Text strong>4. 多角色权限页面:</Text>
                <pre className="mt-2 rounded bg-gray-100 p-3 text-sm">
                  {`{
  path: "/management",
  element: <ManagementPage />,
  meta: {
    name: "management",
    icon: "solar:users-group-broken",
    requireAuth: true,
    roles: ["admin", "manager"] // 需要 admin 或 manager 角色
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="mb-2 text-lg font-semibold">权限验证逻辑</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Tag color="red">ignoreAuth: true</Tag>
                <Text>→ 直接渲染，不进行任何权限验证</Text>
              </div>
              <div className="flex items-center space-x-2">
                <Tag color="orange">requireAuth: false</Tag>
                <Text>→ 直接渲染，不需要登录</Text>
              </div>
              <div className="flex items-center space-x-2">
                <Tag color="blue">requireAuth: true</Tag>
                <Text>→ 需要登录验证</Text>
              </div>
              <div className="flex items-center space-x-2">
                <Tag color="green">roles: ["admin"]</Tag>
                <Text>→ 需要指定角色权限</Text>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="mb-2 text-lg font-semibold">优势</h3>
            <div className="space-y-2 text-sm">
              <p>
                ✅ <strong>声明式配置:</strong> 权限配置直接在路由定义中
              </p>
              <p>
                ✅ <strong>自动应用:</strong> 无需手动包装每个组件
              </p>
              <p>
                ✅ <strong>类型安全:</strong> TypeScript 类型检查
              </p>
              <p>
                ✅ <strong>易于维护:</strong> 权限逻辑集中管理
              </p>
              <p>
                ✅ <strong>灵活配置:</strong> 支持多种权限组合
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
