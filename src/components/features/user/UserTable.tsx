import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BasicTable } from "@/components/ui/Table";
import { getTableList } from "@/service/api";
import type { User, UserTableProps } from "@/types";

export function UserTable({
  onEdit,
  onDelete,
  onView,
  showActions = true,
  ...restProps
}: UserTableProps) {
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pass: "green",
      refuse: "red",
      close: "orange",
    };
    return colorMap[status] || "default";
  };

  const getStatusText = (status: string) => {
    const textMap: Record<string, string> = {
      pass: "通过",
      refuse: "拒绝",
      close: "关闭",
    };
    return textMap[status] || status;
  };

  const getTypeText = (type: string) => {
    const textMap: Record<string, string> = {
      person: "个人",
      company: "企业",
    };
    return textMap[type] || type;
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      width: 80,
      render: (avatar: string, record) => <Avatar src={avatar} alt={record.name} />,
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      width: 80,
      render: (sex: string) => (sex === "male" ? "男" : "女"),
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "城市",
      dataIndex: "city",
      key: "city",
      width: 120,
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => getTypeText(type),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>,
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      key: "createDate",
      width: 180,
    },
  ];

  if (showActions) {
    columns.push({
      title: "操作",
      key: "action",
      width: 250,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          {onView && (
            <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => onView(record)}>
              查看
            </Button>
          )}
          {onEdit && (
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => onEdit(record)}>
              编辑
            </Button>
          )}
          {onDelete && (
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
            >
              删除
            </Button>
          )}
        </Space>
      ),
    });
  }

  return <BasicTable<User> apiFunction={getTableList} columns={columns} {...restProps} />;
}
