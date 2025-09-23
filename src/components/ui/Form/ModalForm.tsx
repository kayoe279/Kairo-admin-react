import { Form, Modal } from "antd";
import type { ModalFormProps } from "./type";

// 模态框表单组件
export function ModalForm({
  visible,
  title,
  width = 600,
  onOk,
  onCancel,
  confirmLoading = false,
  children,
  variant = "filled",
  size = "middle",
  form: externalForm,
  ...formProps
}: ModalFormProps) {
  const [form] = Form.useForm();
  const formInstance = externalForm || form;

  const handleOk = async () => {
    try {
      const values = await formInstance.validateFields();
      await onOk?.(values);
    } catch (error) {
      // 表单验证失败时不关闭模态框
      console.error("表单验证失败:", error);
    }
  };

  const handleCancel = () => {
    formInstance.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={width}
      confirmLoading={confirmLoading}
      destroyOnClose
    >
      <Form
        form={formInstance}
        layout="vertical"
        preserve={false}
        variant={variant}
        size={size}
        {...formProps}
      >
        {children}
      </Form>
    </Modal>
  );
}
