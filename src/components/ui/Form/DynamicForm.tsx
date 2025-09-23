import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
} from "antd";
import type { BaseFormProps, DynamicFormField } from "./type";

const { TextArea } = Input;
const { Option } = Select;

interface DynamicFormProps extends BaseFormProps {
  fields: DynamicFormField[];
  submitText?: string;
  showCancel?: boolean;
  cancelText?: string;
}

// 动态表单组件
export function DynamicForm({
  fields,
  onSubmit,
  onCancel,
  loading = false,
  submitText = "提交",
  showCancel = false,
  cancelText = "取消",
  variant = "filled",
  size = "middle",
  form: externalForm,
  ...formProps
}: DynamicFormProps) {
  const [form] = Form.useForm();
  const formInstance = externalForm || form;

  const handleFinish = async (values: Record<string, any>) => {
    try {
      await onSubmit?.(values);
    } catch (error) {
      console.error("表单提交失败:", error);
    }
  };

  const renderField = (field: DynamicFormField) => {
    const { type, options, placeholder } = field;

    switch (type) {
      case "select":
        return (
          <Select placeholder={placeholder}>
            {options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
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
        return <Input placeholder={placeholder} />;
    }
  };

  return (
    <Form
      form={formInstance}
      layout="vertical"
      onFinish={handleFinish}
      variant={variant}
      size={size}
      {...formProps}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
          required={field.required}
        >
          {renderField(field)}
        </Form.Item>
      ))}

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {submitText}
          </Button>
          {showCancel && <Button onClick={onCancel}>{cancelText}</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
}
