import { InboxOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, Result, Select, Space, Upload } from "antd";
import { useState } from "react";
import { StepForm, StepFormStep } from "@/components/ui/Form";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

interface StepFormData {
  // 基本信息
  username?: string;
  email?: string;
  phone?: string;

  // 详细信息
  company?: string;
  position?: string;
  experience?: string;
  salary?: number;

  // 附加信息
  introduction?: string;
  resume?: any[];
}

export default function FormStepExample() {
  const { message } = App.useApp();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<StepFormData>({});
  const [loading, setLoading] = useState(false);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const next = async () => {
    try {
      let values: StepFormData | undefined;
      // 根据当前步骤验证对应的表单
      switch (current) {
        case 0:
          values = await form1.validateFields();
          break;
        case 1:
          values = await form2.validateFields();
          break;
        case 2:
          values = await form3.validateFields();
          break;
      }

      // 合并表单数据
      const newFormData: StepFormData = { ...formData, ...values };
      setFormData(newFormData);

      if (current < 2) {
        setCurrent(current + 1);
      } else {
        // 最后一步，提交表单
        await handleSubmit(newFormData);
      }
    } catch (error) {
      console.error("表单验证失败:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async (data: StepFormData) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("完整表单数据:", data);
      message.success("表单提交成功！");
      setCurrent(3); // 跳转到成功页面
    } catch {
      message.error("提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setFormData({});
    form1.resetFields();
    form2.resetFields();
    form3.resetFields();
  };

  return (
    <div className="flex flex-col gap-4">
      <Card title="分步表单示例">展示分步表单组件的使用方法，适用于复杂的数据录入场景</Card>

      <Card className="w-full">
        <StepForm current={current} onChange={setCurrent}>
          <StepFormStep title="基本信息" description="填写个人基本信息">
            <Form
              form={form1}
              layout="vertical"
              variant="filled"
              initialValues={formData}
              onValuesChange={(_, allValues) => {
                setFormData({ ...formData, ...allValues });
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[
                    { required: true, message: "请输入用户名" },
                    { min: 3, message: "用户名至少3个字符" }
                  ]}
                >
                  <Input placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    { required: true, message: "请输入邮箱" },
                    { type: "email", message: "请输入有效的邮箱地址" }
                  ]}
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="手机号"
                  rules={[
                    { required: true, message: "请输入手机号" },
                    { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号" }
                  ]}
                >
                  <Input placeholder="请输入手机号" />
                </Form.Item>
              </div>
            </Form>
          </StepFormStep>

          <StepFormStep title="工作信息" description="填写工作相关信息">
            <Form
              form={form2}
              layout="vertical"
              variant="filled"
              initialValues={formData}
              onValuesChange={(_, allValues) => {
                setFormData({ ...formData, ...allValues });
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="company"
                  label="公司名称"
                  rules={[{ required: true, message: "请输入公司名称" }]}
                >
                  <Input placeholder="请输入公司名称" />
                </Form.Item>

                <Form.Item
                  name="position"
                  label="职位"
                  rules={[{ required: true, message: "请输入职位" }]}
                >
                  <Input placeholder="请输入职位" />
                </Form.Item>

                <Form.Item
                  name="experience"
                  label="工作经验"
                  rules={[{ required: true, message: "请选择工作经验" }]}
                >
                  <Select placeholder="请选择工作经验">
                    <Option value="0-1">0-1年</Option>
                    <Option value="1-3">1-3年</Option>
                    <Option value="3-5">3-5年</Option>
                    <Option value="5+">5年以上</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="salary" label="期望薪资">
                  <Select placeholder="请选择期望薪资">
                    <Option value={5000}>5K以下</Option>
                    <Option value={10000}>5K-10K</Option>
                    <Option value={15000}>10K-15K</Option>
                    <Option value={20000}>15K-20K</Option>
                    <Option value={30000}>20K以上</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </StepFormStep>

          <StepFormStep title="补充信息" description="填写补充信息和上传文件">
            <Form
              form={form3}
              layout="vertical"
              variant="filled"
              initialValues={formData}
              onValuesChange={(_, allValues) => {
                setFormData({ ...formData, ...allValues });
              }}
            >
              <Form.Item
                name="introduction"
                label="个人介绍"
                rules={[{ max: 500, message: "个人介绍不能超过500字" }]}
              >
                <TextArea placeholder="请输入个人介绍" rows={4} showCount maxLength={500} />
              </Form.Item>

              <Form.Item
                name="resume"
                label="简历文件"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
              >
                <Dragger
                  name="files"
                  multiple={false}
                  beforeUpload={() => false} // 阻止自动上传
                  accept=".pdf,.doc,.docx"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                  <p className="ant-upload-hint">支持 PDF、Word 格式，单个文件不超过 10MB</p>
                </Dragger>
              </Form.Item>
            </Form>
          </StepFormStep>

          <StepFormStep title="完成" description="表单提交成功">
            <Result
              status="success"
              title="表单提交成功!"
              subTitle="您的信息已成功提交，我们会在2个工作日内与您联系。"
              extra={[
                <Button type="primary" key="restart" onClick={restart}>
                  重新填写
                </Button>,
                <Button key="home">返回首页</Button>
              ]}
            />
          </StepFormStep>
        </StepForm>

        {current < 3 && (
          <div className="mt-8 flex justify-center">
            <Space>
              {current > 0 && <Button onClick={prev}>上一步</Button>}
              <Button type="primary" onClick={next} loading={loading}>
                {current === 2 ? "提交" : "下一步"}
              </Button>
            </Space>
          </div>
        )}
      </Card>
    </div>
  );
}
