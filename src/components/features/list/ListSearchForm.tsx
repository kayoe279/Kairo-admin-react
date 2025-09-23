import { Col, Form, Input, Select } from "antd";
import { SearchForm, type SearchFormProps } from "@/components/ui/Form";

const { Option } = Select;

export interface NavListSearchFormValues {
  name?: string;
  keywords?: string;
  disabled?: boolean;
}

export interface ListSearchFormProps extends Omit<SearchFormProps, "children"> {}

export function ListSearchForm(props: ListSearchFormProps) {
  return (
    <SearchForm {...props}>
      {() => {
        return (
          <>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item label="关键词" name="keyword">
                <Input placeholder="请输入关键词" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item label="状态" name="disabled">
                <Select placeholder="请选择状态" allowClear>
                  <Option value={false}>启用</Option>
                  <Option value={true}>禁用</Option>
                </Select>
              </Form.Item>
            </Col>
          </>
        );
      }}
    </SearchForm>
  );
}
