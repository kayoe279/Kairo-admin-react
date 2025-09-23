import { useEffect, useState } from "react";
import { DownOutlined, ReloadOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { useSearchParams } from "react-router";
import { useClearQueryParams } from "@/hooks";
import { cn, validValue } from "@/lib";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const { clearPageKey } = useClearQueryParams(prefix);

  useEffect(() => {
    const urlValues = Object.fromEntries(searchParams.entries());
    form.setFieldsValue({ ...initialValues, ...urlValues });
  }, [searchParams, form, initialValues]);

  const handleSearch = () => {
    const values = form.getFieldsValue() as Record<string, any>;
    setFlag(true);
    setSearchParams((prev) => {
      const newParams = clearPageKey(new URLSearchParams(prev));
      Object.entries(values).forEach(([key, value]) => {
        if (newParams.get(key) && !value) {
          newParams.delete(key);
        } else if (validValue(value)) {
          newParams.set(key, value);
        }
      });
      return newParams;
    });

    onSearch?.(values);
  };

  const handleReset = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
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
              icon={<ReloadOutlined />}
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
