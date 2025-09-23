import { useEffect, useState } from "react";
import { App, Table } from "antd";
import type { BasicTableProps } from "@/components/ui/Table";
import { useTable, useTableQuery } from "@/hooks";
import { cn } from "@/lib";
import { useTableList, type ListQueryParams, type NavListItem } from "@/service";
import { createNavListTableColumns } from "./columns";

interface UserTableProps extends BasicTableProps<NavListItem> {
  showActions?: boolean;
  className?: string;
}

export const ListTable = ({
  setLoading,
  showActions = true,
  className,
  ...restProps
}: UserTableProps) => {
  const { message, modal } = App.useApp();

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<NavListItem | null>(null);

  const handleDisable = (record: NavListItem) => {
    modal.confirm({
      title: "确认禁用",
      content: `确定要禁用${record.name}吗？`,
      onOk: () => {
        message.success(`TODO 还没做: ${record.name}`);
      },
    });
  };

  const handleEdit = (record: NavListItem) => {
    setSelectedUser(record);
    setDetailModalVisible(true);
  };

  const handleDelete = (record: NavListItem) => {
    modal.confirm({
      title: "确认删除",
      content: `确定要删除${record.name}吗？`,
      onOk: () => {
        message.success(`TODO 还没做: ${record.name}`);
      },
    });
  };

  // 创建 columns 配置
  const columns = createNavListTableColumns({
    showActions,
    actions: {
      onEdit: handleEdit,
      onDisable: handleDisable,
      onDelete: handleDelete,
    },
  });

  const { searchParams } = useTableQuery({
    extendKeys: ["userType", "subscriptionType", "autoRenewal"],
  });

  const { data, total, isLoading } = useTableList(searchParams as ListQueryParams);

  const { tableProps } = useTable<NavListItem>({
    data,
    total,
    isLoading,
  });

  useEffect(() => {
    setLoading?.(isLoading);
  }, [isLoading, setLoading]);

  return (
    <>
      <Table
        columns={columns}
        loading={isLoading}
        className={cn(className)}
        {...restProps}
        {...tableProps}
      />
    </>
  );
};
