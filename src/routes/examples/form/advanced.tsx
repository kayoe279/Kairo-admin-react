import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  type FormInstance,
} from "antd";
import { DynamicForm, ModalForm, SearchForm, type DynamicFormField } from "@/components/ui/Form";

const { Option } = Select;

export default function FormAdvancedExample() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchForm] = Form.useForm();
  const { message } = App.useApp();

  // 动态表单字段配置
  const dynamicFields: DynamicFormField[] = [
    {
      name: "title",
      label: "标题",
      type: "input",
      required: true,
      rules: [{ required: true, message: "请输入标题" }],
      placeholder: "请输入标题",
    },
    {
      name: "category",
      label: "分类",
      type: "select",
      required: true,
      rules: [{ required: true, message: "请选择分类" }],
      options: [
        { label: "技术", value: "tech" },
        { label: "生活", value: "life" },
        { label: "工作", value: "work" },
      ],
    },
    {
      name: "priority",
      label: "优先级",
      type: "radio",
      options: [
        { label: "高", value: "high" },
        { label: "中", value: "medium" },
        { label: "低", value: "low" },
      ],
    },
    {
      name: "description",
      label: "描述",
      type: "textarea",
      placeholder: "请输入描述信息",
    },
    {
      name: "enabled",
      label: "启用状态",
      type: "switch",
    },
  ];

  const handleDynamicFormSubmit = async (values: Record<string, any>) => {
    console.log("动态表单数据:", values);
    message.success("动态表单提交成功！");
  };

  const handleModalFormSubmit = async (values: Record<string, any>) => {
    console.log("模态框表单数据:", values);
    message.success("模态框表单提交成功！");
    setModalVisible(false);
  };

  const handleSearch = (values: Record<string, any>) => {
    console.log("搜索参数:", values);
    message.info(`搜索: ${JSON.stringify(values)}`);
  };

  const handleSearchReset = () => {
    message.info("搜索条件已重置");
  };

  return (
    <div className="flex flex-col gap-4">
      <Card title="高级表单示例">
        展示高级表单组件的使用方法，包含动态表单、模态框表单和搜索表单
      </Card>

      <Card>
        <Tabs
          defaultActiveKey="dynamic"
          items={[
            {
              key: "dynamic",
              label: "动态表单",
              children: (
                <DynamicFormExample
                  dynamicFields={dynamicFields}
                  handleDynamicFormSubmit={handleDynamicFormSubmit}
                />
              ),
            },
            {
              key: "modal",
              label: "模态框表单",
              children: (
                <ModalFormExample
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  handleModalFormSubmit={handleModalFormSubmit}
                />
              ),
            },
            {
              key: "search",
              label: "搜索表单",
              children: (
                <SearchFormExample
                  searchForm={searchForm}
                  handleSearch={handleSearch}
                  handleSearchReset={handleSearchReset}
                />
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

const DynamicFormExample = ({
  dynamicFields,
  handleDynamicFormSubmit,
}: {
  dynamicFields: DynamicFormField[];
  handleDynamicFormSubmit: (values: Record<string, any>) => void;
}) => {
  return (
    <Row gutter={24}>
      <Col span={16}>
        <Card title="动态表单示例">
          <DynamicForm
            colSize={24}
            align="center"
            fields={dynamicFields}
            onSubmit={handleDynamicFormSubmit}
            submitText="提交动态表单"
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="动态表单说明">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">特性：</h4>
              <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                <li>基于配置生成表单</li>
                <li>支持多种控件类型</li>
                <li>自动验证规则</li>
                <li>可扩展字段配置</li>
              </ul>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const ModalFormExample = ({
  modalVisible,
  setModalVisible,
  handleModalFormSubmit,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleModalFormSubmit: (values: Record<string, any>) => void;
}) => {
  return (
    <Row gutter={24}>
      <Col span={16}>
        <Card title="模态框表单示例">
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
              打开模态框表单
            </Button>
          </Space>

          <ModalForm
            visible={modalVisible}
            title="新增项目"
            onOk={handleModalFormSubmit}
            onCancel={() => setModalVisible(false)}
          >
            <Form.Item
              name="projectName"
              label="项目名称"
              rules={[{ required: true, message: "请输入项目名称" }]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              name="projectType"
              label="项目类型"
              rules={[{ required: true, message: "请选择项目类型" }]}
            >
              <Select placeholder="请选择项目类型">
                <Option value="web">Web应用</Option>
                <Option value="mobile">移动应用</Option>
                <Option value="desktop">桌面应用</Option>
              </Select>
            </Form.Item>
            <Form.Item name="description" label="项目描述">
              <Input.TextArea placeholder="请输入项目描述" rows={3} />
            </Form.Item>
          </ModalForm>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="模态框表单说明">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">特性：</h4>
              <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                <li>弹窗式表单交互</li>
                <li>表单验证后提交</li>
                <li>自动表单重置</li>
                <li>加载状态控制</li>
              </ul>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const SearchFormExample = ({
  searchForm,
  handleSearch,
  handleSearchReset,
}: {
  searchForm: FormInstance<any>;
  handleSearch: (values: Record<string, any>) => void;
  handleSearchReset: () => void;
}) => {
  return (
    <Row gutter={24}>
      <Col span={16}>
        <Card title="搜索表单示例">
          <SearchForm
            form={searchForm}
            onSearch={handleSearch}
            onReset={handleSearchReset}
            showToggle
          >
            {(collapsed) => (
              <>
                <Col span={8}>
                  <Form.Item name="keyword" label="关键词">
                    <Input placeholder="请输入关键词" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="status" label="状态">
                    <Select placeholder="请选择状态" allowClear>
                      <Option value="active">启用</Option>
                      <Option value="inactive">禁用</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {!collapsed && (
                  <>
                    <Col span={8}>
                      <Form.Item name="category" label="分类">
                        <Select placeholder="请选择分类" allowClear>
                          <Option value="tech">技术</Option>
                          <Option value="life">生活</Option>
                          <Option value="work">工作</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="priority" label="优先级">
                        <Select placeholder="请选择优先级" allowClear>
                          <Option value="high">高</Option>
                          <Option value="medium">中</Option>
                          <Option value="low">低</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </>
                )}
              </>
            )}
          </SearchForm>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="搜索表单说明">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">特性：</h4>
              <ul className="text-foreground-subtle list-inside list-disc space-y-1">
                <li>可展开/收起表单</li>
                <li>自动过滤空值</li>
                <li>搜索和重置功能</li>
                <li>响应式布局</li>
              </ul>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
