import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Switch
} from "antd";
import { useEffect } from "react";
import { cn } from "@/lib";
import type { BaseFormProps, DynamicFormField } from "./type";

const { TextArea } = Input;

interface DynamicFormProps extends BaseFormProps {
  fields: DynamicFormField[];
  searchQuery?: Record<string, string | undefined>;
  submitText?: string;
  showReset?: boolean;
  resetText?: string;
  colSize?: number;
  align?: "left" | "center" | "right";
}

// 动态表单组件
export function DynamicForm({
  fields,
  onSubmit,
  onReset,
  searchQuery,
  loading = false,
  submitText = "提交",
  showReset = true,
  resetText = "重置",
  variant = "filled",
  size = "middle",
  align = "right",
  form: externalForm,
  colSize = 6,
  ...formProps
}: DynamicFormProps) {
  const [form] = Form.useForm();
  const formInstance = externalForm || form;

  const renderField = (field: DynamicFormField) => {
    const { type, options, placeholder, allowClear, mode } = field;

    switch (type) {
      case "select":
        return <Select placeholder={placeholder} options={options} mode={mode} />;
      case "date":
        return <DatePicker placeholder={placeholder} className="w-full" />;
      case "number":
        return <InputNumber placeholder={placeholder} className="w-full" />;
      case "textarea":
        return <TextArea placeholder={placeholder} rows={4} />;
      case "switch":
        return <Switch />;
      case "radio":
        return (
          <Radio.Group>
            {options?.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group>
            {options?.map((option) => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      default:
        return <Input placeholder={placeholder} allowClear={allowClear} />;
    }
  };

  const getColSize = () => {
    if (colSize >= 24) {
      return {
        xs: 12,
        lg: 24
      };
    }

    return {
      xs: 12,
      sm: colSize + 4,
      md: colSize + 2,
      lg: colSize
    };
  };

  const handleFinish = async (values: Record<string, any>) => {
    try {
      await onSubmit?.(values);
    } catch (error) {
      console.error("表单提交失败:", error);
    }
  };

  const handleReset = () => {
    formInstance.resetFields();
    onReset?.();
  };

  useEffect(() => {
    formInstance.setFieldsValue(searchQuery);
  }, [searchQuery, formInstance]);

  return (
    <Form
      form={formInstance}
      layout="vertical"
      onFinish={handleFinish}
      variant={variant}
      size={size}
      {...formProps}
    >
      <Row>
        <Col span={24}>
          <div>{JSON.stringify(formProps.initialValues)}</div>
        </Col>
      </Row>
      <Row gutter={16}>
        {fields.map((field) => (
          <Col {...getColSize()} key={field.name}>
            <Form.Item
              name={field.name}
              label={field.label}
              rules={field.rules}
              required={field.required}
            >
              {renderField(field)}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Row>
        <Col
          span={24}
          flex="auto"
          className={cn("!flex gap-4", {
            "!justify-end": align === "right",
            "!justify-center": align === "center",
            "!justify-start": align === "left"
          })}
        >
          <Form.Item className="!mb-0">
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {submitText}
              </Button>
              {showReset && <Button onClick={handleReset}>{resetText}</Button>}
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
