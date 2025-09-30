import { Card, Descriptions, Tag } from "antd";
import { appConfig } from "@/lib/settings/app";

interface SchemaItem {
  field: string;
  label: string;
}

export default function About() {
  const { pkg } = appInfo;
  const { dependencies, devDependencies } = pkg;

  // 构建依赖列表
  const schema: SchemaItem[] = [];
  const devSchema: SchemaItem[] = [];

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: dependencies[key] });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: devDependencies[key] });
  });

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* 关于信息 */}
      <Card title="关于" className="[&_.ant-card-body]:p-2 [&_.ant-card-body]:sm:p-4">
        <div className="text-sm leading-relaxed sm:text-base">{appConfig.description}</div>
      </Card>

      {/* 开发环境依赖 */}
      <Card title="开发环境依赖" className="[&_.ant-card-body]:p-2 [&_.ant-card-body]:sm:p-4">
        <div className="overflow-x-auto">
          <Descriptions
            bordered
            column={{ xs: 1, sm: 2 }}
            size="small"
            className="[&_.ant-descriptions-item-content]:text-xs [&_.ant-descriptions-item-content]:sm:text-sm [&_.ant-descriptions-item-label]:w-32 [&_.ant-descriptions-item-label]:text-xs [&_.ant-descriptions-item-label]:sm:w-48 [&_.ant-descriptions-item-label]:sm:text-sm"
          >
            {devSchema.map((item) => (
              <Descriptions.Item key={item.field} label={item.field}>
                <Tag color="orange" className="text-xs">
                  {item.label}
                </Tag>
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      </Card>

      {/* 生产环境依赖 */}
      <Card title="生产环境依赖" className="[&_.ant-card-body]:p-2 [&_.ant-card-body]:sm:p-4">
        <div className="overflow-x-auto">
          <Descriptions
            bordered
            column={{ xs: 1, sm: 2 }}
            size="small"
            className="[&_.ant-descriptions-item-content]:text-xs [&_.ant-descriptions-item-content]:sm:text-sm [&_.ant-descriptions-item-label]:w-32 [&_.ant-descriptions-item-label]:text-xs [&_.ant-descriptions-item-label]:sm:w-48 [&_.ant-descriptions-item-label]:sm:text-sm"
          >
            {schema.map((item) => (
              <Descriptions.Item key={item.field} label={item.field}>
                <Tag color="blue" className="text-xs">
                  {item.label}
                </Tag>
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      </Card>
    </div>
  );
}
