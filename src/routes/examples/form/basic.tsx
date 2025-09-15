import { useState } from "react";
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import type { UserFormData } from "@/types";

const { Option } = Select;
const { TextArea } = Input;

export default function FormBasicExample() {
  const [form] = Form.useForm<UserFormData>();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const handleFinish = async (values: UserFormData) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("表单数据:", values);
      message.success("表单提交成功！");
      form.resetFields();
    } catch (error) {
      message.error("提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info("表单已重置");
  };

  return (
    <div className="flex flex-col gap-4">
      <Card title="基础表单示例">展示基础表单组件的使用方法，包含常用的表单控件和布局</Card>

      <Row gutter={24}>
        <Col span={16}>
          <Card title="用户信息表单">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              autoComplete="off"
              variant="filled"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                      { required: true, message: "请输入用户名" },
                      { min: 3, message: "用户名至少3个字符" },
                    ]}
                  >
                    <Input placeholder="请输入用户名" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                      { required: true, message: "请输入邮箱" },
                      { type: "email", message: "请输入有效的邮箱地址" },
                    ]}
                  >
                    <Input placeholder="请输入邮箱" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[{ pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号" }]}
                  >
                    <Input placeholder="请输入手机号" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="birthday" label="生日">
                    <DatePicker placeholder="请选择生日" className="w-full" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="gender" label="性别">
                    <Radio.Group>
                      <Radio value="male">男</Radio>
                      <Radio value="female">女</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="role" label="角色">
                    <Select placeholder="请选择角色">
                      <Option value="admin">管理员</Option>
                      <Option value="user">普通用户</Option>
                      <Option value="guest">访客</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="address" label="地址">
                <TextArea placeholder="请输入地址" rows={3} showCount maxLength={200} />
              </Form.Item>

              <Form.Item name="status" label="状态" valuePropName="checked">
                <Switch checkedChildren="启用" unCheckedChildren="禁用" />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    提交
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="表单说明">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">功能特性：</h4>
                <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                  <li>表单验证规则</li>
                  <li>响应式布局</li>
                  <li>加载状态控制</li>
                  <li>重置功能</li>
                  <li>多种输入控件</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">包含控件：</h4>
                <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                  <li>Input 输入框</li>
                  <li>Select 选择器</li>
                  <li>DatePicker 日期选择</li>
                  <li>Radio 单选框</li>
                  <li>TextArea 文本域</li>
                  <li>Switch 开关</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
