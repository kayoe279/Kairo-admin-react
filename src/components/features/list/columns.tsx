import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  GithubOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Button, Space, Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { NavListItem } from "@/service";

const { Text, Link } = Typography;

// 操作列配置接口
export interface ColumnActions {
  onEdit?: (record: NavListItem) => void;
  onDisable?: (record: NavListItem) => void;
  onDelete?: (record: NavListItem) => void;
  onView?: (record: NavListItem) => void;
}

// 创建基础 columns 配置
export const createNavListColumns = (): ColumnsType<NavListItem> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
    sorter: true,
    render: (id: number) => <Text strong>{id}</Text>,
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: 200,
    ellipsis: {
      showTitle: false,
    },
    render: (name: string) => (
      <Tooltip title={name}>
        <Text strong>{name}</Text>
      </Tooltip>
    ),
  },
  {
    title: "链接",
    dataIndex: "link",
    key: "link",
    width: 300,
    ellipsis: {
      showTitle: false,
    },
    render: (link: string) => (
      <Tooltip title={link}>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <LinkOutlined />
          {link}
        </Link>
      </Tooltip>
    ),
  },
  {
    title: "关键词",
    dataIndex: "keywords",
    key: "keywords",
    width: 250,
    render: (keywords: string[]) => (
      <div className="flex flex-wrap gap-1">
        {keywords?.map((keyword, index) => (
          <Tag key={index} color="blue" className="text-xs">
            {keyword}
          </Tag>
        )) || "-"}
      </div>
    ),
  },
  {
    title: "仓库",
    dataIndex: "repository",
    key: "repository",
    width: 200,
    ellipsis: {
      showTitle: false,
    },
    render: (repository: string | null) => {
      if (!repository) return <Text type="secondary">-</Text>;
      return (
        <Tooltip title={repository}>
          <Link
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <GithubOutlined />
            {repository}
          </Link>
        </Tooltip>
      );
    },
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    key: "created_at",
    width: 180,
    sorter: true,
    sortDirections: ["ascend", "descend"],
    render: (date: string) => {
      if (!date) return "-";
      return new Date(date).toLocaleString("zh-CN");
    },
  },
];

// 创建操作列
export const createActionColumn = (actions: ColumnActions) => ({
  title: "操作",
  key: "action",
  width: 250,
  fixed: "right" as const,
  render: (_: any, record: NavListItem) => (
    <Space size="small">
      {actions.onView && (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => actions.onView!(record)}
        >
          查看
        </Button>
      )}
      {actions.onEdit && (
        <Button
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => actions.onEdit!(record)}
        >
          编辑
        </Button>
      )}
      {actions.onDisable && (
        <Button
          size="small"
          variant="link"
          color={record.disabled ? "purple" : "green"}
          icon={record.disabled ? <CloseOutlined /> : <CheckOutlined />}
          onClick={() => actions.onDisable!(record)}
        >
          {record.disabled ? "禁用" : "启用"}
        </Button>
      )}
      {actions.onDelete && (
        <Button
          type="link"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => actions.onDelete!(record)}
        >
          删除
        </Button>
      )}
    </Space>
  ),
});

// 完整的 columns 配置函数
export const createNavListTableColumns = ({
  showActions = true,
  actions,
}: {
  showActions?: boolean;
  actions?: ColumnActions;
}): ColumnsType<NavListItem> => {
  const baseColumns = createNavListColumns();

  if (showActions && actions) {
    return [...baseColumns, createActionColumn(actions)];
  }

  return baseColumns;
};
