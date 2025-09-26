import { ListTable } from "@/components/features";
import type { DynamicFormField } from "@/components/ui/Form";

export default function UserList() {
  const filters: DynamicFormField[] = [
    {
      label: "关键词",
      name: "keyword",
      type: "input",
      placeholder: "请输入关键词",
      allowClear: true,
    },
    {
      label: "状态",
      name: "disabled",
      type: "select",
      placeholder: "请选择状态",
      allowClear: true,
      options: [
        { label: "启用", value: "false" },
        { label: "禁用", value: "true" },
      ],
    },
  ];

  return <ListTable filters={filters} cardTitle="高级表格示例" />;
}
