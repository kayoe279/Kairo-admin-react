import { App, Card } from "antd";
import { UserTable } from "@/components/features";
import { TableWrapper } from "@/components/ui/Table";
import type { User } from "@/types/api";

export default function TableBasicExample() {
  const { message, modal } = App.useApp();

  const handleEdit = (record: User) => {
    message.info(`编辑用户: ${record.name}`);
  };

  const handleDelete = (record: User) => {
    modal.confirm({
      title: "确认删除",
      content: `确定要删除用户 ${record.name} 吗？`,
      onOk: () => {
        message.success(`已删除用户: ${record.name}`);
      },
    });
  };

  const handleView = (record: User) => {
    modal.info({
      title: "用户详情",
      content: (
        <div>
          <p>
            <strong>姓名:</strong> {record.name}
          </p>
          <p>
            <strong>邮箱:</strong> {record.email}
          </p>
          <p>
            <strong>城市:</strong> {record.city}
          </p>
          <p>
            <strong>创建时间:</strong> {record.createDate}
          </p>
        </div>
      ),
    });
  };

  return (
    <TableWrapper>
      <Card title="基础表格示例">展示基础表格组件的使用方法，包含分页、操作按钮等功能</Card>
      <Card>
        <UserTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          showActions={true}
        />
      </Card>
    </TableWrapper>
  );
}
