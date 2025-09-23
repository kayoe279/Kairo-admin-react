import { Card } from "antd";
import { ListTable } from "@/components/features";
import { TableWrapper } from "@/components/ui/Table";

export default function TableBasicExample() {
  return (
    <TableWrapper>
      <Card title="基础表格示例">展示基础表格组件的使用方法，包含分页、操作按钮等功能</Card>
      <Card>
        <ListTable showActions={true} />
      </Card>
    </TableWrapper>
  );
}
