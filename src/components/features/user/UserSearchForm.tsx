import { Col, Form, Input, Select } from "antd";
import { SearchForm, type SearchFormProps } from "@/components/ui/Form";

const { Option } = Select;

export interface UserSearchFormValues {
  name?: string;
  email?: string;
  city?: string;
  status?: string;
  type?: string;
}

export interface UserSearchFormProps extends Omit<SearchFormProps, "children"> {}

export function UserSearchForm(props: UserSearchFormProps) {
  return (
    <SearchForm {...props}>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入姓名" allowClear />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Form.Item label="邮箱" name="email">
          <Input placeholder="请输入邮箱" allowClear />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Form.Item label="城市" name="city">
          <Input placeholder="请输入城市" allowClear />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Form.Item label="状态" name="status">
          <Select placeholder="请选择状态" allowClear>
            <Option value="pass">通过</Option>
            <Option value="refuse">拒绝</Option>
            <Option value="close">关闭</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Form.Item label="类型" name="type">
          <Select placeholder="请选择类型" allowClear>
            <Option value="person">个人</Option>
            <Option value="company">企业</Option>
          </Select>
        </Form.Item>
      </Col>
    </SearchForm>
  );
}
