import { Card, Descriptions, Tag } from "antd";
import { appConfig } from "@/lib/settings/app";

interface SchemaItem {
  field: string;
  label: string;
}

export default function About() {
  const { pkg, lastBuildTime } = appInfo;
  const { dependencies, devDependencies, name, version, author } = pkg;

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
    <div className="flex flex-col gap-4">
      <Card title="关于">{appConfig.description}</Card>

      {/* 项目信息 */}
      <Card title="项目信息" size="small">
        <Descriptions bordered column={2} styles={{ label: { width: "140px" } }}>
          <Descriptions.Item label="项目名称">{name}</Descriptions.Item>
          <Descriptions.Item label="版本">
            <Tag color="blue">{version}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="作者">
            {typeof author === "string" ? author : author?.name || "Unknown"}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {typeof author === "object" && author?.email ? author.email : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="最后构建时间">
            <Tag color="green">{lastBuildTime}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="预览地址">
            <a href={appConfig.preview} target="_blank" rel="noopener noreferrer">
              查看预览地址
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Github" span={2}>
            <a href={appConfig.github} target="_blank" rel="noopener noreferrer">
              查看Github地址
            </a>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 开发环境依赖 */}
      <Card title="开发环境依赖" size="small">
        <Descriptions bordered column={2} styles={{ label: { width: "200px" } }}>
          {devSchema.map((item) => (
            <Descriptions.Item key={item.field} label={item.field}>
              <Tag color="orange">{item.label}</Tag>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>

      {/* 生产环境依赖 */}
      <Card title="生产环境依赖" size="small">
        <Descriptions bordered column={2} styles={{ label: { width: "200px" } }}>
          {schema.map((item) => (
            <Descriptions.Item key={item.field} label={item.field}>
              <Tag color="blue">{item.label}</Tag>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </div>
  );
}
