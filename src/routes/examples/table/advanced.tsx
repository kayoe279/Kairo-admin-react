import { useState } from "react";
import { App, Card } from "antd";
import { UserSearchForm, UserTable } from "@/components/features";
import { TableWrapper } from "@/components/ui/Table";
import type { User } from "@/types";

export default function TableAdvancedExample() {
  const { message: message, modal } = App.useApp();

  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async (values: Record<string, any>) => {
    setLoading(true);
    try {
      setSearchParams(values);
      // 这里可以添加一些搜索的提示
      if (Object.keys(values).length > 0) {
        message.success("搜索完成");
      }
    } catch (error) {
      message.error("搜索失败");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({});
    message.info("已重置搜索条件");
  };

  const handleEdit = (record: User) => {
    message.info(`编辑用户: ${record.name}`);
    // 这里可以打开编辑弹窗或跳转到编辑页面
  };

  const handleDelete = (record: User) => {
    modal.confirm({
      title: "确认删除",
      content: `确定要删除用户 ${record.name} 吗？此操作不可恢复。`,
      okText: "确认删除",
      cancelText: "取消",
      okType: "danger",
      onOk: () => {
        // 这里调用删除 API
        message.success(`已删除用户: ${record.name}`);
      },
    });
  };

  const handleView = (record: User) => {
    console.log(record);
  };

  return (
    <TableWrapper>
      <TableWrapper.Top>
        <Card title="高级表格示例">
          <UserSearchForm onSearch={handleSearch} onReset={handleReset} loading={loading} />
        </Card>
      </TableWrapper.Top>
      <TableWrapper.Main>
        <Card>
          <UserTable
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            showActions={true}
            searchParams={searchParams}
          />
        </Card>
      </TableWrapper.Main>
    </TableWrapper>
  );
}
