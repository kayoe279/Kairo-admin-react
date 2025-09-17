import { useState } from "react";
import type { ReactNode } from "react";
import { DownOutlined, ReloadOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, type FormProps } from "antd";
import type { FormInstance } from "antd/es/form";
import { cn } from "@/lib";

export interface SearchFormProps extends Omit<FormProps, "children"> {
  children?: ReactNode | ((collapsed: boolean) => ReactNode);
  onSearch?: (values: Record<string, any>) => void;
  onReset?: () => void;
  loading?: boolean;
  showToggle?: boolean;
  form?: FormInstance;
}

export function SearchForm({
  children,
  onSearch,
  onReset,
  loading = false,
  showToggle = false,
  variant = "filled",
  size = "middle",
  form: externalForm,
  className,
}: SearchFormProps) {
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;
  const [collapsed, setCollapsed] = useState(true);

  const handleSearch = () => {
    const values = form.getFieldsValue();
    // 过滤空值
    const filteredValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    onSearch?.(filteredValues);
  };

  const handleReset = () => {
    form.resetFields();
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
      >
        <Row gutter={16}>{renderChildren()}</Row>

        <Row>
          <Col span={24} flex="auto" className="!flex !justify-end gap-4">
            <Button
              type="primary"
              loading={loading}
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
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
