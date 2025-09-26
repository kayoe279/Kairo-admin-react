import { useEffect, useState } from "react";
import {
  DownOutlined,
  Loading3QuartersOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { useSearchQuery } from "@/hooks";
import { cn } from "@/lib";
import type { SearchFormProps } from "./type";

export function SearchForm({
  children,
  onSearch,
  onReset,
  loading = false,
  showToggle = false,
  variant = "filled",
  size = "middle",
  form: externalForm,
  prefix,
  className,
  initialValues,
  ...restProps
}: SearchFormProps) {
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;
  const [flag, setFlag] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  const { searchQuery, setSearchQuery, resetSearchQuery } = useSearchQuery({ prefix });

  useEffect(() => {
    form.setFieldsValue({ ...initialValues, ...searchQuery });
  }, [searchQuery, form, initialValues]);

  const handleSearch = () => {
    const values = form.getFieldsValue() as Record<string, any>;
    setFlag(true);
    setSearchQuery(values);
    onSearch?.(values);
  };

  const handleReset = () => {
    resetSearchQuery();
    form.resetFields();
    setFlag(false);
    onReset?.();
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderChildren = () => {
    if (typeof children === "function") {
      return children(collapsed);
    }
    return children;
  };

  return (
    <div className={cn(className)}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        autoComplete="off"
        variant={variant}
        size={size}
        {...restProps}
      >
        <Row gutter={16}>{renderChildren()}</Row>

        <Row>
          <Col span={24} flex="auto" className="!flex !justify-end gap-4">
            <Button
              type="primary"
              loading={flag && loading}
              disabled={!flag && loading}
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button
              icon={<Loading3QuartersOutlined />}
              loading={!flag && loading}
              disabled={flag && loading}
              onClick={handleReset}
            >
              重置
            </Button>
            {showToggle && (
              <Button type="link" onClick={toggleCollapsed}>
                {collapsed ? "展开" : "收起"}
                {collapsed ? <DownOutlined /> : <UpOutlined />}
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
