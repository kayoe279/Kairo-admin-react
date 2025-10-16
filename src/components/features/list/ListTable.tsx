import { PlusOutlined } from "@ant-design/icons";
import { App, Button } from "antd";
import { useState } from "react";
import { ButtonIcon } from "@/components/ui";
import type { DynamicFormField } from "@/components/ui/Form";
import { BasicTable } from "@/components/ui/Table";
import { useSearchQuery, useTable } from "@/hooks";
import { cn } from "@/lib";
import { type NavListItem, useTableList } from "@/service";
import { useListTableColumns } from "./columns";

export const ListTable = ({
  className,
  cardTitle,
  filters = []
}: {
  className?: string;
  cardTitle?: string;
  filters?: DynamicFormField[];
}) => {
  const { message, modal } = App.useApp();

  const [_detailModalVisible, setDetailModalVisible] = useState(false);
  const [_selectedUser, setSelectedUser] = useState<NavListItem | null>(null);

  const { searchQuery } = useSearchQuery({ extendKeys: ["disabled", "keyword"] });
  const { list, total, isLoading, isFetching, refetch } = useTableList(searchQuery);
  const { tableProps } = useTable<NavListItem>({
    data: list,
    total,
    isLoading
  });

  const handleDisable = (record: NavListItem) => {
    modal.confirm({
      title: `确认${record.disabled ? "启用" : "禁用"}`,
      content: `确定要${record.disabled ? "启用" : "禁用"}${record.name}吗？`,
      onOk: () => {
        message.success(`TODO 还没做: ${record.name}`);
      }
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
      }
    });
  };

  const columns = useListTableColumns({
    showActions: true,
    actions: {
      onEdit: handleEdit,
      onDisable: handleDisable,
      onDelete: handleDelete
    }
  });

  return (
    <BasicTable<NavListItem>
      filters={filters}
      searchQuery={searchQuery}
      columns={columns}
      loading={isLoading}
      cardTitle={cardTitle}
      className={cn(className)}
      operation={<Operation isFetching={isFetching} refetch={refetch} />}
      {...tableProps}
    />
  );
};

const Operation = ({ isFetching, refetch }: { isFetching: boolean; refetch: () => void }) => {
  return (
    <div className="flex justify-between">
      <Button type="primary" icon={<PlusOutlined />}>
        创建
      </Button>
      <ButtonIcon
        icon="ant-design:reload-outlined"
        className={cn({ "pointer-events-none animate-spin opacity-50": isFetching })}
        onClick={() => refetch()}
      />
    </div>
  );
};
