import { useState } from "react";
import { Button, Card } from "antd";
import { ListSearchForm, ListTable } from "@/components/features";
import { TableWrapper } from "@/components/ui/Table";

export default function UserList() {
  const [loading, setLoading] = useState(false);

  return (
    <TableWrapper>
      <Card title="高级表格示例">
        <ListSearchForm loading={loading} />
      </Card>
      <Card>
        <TableWrapper.Operation>
          <Button type="primary">创建</Button>
        </TableWrapper.Operation>
        <ListTable setLoading={setLoading} />
      </Card>
    </TableWrapper>
  );
}
