import {
  Alert,
  App,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space
} from "antd";
import type { Rule } from "antd/es/form";
import { useState } from "react";

const { TextArea } = Input;

export default function FormValidationExample() {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 自定义验证规则
  const customValidators = {
    // 确认密码验证
    confirmPassword: ({ getFieldValue }: any): Rule => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("两次输入的密码不一致!"));
      }
    }),

    // 手机号验证
    phone: (): Rule => ({
      validator(_, value) {
        if (!value) {
          return Promise.resolve();
        }
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (phoneRegex.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("请输入有效的手机号码!"));
      }
    }),

    // 年龄验证
    age: (): Rule => ({
      validator(_, value) {
        if (!value) {
          return Promise.resolve();
        }
        if (value >= 18 && value <= 65) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("年龄必须在18-65岁之间!"));
      }
    }),

    // 异步验证用户名是否存在
    asyncUsername: (): Rule => ({
      validator(_, value) {
        if (!value) {
          return Promise.resolve();
        }

        // 模拟异步验证
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const existingUsers = ["admin", "user", "test"];
            if (existingUsers.includes(value.toLowerCase())) {
              reject(new Error("用户名已存在!"));
            } else {
              resolve(void 0);
            }
          }, 1000);
        });
      }
    })
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("表单数据:", values);
      message.success("表单验证通过并提交成功！");
    } catch {
      message.error("提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("表单验证失败:", errorInfo);
    message.error("表单验证失败，请检查输入!");
  };

  const validateAllFields = () => {
    form
      .validateFields()
      .then((values) => {
        message.success("所有字段验证通过!");
        console.log("验证通过的数据:", values);
      })
      .catch((errorInfo) => {
        message.error("验证失败!");
        console.log("验证失败信息:", errorInfo);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <Card title="表单验证示例">
        展示表单验证功能的使用方法，包含内置规则、自定义验证和异步验证
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16}>
          <Card title="表单验证示例">
            <Alert
              message="验证规则说明"
              description="本示例包含必填验证、格式验证、自定义验证、异步验证等多种验证场景。请尝试输入不同的值来查看验证效果。"
              type="info"
              showIcon
              className="mb-6"
            />

            <Form
              form={form}
              layout="vertical"
              variant="filled"
              onFinish={handleFinish}
              onFinishFailed={handleFinishFailed}
              autoComplete="off"
              scrollToFirstError
            >
              <Divider orientation="left">基础验证</Divider>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="用户名"
                    hasFeedback
                    rules={[
                      { required: true, message: "请输入用户名!" },
                      { min: 3, max: 20, message: "用户名长度为3-20个字符!" },
                      { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名只能包含字母、数字和下划线!" },
                      customValidators.asyncUsername()
                    ]}
                  >
                    <Input placeholder="请输入用户名（试试 admin）" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="邮箱"
                    hasFeedback
                    rules={[
                      { required: true, message: "请输入邮箱!" },
                      { type: "email", message: "请输入有效的邮箱地址!" }
                    ]}
                  >
                    <Input placeholder="请输入邮箱" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="密码"
                    hasFeedback
                    rules={[
                      { required: true, message: "请输入密码!" },
                      { min: 6, message: "密码至少6个字符!" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
                        message: "密码必须包含大小写字母和数字!"
                      }
                    ]}
                  >
                    <Input.Password placeholder="请输入密码" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    hasFeedback
                    rules={[
                      { required: true, message: "请确认密码!" },
                      customValidators.confirmPassword({ getFieldValue: form.getFieldValue })
                    ]}
                  >
                    <Input.Password placeholder="请再次输入密码" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">自定义验证</Divider>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="phone" label="手机号" rules={[customValidators.phone()]}>
                    <Input placeholder="请输入手机号" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="age"
                    label="年龄"
                    rules={[{ required: true, message: "请输入年龄!" }, customValidators.age()]}
                  >
                    <InputNumber placeholder="请输入年龄" min={1} max={120} className="w-full" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">其他验证</Divider>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="website"
                    label="个人网站"
                    rules={[{ type: "url", message: "请输入有效的网址!" }]}
                  >
                    <Input placeholder="请输入网址（可选）" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="gender"
                    label="性别"
                    rules={[{ required: true, message: "请选择性别!" }]}
                  >
                    <Radio.Group>
                      <Radio value="male">男</Radio>
                      <Radio value="female">女</Radio>
                      <Radio value="other">其他</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="hobbies"
                label="兴趣爱好"
                rules={[
                  { required: true, message: "请至少选择一项兴趣爱好!" },
                  { type: "array", min: 1, message: "请至少选择一项!" }
                ]}
              >
                <Checkbox.Group>
                  <Checkbox value="reading">阅读</Checkbox>
                  <Checkbox value="music">音乐</Checkbox>
                  <Checkbox value="sports">运动</Checkbox>
                  <Checkbox value="travel">旅行</Checkbox>
                  <Checkbox value="gaming">游戏</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                name="introduction"
                label="个人介绍"
                rules={[
                  { max: 500, message: "个人介绍不能超过500字!" },
                  { min: 10, message: "个人介绍至少10个字!" }
                ]}
              >
                <TextArea placeholder="请输入个人介绍" rows={4} showCount maxLength={500} />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error("请同意用户协议!"))
                  }
                ]}
              >
                <Checkbox>
                  我已阅读并同意{" "}
                  <a href="/" className="text-blue-500">
                    用户协议
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    提交表单
                  </Button>
                  <Button onClick={() => form.resetFields()}>重置</Button>
                  <Button onClick={validateAllFields}>验证所有字段</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Card title="验证规则说明">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">内置验证规则：</h4>
                <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                  <li>required - 必填验证</li>
                  <li>type - 类型验证（email, url等）</li>
                  <li>pattern - 正则表达式验证</li>
                  <li>min/max - 长度/数值范围验证</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">自定义验证：</h4>
                <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                  <li>密码确认验证</li>
                  <li>手机号格式验证</li>
                  <li>年龄范围验证</li>
                  <li>异步用户名验证</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">验证特性：</h4>
                <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                  <li>实时验证反馈</li>
                  <li>错误信息提示</li>
                  <li>滚动到错误字段</li>
                  <li>hasFeedback 视觉反馈</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
